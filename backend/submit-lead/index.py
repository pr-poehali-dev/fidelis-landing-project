import json
import os
import re
import urllib.request
import urllib.parse
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта (имя, телефон, бюджет, согласие на ПДн),
    сохраняет в БД и отправляет сообщение администратору сообщества ВКонтакте.
    Args: event с httpMethod, body (JSON: name, phone, budget, consent)
          context - объект с request_id
    Returns: HTTP-ответ с результатом отправки заявки
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body_data = json.loads(event.get('body', '{}'))

    name = str(body_data.get('name', '')).strip()
    phone = str(body_data.get('phone', '')).strip()
    budget = str(body_data.get('budget', '')).strip()
    consent = bool(body_data.get('consent', False))

    if not name or len(name) < 2:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите корректное имя'})}

    phone_digits = re.sub(r'\D', '', phone)
    if len(phone_digits) < 10:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите корректный номер телефона'})}

    if not consent:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Необходимо согласие на обработку персональных данных'})}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    safe_name = name.replace("'", "''")
    safe_phone = phone.replace("'", "''")
    safe_budget = budget.replace("'", "''")

    cur.execute(
        f"INSERT INTO leads (name, phone, budget, consent) VALUES ('{safe_name}', '{safe_phone}', '{safe_budget}', {consent}) RETURNING id"
    )
    lead_id = cur.fetchone()[0]
    conn.commit()

    vk_sent = False
    vk_error = None

    vk_token = os.environ.get('VK_COMMUNITY_TOKEN')
    vk_user_id = os.environ.get('VK_ADMIN_ID')

    if vk_token and vk_user_id:
        message_text = (
            f"🚗 Новая заявка с сайта Fidelis Import\n\n"
            f"Имя: {name}\n"
            f"Телефон: {phone}\n"
            f"Бюджет: {budget or 'не указан'}\n"
            f"ID заявки: {lead_id}"
        )

        resolved_id = vk_user_id
        if not vk_user_id.isdigit():
            try:
                resolve_params = {'screen_name': vk_user_id, 'access_token': vk_token, 'v': '5.199'}
                resolve_url = 'https://api.vk.com/method/utils.resolveScreenName?' + urllib.parse.urlencode(resolve_params)
                with urllib.request.urlopen(resolve_url, timeout=10) as resp:
                    resolve_data = json.loads(resp.read().decode())
                    obj = resolve_data.get('response', {})
                    if obj.get('type') == 'user':
                        resolved_id = str(obj.get('object_id'))
            except Exception:
                pass

        params = {
            'user_id': resolved_id,
            'message': message_text,
            'random_id': lead_id,
            'access_token': vk_token,
            'v': '5.199'
        }

        try:
            url = 'https://api.vk.com/method/messages.send?' + urllib.parse.urlencode(params)
            req = urllib.request.Request(url, method='POST')
            with urllib.request.urlopen(req, timeout=10) as resp:
                resp_data = json.loads(resp.read().decode())
                if 'response' in resp_data:
                    vk_sent = True
                else:
                    vk_error = resp_data.get('error', {}).get('error_msg', 'Unknown VK error')
        except Exception as e:
            vk_error = str(e)

        if vk_sent:
            cur.execute(f"UPDATE leads SET sent_to_vk = true WHERE id = {lead_id}")
            conn.commit()

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'lead_id': lead_id, 'vk_sent': vk_sent, 'vk_error': vk_error})
    }