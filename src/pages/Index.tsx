import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

/* Новый логотип — белый фон убирается через mix-blend-mode: multiply */
const LOGO_URL = 'https://cdn.poehali.dev/projects/f1f30175-ef7d-405a-be11-a40b5cfa5f35/bucket/b4e9297b-8bc5-4975-841c-c7a3ea70346c.png';

/* Собственное видео клиента — японское авто, передняя часть в кадре */
const VIDEO_URL = 'https://cdn.poehali.dev/projects/f1f30175-ef7d-405a-be11-a40b5cfa5f35/bucket/63e6a697-482e-451c-8a01-19d0bb1daadc.mp4';
/* Фолбек-постер на случай если видео не загрузится */
const CAR_POSTER = 'https://cdn.poehali.dev/projects/f1f30175-ef7d-405a-be11-a40b5cfa5f35/files/7f2c8cf6-2b76-4015-9616-0046cf24a54f.jpg';
/* URL backend-функции приёма заявок */
const SUBMIT_LEAD_URL = 'https://functions.poehali.dev/de472bb6-ca47-4710-813f-4055a99c73d6';

/* ─── Data ──────────────────────────────────────────── */
const services = [
  { icon: 'Search',      title: 'Поиск и подбор',    desc: 'Находим автомобиль под ваш запрос и бюджет на крупнейших аукционах Японии, Кореи и Китая. Полный анализ истории.' },
  { icon: 'Ship',        title: 'Доставка',           desc: 'Морская и наземная доставка «под ключ». Страхование груза, трекинг на каждом этапе, точные сроки.' },
  { icon: 'FileCheck',   title: 'Растаможивание',     desc: 'Полное сопровождение таможенного оформления. Оптимизация пошлин, все документы в порядке.' },
  { icon: 'ShieldCheck', title: 'Гарантия качества',  desc: '40-минутная видеоинспекция от нашего агента на месте до любой покупки. Видите всё своими глазами.' },
];

const stats = [
  { value: '500+',   label: 'Автомобилей доставлено' },
  { value: '98%',    label: 'Довольных клиентов' },
  { value: '40 мин', label: 'Видеоинспекция авто' },
  { value: '15 мин', label: 'Ответ менеджера' },
];

const countries = [
  { flag: '🇯🇵', name: 'Япония' },
  { flag: '🇰🇷', name: 'Корея' },
  { flag: '🇨🇳', name: 'Китай' },
  { flag: '🌍', name: 'Весь мир' },
];

const trustItems = [
  { icon: 'FileText',    title: 'Работа по договору',   desc: 'Каждая сделка оформляется официальным договором с фиксацией всех условий, сроков и характеристик.' },
  { icon: 'ShieldCheck', title: 'Юридическая чистота',  desc: 'Полная проверка юридической истории авто перед покупкой. Никакого криминала, залогов, обременений.' },
  { icon: 'Banknote',    title: 'Прозрачная оплата',    desc: 'Оплата через банк лично вами. Все платёжные документы получаете напрямую — никаких посредников.' },
  { icon: 'Headphones',  title: 'Персональный менеджер',desc: 'Ваш менеджер на связи 24/7. Ответ в течение 15 минут. Сопровождаем от заявки до ключей.' },
  { icon: 'Eye',         title: 'Полная прозрачность',  desc: 'Вы видите каждый этап сделки в реальном времени. Никаких скрытых платежей.' },
  { icon: 'Award',       title: 'Проверенные партнёры', desc: 'Работаем только с верифицированными агентами на аукционах Японии, Кореи и Китая.' },
];

const reviews = [
  { text: 'Взял Toyota Land Cruiser 300 из Японии. Видео с осмотром пришло на следующий день — 40 минут детального разбора. Машина пришла точно в срок, документы чистые.', author: 'Дмитрий К.', city: 'Москва', car: 'Toyota LC 300, Япония' },
  { text: 'Заказывал Lexus LX из Японии. Менеджер был на связи 24/7, отвечал мгновенно. Все расходы озвучены заранее, никаких сюрпризов. Рекомендую.', author: 'Андрей В.', city: 'Санкт-Петербург', car: 'Lexus LX 570, Япония' },
  { text: 'Привезли Honda Stepwgn из Японии под ключ. Юридически всё чисто, договор на руках, оплата через банк — всё контролировал сам. Очень надёжная компания.', author: 'Сергей Н.', city: 'Екатеринбург', car: 'Honda Stepwgn, Япония' },
];

const faqs = [
  { q: 'Сколько времени занимает весь процесс от заявки до получения авто?', a: 'Не более 75 дней — именно столько занимает полный цикл от заявки до получения автомобиля. Точные сроки зависят от конкретного автомобиля и страны вывоза: из Японии и Кореи обычно 45–60 дней, из Китая — от 30 дней.' },
  { q: 'Какие страны входят в ваш охват?', a: 'Основные направления — Япония, Южная Корея и Китай: именно там сосредоточены лучшие предложения по соотношению цена/качество. По запросу клиента работаем по всему миру — ОАЭ, Германия, США, Великобритания и другие рынки.' },
  { q: 'Как формируется итоговая стоимость авто?', a: 'Итоговая стоимость складывается из четырёх составляющих: сумма выкупа автомобиля на аукционе + растаможка + логистика (доставка до вас) + комиссия менеджеров около 80 000 рублей. Никаких скрытых платежей — всё фиксируется в договоре до начала сделки.' },
  { q: 'Можно ли посмотреть автомобиль до покупки?', a: 'Да, обязательно. Наш агент на месте проводит доскональную видеосъёмку автомобиля продолжительностью около 40 минут: снаружи, внутри, под капотом, снизу. Вы видите реальное состояние машины в деталях.' },
  { q: 'Что происходит, если авто не соответствует описанию?', a: 'Такие ситуации случаются крайне редко — именно для этого мы проводим тщательную предварительную видеоинспекцию. Но если несоответствие всё же выявлено — мы полностью берём на себя юридическое сопровождение и решаем вопрос в вашу пользу.' },
  { q: 'Как проходит оплата? Это безопасно?', a: 'Оплата проходит через банк, и всю операцию осуществляете лично вы. Все платёжные документы вы получаете напрямую — никаких посредников с вашими деньгами. Вы полностью контролируете каждый перевод.' },
];

/* ─── Helpers ───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Smooth section divider ────────────────────────── */
function Divider({ top = '#020816', bottom = '#020816' }: { top?: string; bottom?: string }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 80, marginTop: -1, zIndex: 10, pointerEvents: 'none' }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path d="M0,0 L1440,0 L1440,30 C1080,80 360,80 0,30 Z" fill={bottom} />
      </svg>
    </div>
  );
}

/* ─── 3D Gold Icon ──────────────────────────────────── */
function GoldIcon3D({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-14 h-14">
      <div className="absolute inset-0 rounded-xl opacity-35 blur-lg"
           style={{ background: 'linear-gradient(135deg,#f5dfa0,#d4a843)' }} />
      <div className="absolute inset-0 rounded-xl"
           style={{
             background: 'linear-gradient(145deg,#f5e5b0 0%,#d4a843 42%,#8c6418 100%)',
             boxShadow: '0 1px 1px rgba(255,255,255,0.4) inset, 0 -2px 5px rgba(0,0,0,0.55) inset, 3px 7px 20px rgba(0,0,0,0.65), 0 0 28px rgba(212,168,67,0.2)',
           }} />
      <Icon name={name} fallback="Star" size={24} className="relative z-10"
            style={{ color: '#0a1830', filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.25))' }} />
    </div>
  );
}

/* ─── Logo ──────────────────────────────────────────── */
function Logo({ size = 40 }: { size?: number }) {
  return (
    <img
      src={LOGO_URL}
      alt="Fidelis"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        mixBlendMode: 'multiply',
        /* Инвертируем чтобы белый → прозрачный на тёмном фоне */
        filter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg) brightness(1.1)',
      }}
    />
  );
}

/* ─── NavBar ────────────────────────────────────────── */
function NavBar({ onOpenForm }: { onOpenForm: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl shadow-[0_2px_50px_rgba(0,0,0,0.8)]' : ''}`}
         style={{ background: scrolled ? 'rgba(2,8,22,0.95)' : 'transparent' }}>
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={42} />
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '16px', letterSpacing: '0.14em', color: '#d4a843', lineHeight: 1 }}>
              FIDELIS
            </div>
            <div className="font-ibm text-[9px] tracking-[0.22em] mt-0.5 uppercase" style={{ color: 'rgba(212,168,67,0.5)' }}>
              Import Solutions
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Услуги', 'Доверие', 'FAQ', 'Контакты'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
               className="font-ibm text-xs tracking-[0.18em] uppercase transition-colors duration-300"
               style={{ color: 'rgba(245,223,160,0.52)' }}
               onMouseEnter={e => ((e.target as HTMLElement).style.color = '#d4a843')}
               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(245,223,160,0.52)')}>
              {l}
            </a>
          ))}
          <button className="btn-gold px-6 py-2.5 text-xs tracking-widest" onClick={onOpenForm}>Получить расчёт</button>
        </div>

        <button className="md:hidden text-gold-400" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden backdrop-blur-xl px-6 pb-6 flex flex-col gap-5 border-t border-gold-700/20"
             style={{ background: 'rgba(2,8,22,0.98)' }}>
          {['Услуги', 'Доверие', 'FAQ', 'Контакты'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
               className="font-ibm text-sm tracking-[0.2em] uppercase" style={{ color: 'rgba(245,223,160,0.65)' }}>{l}</a>
          ))}
          <button className="btn-gold px-5 py-3 text-xs tracking-widest w-full" onClick={() => { setOpen(false); onOpenForm(); }}>Получить расчёт</button>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────── */
function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => { v.play().catch(() => {}); };
    tryPlay();
    v.addEventListener('loadedmetadata', tryPlay);
    document.addEventListener('click', tryPlay, { once: true });
    return () => {
      v.removeEventListener('loadedmetadata', tryPlay);
      document.removeEventListener('click', tryPlay);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#020816' }}>

      {/* ── Видео-фон ── */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={CAR_POSTER}
          className="absolute w-full h-full object-cover object-center"
          style={{ filter: 'saturate(0.7) brightness(0.55)' }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Цветовые оверлеи */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(110deg,#020816 22%,rgba(2,8,22,0.6) 55%,rgba(2,8,22,0.12) 100%)' }} />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top,#020816 0%,rgba(2,8,22,0.5) 25%,transparent 50%)' }} />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to bottom,rgba(2,8,22,0.8) 0%,transparent 16%)' }} />
        {/* Deep blue color grade */}
        <div className="absolute inset-0" style={{ background: 'rgba(1,4,16,0.2)' }} />
      </div>

      {/* Gold particle dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute rounded-full"
               style={{
                 width: '1px', height: '1px',
                 left: `${(i * 43 + 9) % 100}%`,
                 top: `${(i * 61 + 15) % 100}%`,
                 background: '#d4a843',
                 opacity: 0.06 + (i % 4) * 0.04,
                 animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
               }} />
        ))}
      </div>

      {/* ── Контент ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">

          <div className="flex items-center gap-4 mb-7 animate-[fade-in_1s_ease_0.2s_both]">
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
            <span className="font-ibm text-[11px] tracking-[0.42em] uppercase" style={{ color: '#d4a843' }}>
              Premium Auto Import
            </span>
          </div>

          <h1 className="leading-[1.04] mb-6 animate-[fade-up_1s_ease_0.4s_both]"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
            <span className="block text-5xl md:text-6xl xl:text-7xl" style={{ color: 'rgba(255,255,255,0.95)' }}>
              Ваш автомобиль
            </span>
            <span className="block text-5xl md:text-6xl xl:text-7xl gold-shimmer-text mt-1">
              из любой точки мира
            </span>
          </h1>

          <p className="font-ibm text-base leading-relaxed max-w-lg mb-10 animate-[fade-up_1s_ease_0.6s_both]"
             style={{ color: 'rgba(245,223,160,0.5)' }}>
            Поиск, доставка, растаможивание и гарантия качества — полный цикл под ключ.
            Япония, Корея, Китай и по запросу — весь мировой авторынок.
          </p>

          {/* Страны — встроены в контент под описанием */}
          <div className="flex items-center gap-3 mb-10 flex-wrap animate-[fade-up_1s_ease_0.7s_both]">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-sm"
                   style={{ border: '1px solid rgba(212,168,67,0.18)', background: 'rgba(2,8,22,0.45)' }}>
                <span className="text-sm">{c.flag}</span>
                <span className="font-ibm text-[11px] tracking-[0.12em]" style={{ color: 'rgba(245,223,160,0.62)' }}>{c.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-[fade-up_1s_ease_0.8s_both]">
            <button className="btn-gold px-10 py-4 text-sm flex items-center gap-3 group" onClick={onOpenForm}>
              <span>Подобрать автомобиль</span>
              <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="font-ibm text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-300"
                    style={{ border: '1px solid rgba(212,168,67,0.3)', color: '#e8c96a' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,168,67,0.65)'; el.style.background='rgba(212,168,67,0.05)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,168,67,0.3)'; el.style.background='transparent'; }}>
              Рассчитать стоимость
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 animate-[fade-up_1s_ease_1s_both]"
               style={{ borderTop: '1px solid rgba(212,168,67,0.1)' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="gold-text leading-none mb-1.5"
                     style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.85rem', fontWeight: 700 }}>{s.value}</div>
                <div className="font-ibm text-[11px] tracking-wide leading-snug" style={{ color: 'rgba(245,223,160,0.36)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-[fade-in_1s_ease_1.8s_both]">
        <span className="font-ibm text-[9px] tracking-[0.42em] uppercase" style={{ color: 'rgba(212,168,67,0.3)' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom,rgba(212,168,67,0.3),transparent)' }} />
      </div>

      {/* Плавный переход вниз к следующей секции */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: 160, background: 'linear-gradient(to top,#020816 0%,rgba(2,8,22,0.85) 45%,transparent 100%)' }} />
    </section>
  );
}

/* ─── Section wrapper — фон общий (.page-bg в Root), секции полностью прозрачны для бесшовных переходов ─── */
function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative overflow-hidden">
      {children}
    </section>
  );
}

/* ─── Services ──────────────────────────────────────── */
function Services() {
  return (
    <Section id="услуги">
      {/* Radial ambient */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,168,67,0.04),transparent)' }} />

      <div className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
            <span className="font-ibm text-[11px] tracking-[0.38em] uppercase" style={{ color: '#d4a843' }}>Наши услуги</span>
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
          </div>
          <h2 className="rv" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
            Полный цикл <span className="gold-text">под ключ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div key={s.title} className="service-card relative overflow-hidden p-8 group rv"
                 style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="mb-6"><GoldIcon3D name={s.icon} /></div>
              <h3 className="font-ibm font-bold text-sm text-white/90 uppercase tracking-wider mb-3">{s.title}</h3>
              <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.42)' }}>{s.desc}</p>
              <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(212,168,67,0.05),transparent)' }} />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                   style={{ background: 'linear-gradient(90deg,#d4a843,#f5dfa0)' }} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Process ───────────────────────────────────────── */
function Process() {
  const steps = [
    { n: '01', title: 'Заявка',    desc: 'Оставляете запрос с параметрами авто и бюджетом',              icon: 'ClipboardList' },
    { n: '02', title: 'Подбор',    desc: 'Находим лучшие варианты на аукционах, согласовываем с вами',    icon: 'Search' },
    { n: '03', title: 'Покупка',   desc: 'Оформляем сделку. Оплата через банк — вы контролируете',        icon: 'Banknote' },
    { n: '04', title: 'Инспекция', desc: '40-минутное видео от нашего агента прямо на объекте',           icon: 'Video' },
    { n: '05', title: 'Доставка',  desc: 'Морская или наземная — с ежедневным отслеживанием',             icon: 'Ship' },
    { n: '06', title: 'Передача',  desc: 'Растаможка, СБКТС, ПТС и ключи — полный пакет',                icon: 'Car' },
  ];

  return (
    <Section>
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%,rgba(212,168,67,0.03),transparent)' }} />

      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
            <span className="font-ibm text-[11px] tracking-[0.38em] uppercase" style={{ color: '#d4a843' }}>Как мы работаем</span>
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
          </div>
          <h2 className="rv" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
            6 шагов до <span className="gold-text">вашего авто</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="rv relative p-7 group transition-all duration-400 backdrop-blur-sm"
                 style={{ border: '1px solid rgba(212,168,67,0.1)', background: 'rgba(2,10,24,0.7)', transitionDelay: `${(i % 3) * 0.1}s` }}
                 onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.32)')}
                 onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.1)')}>
              <div className="flex items-start gap-4">
                <div className="gold-text leading-none flex-shrink-0 mt-0.5 opacity-28 group-hover:opacity-58 transition-opacity"
                     style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700 }}>{s.n}</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={s.icon} fallback="Star" size={13} className="text-gold-500/55" />
                    <h3 className="font-ibm font-bold text-sm text-white/85 uppercase tracking-wider">{s.title}</h3>
                  </div>
                  <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.38)' }}>{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Trust ─────────────────────────────────────────── */
function Trust() {
  const [reviewIdx, setReviewIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setReviewIdx((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Section id="доверие">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(212,168,67,0.025),transparent)' }} />

      <div className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
            <span className="font-ibm text-[11px] tracking-[0.38em] uppercase" style={{ color: '#d4a843' }}>Почему выбирают нас</span>
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
          </div>
          <h2 className="rv" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
            Работаем на <span className="gold-text">доверии</span>
          </h2>
          <p className="font-ibm text-sm mt-4 max-w-lg mx-auto rv" style={{ color: 'rgba(245,223,160,0.38)' }}>
            Fidelis — в переводе с латыни «верный». Это не просто название — это принцип каждой сделки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((t, i) => (
            <div key={t.title} className="trust-card p-7 group rv" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                     style={{ border: '1px solid rgba(212,168,67,0.2)' }}>
                  <Icon name={t.icon} fallback="Star" size={18} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-ibm font-bold text-sm text-white/85 uppercase tracking-wider mb-2">{t.title}</h3>
                  <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.38)' }}>{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-16 rv">
          <div className="relative overflow-hidden p-8 md:p-12 text-center"
               style={{ border: '1px solid rgba(212,168,67,0.15)', background: 'rgba(2,10,24,0.8)', backdropFilter: 'blur(12px)' }}>
            <div className="absolute top-4 left-8 text-8xl leading-none select-none"
                 style={{ fontFamily: 'serif', color: 'rgba(212,168,67,0.08)' }}>"</div>
            <div className="absolute bottom-0 right-8 text-8xl leading-none rotate-180 select-none"
                 style={{ fontFamily: 'serif', color: 'rgba(212,168,67,0.08)' }}>"</div>

            <div key={reviewIdx} className="animate-[fade-up_0.5s_ease_both]">
              <p className="text-xl md:text-2xl italic leading-relaxed max-w-2xl mx-auto"
                 style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(255,255,255,0.72)' }}>
                {reviews[reviewIdx].text}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ background: 'rgba(212,168,67,0.35)' }} />
                <span className="font-ibm text-xs tracking-[0.25em] uppercase" style={{ color: '#d4a843' }}>
                  {reviews[reviewIdx].author}, {reviews[reviewIdx].city}
                </span>
                <div className="h-px w-8" style={{ background: 'rgba(212,168,67,0.35)' }} />
              </div>
              <div className="font-ibm text-xs mt-1 tracking-wide" style={{ color: 'rgba(245,223,160,0.28)' }}>{reviews[reviewIdx].car}</div>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={13} className="text-gold-500 fill-gold-500" />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setReviewIdx(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{ width: i === reviewIdx ? '2rem' : '0.375rem', height: '0.375rem', background: i === reviewIdx ? '#d4a843' : 'rgba(212,168,67,0.2)' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── FAQ Item ──────────────────────────────────────── */
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? 'rgba(212,168,67,0.4)' : 'rgba(212,168,67,0.12)'}`,
      background: open ? 'rgba(3,12,30,0.9)' : 'rgba(2,8,22,0.55)',
      backdropFilter: 'blur(8px)',
      transition: 'border-color 0.3s ease, background 0.3s ease',
    }}>
      <button className="w-full flex items-start gap-4 p-6 text-left group"
              onClick={() => setOpen((v) => !v)}>
        <span className="gold-text flex-shrink-0 mt-0.5 font-bold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-ibm text-sm font-medium tracking-wide flex-1 transition-colors uppercase"
              style={{ color: open ? '#e8c96a' : 'rgba(255,255,255,0.78)' }}>
          {question}
        </span>
        <div className="flex-shrink-0 mt-0.5 transition-transform duration-300"
             style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
          <Icon name="ChevronDown" size={16} className="text-gold-500/55" />
        </div>
      </button>
      <div style={{ maxHeight: open ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.42s cubic-bezier(0.4,0,0.2,1)' }}>
        <div className="px-6 pb-6 ml-10">
          <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,168,67,0.38),transparent)' }} />
          <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.5)' }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <Section id="faq">

      <div className="py-28 max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
            <span className="font-ibm text-[11px] tracking-[0.38em] uppercase" style={{ color: '#d4a843' }}>FAQ</span>
            <div className="h-px w-10" style={{ background: '#d4a843' }} />
          </div>
          <h2 className="rv" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
            Частые <span className="gold-text">вопросы</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <FaqItem key={i} index={i} question={f.q} answer={f.a} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CTA ───────────────────────────────────────────── */
function CTA({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <Section id="контакты">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 50%,rgba(212,168,67,0.05),transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
           style={{ border: '1px solid rgba(212,168,67,0.05)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
           style={{ border: '1px solid rgba(212,168,67,0.08)' }} />

      <div className="py-28 max-w-3xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-8 rv">
          <div className="h-px w-10" style={{ background: '#d4a843' }} />
          <span className="font-ibm text-[11px] tracking-[0.38em] uppercase" style={{ color: '#d4a843' }}>Начать сотрудничество</span>
          <div className="h-px w-10" style={{ background: '#d4a843' }} />
        </div>

        <h2 className="leading-tight mb-6 rv"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,6vw,4.5rem)', fontWeight: 900, color: 'rgba(255,255,255,0.92)' }}>
          Готовы найти<br /><span className="gold-shimmer-text">ваш автомобиль?</span>
        </h2>

        <p className="font-ibm text-sm leading-relaxed max-w-xl mx-auto mb-10 rv"
           style={{ color: 'rgba(245,223,160,0.44)' }}>
          Оставьте заявку — менеджер свяжется с вами в течение 15 минут и ответит на все вопросы. Первая консультация бесплатна.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 rv">
          <button className="btn-gold px-12 py-4 text-sm flex items-center justify-center gap-3 group">
            <Icon name="MessageCircle" size={16} />
            <span>Написать в WhatsApp</span>
          </button>
          <button className="font-ibm text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ border: '1px solid rgba(212,168,67,0.3)', color: '#e8c96a' }}
                  onClick={onOpenForm}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,168,67,0.62)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,168,67,0.3)'; }}>
            <Icon name="Phone" size={14} />
            <span>Заказать звонок</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 rv"
             style={{ borderTop: '1px solid rgba(212,168,67,0.1)' }}>
          {[
            { icon: 'Mail',     text: 'info@fidelis-import.com' },
            { icon: 'Clock',    text: 'Ответ за 15 минут' },
            { icon: 'FileText', text: 'Работа по договору' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <Icon name={item.icon} size={13} className="text-gold-500/50" />
              <span className="font-ibm text-xs tracking-wide" style={{ color: 'rgba(245,223,160,0.4)' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Footer ────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10" style={{ background: '#020816', borderTop: '1px solid rgba(212,168,67,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <div>
            <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.14em', color: 'rgba(212,168,67,0.68)' }}>FIDELIS</span>
            <span className="font-ibm text-[10px] tracking-widest ml-2" style={{ color: 'rgba(212,168,67,0.38)' }}>Import Solutions</span>
          </div>
        </div>
        <div className="font-ibm text-xs tracking-wide" style={{ color: 'rgba(245,223,160,0.18)' }}>© 2025 Fidelis Import Solutions. Все права защищены.</div>
        <div className="flex items-center gap-5">
          {['Услуги', 'FAQ', 'Контакты'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
               className="font-ibm text-[10px] tracking-[0.18em] uppercase transition-colors"
               style={{ color: 'rgba(245,223,160,0.25)' }}
               onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(212,168,67,0.6)')}
               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(245,223,160,0.25)')}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Lead Form Dialog ─────────────────────────────── */
function LeadFormDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName('');
    setPhone('');
    setBudget('');
    setConsent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast({ title: 'Укажите ваше имя', variant: 'destructive' });
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      toast({ title: 'Укажите корректный номер телефона', variant: 'destructive' });
      return;
    }
    if (!consent) {
      toast({ title: 'Необходимо согласие на обработку персональных данных', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(SUBMIT_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, budget, consent }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast({ title: 'Заявка отправлена!', description: 'Наш менеджер свяжется с вами в течение 15 минут.' });
        resetForm();
        onOpenChange(false);
      } else {
        toast({ title: 'Ошибка отправки', description: data.error || 'Попробуйте ещё раз', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Не удалось отправить заявку', description: 'Проверьте соединение и попробуйте снова', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-0 p-0 overflow-hidden max-w-md"
        style={{ background: '#050d1f' }}
      >
        <div className="p-8" style={{ borderTop: '3px solid #d4a843' }}>
          <DialogHeader className="mb-6">
            <DialogTitle style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'rgba(255,255,255,0.95)' }}>
              Подобрать <span className="gold-text">автомобиль</span>
            </DialogTitle>
            <DialogDescription className="font-ibm text-sm" style={{ color: 'rgba(245,223,160,0.45)' }}>
              Оставьте контакты — менеджер свяжется с вами в течение 15 минут
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="lead-name" className="font-ibm text-xs tracking-wide uppercase" style={{ color: 'rgba(245,223,160,0.55)' }}>Имя</Label>
              <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)}
                     placeholder="Иван Иванов"
                     className="bg-transparent font-ibm"
                     style={{ borderColor: 'rgba(212,168,67,0.25)', color: 'rgba(255,255,255,0.9)' }} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lead-phone" className="font-ibm text-xs tracking-wide uppercase" style={{ color: 'rgba(245,223,160,0.55)' }}>Телефон</Label>
              <Input id="lead-phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel"
                     placeholder="+7 (___) ___-__-__"
                     className="bg-transparent font-ibm"
                     style={{ borderColor: 'rgba(212,168,67,0.25)', color: 'rgba(255,255,255,0.9)' }} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lead-budget" className="font-ibm text-xs tracking-wide uppercase" style={{ color: 'rgba(245,223,160,0.55)' }}>Примерный бюджет</Label>
              <Input id="lead-budget" value={budget} onChange={(e) => setBudget(e.target.value)}
                     placeholder="например, 3–4 млн ₽"
                     className="bg-transparent font-ibm"
                     style={{ borderColor: 'rgba(212,168,67,0.25)', color: 'rgba(255,255,255,0.9)' }} />
            </div>

            <div className="flex items-start gap-3 mt-1">
              <Checkbox id="lead-consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)}
                        className="mt-0.5"
                        style={{ borderColor: 'rgba(212,168,67,0.4)' }} />
              <Label htmlFor="lead-consent" className="font-ibm text-xs leading-relaxed cursor-pointer" style={{ color: 'rgba(245,223,160,0.5)' }}>
                Я согласен на обработку персональных данных в соответствии с политикой конфиденциальности
              </Label>
            </div>

            <button type="submit" disabled={submitting} className="btn-gold px-8 py-4 text-sm mt-2 disabled:opacity-60">
              {submitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Root ──────────────────────────────────────────── */
export default function Index() {
  useReveal();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <div className="page-bg" />
      <div className="page-noise" />
      <div className="grid-pattern pointer-events-none" style={{ position: 'absolute', inset: 0, opacity: 0.3, zIndex: -1 }} />

      <NavBar onOpenForm={() => setFormOpen(true)} />
      <Hero onOpenForm={() => setFormOpen(true)} />
      <Services />
      <Process />
      <Trust />
      <FAQ />
      <CTA onOpenForm={() => setFormOpen(true)} />
      <Footer />

      <LeadFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}