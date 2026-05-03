import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const LOGO_URL = 'https://cdn.poehali.dev/projects/f1f30175-ef7d-405a-be11-a40b5cfa5f35/bucket/5ced9890-3c4d-48ba-ae42-c7a6867bd130.jpg';
const CAR_IMG  = 'https://cdn.poehali.dev/projects/f1f30175-ef7d-405a-be11-a40b5cfa5f35/files/0f0fe1d9-86b4-4dab-b08d-af436c7d0815.jpg';

/* ─── Data ──────────────────────────────────────────── */
const services = [
  {
    icon: 'Search',
    title: 'Поиск и подбор',
    desc: 'Находим автомобиль под ваш запрос и бюджет на крупнейших аукционах Японии, Кореи и Китая. Полный анализ истории.',
  },
  {
    icon: 'Ship',
    title: 'Доставка',
    desc: 'Морская и наземная доставка «под ключ». Страхование груза, трекинг на каждом этапе, точные сроки.',
  },
  {
    icon: 'FileCheck',
    title: 'Растаможивание',
    desc: 'Полное сопровождение таможенного оформления. Оптимизация пошлин, все документы в порядке.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Гарантия качества',
    desc: '40-минутная видеоинспекция от нашего агента на месте до любой покупки. Видите всё своими глазами.',
  },
];

const stats = [
  { value: '500+',   label: 'Автомобилей доставлено' },
  { value: '98%',    label: 'Довольных клиентов' },
  { value: '40 мин', label: 'Видеоинспекция авто' },
  { value: '15 мин', label: 'Ответ менеджера' },
];

const trustItems = [
  { icon: 'FileText',    title: 'Работа по договору',    desc: 'Каждая сделка оформляется официальным договором с фиксацией всех условий, сроков и характеристик автомобиля.' },
  { icon: 'ShieldCheck', title: 'Юридическая чистота',   desc: 'Полная проверка юридической истории авто перед покупкой. Никакого криминала, залогов и скрытых обременений.' },
  { icon: 'Banknote',    title: 'Прозрачная оплата',     desc: 'Оплата проходит через банк — вы осуществляете её лично. Все платёжные документы получаете напрямую.' },
  { icon: 'Headphones',  title: 'Персональный менеджер', desc: 'Ваш менеджер на связи 24/7. Ответ в течение 15 минут. Сопровождаем от заявки до ключей.' },
  { icon: 'Eye',         title: 'Полная прозрачность',   desc: 'Вы видите каждый этап сделки в реальном времени. Никаких скрытых платежей.' },
  { icon: 'Award',       title: 'Проверенные партнёры',  desc: 'Работаем только с верифицированными агентами на аукционах Японии, Кореи и Китая.' },
];

const reviews = [
  {
    text: 'Взял Toyota Land Cruiser 300 из Японии. Видео с осмотром пришло на следующий день — 40 минут детального разбора. Машина пришла точно в срок, документы чистые.',
    author: 'Дмитрий К.', city: 'Москва', car: 'Toyota LC 300, Япония',
  },
  {
    text: 'Заказывал Lexus LX из Японии. Менеджер был на связи буквально 24/7, отвечал мгновенно. Все расходы озвучены заранее, никаких сюрпризов. Рекомендую.',
    author: 'Андрей В.', city: 'Санкт-Петербург', car: 'Lexus LX 570, Япония',
  },
  {
    text: 'Привезли Honda Stepwgn из Японии под ключ. Юридически всё чисто, договор на руках, оплата через банк — всё контролировал сам. Очень надёжная компания.',
    author: 'Сергей Н.', city: 'Екатеринбург', car: 'Honda Stepwgn, Япония',
  },
];

const faqs = [
  {
    q: 'Сколько времени занимает весь процесс от заявки до получения авто?',
    a: 'Не более 75 дней — именно столько занимает полный цикл от заявки до получения автомобиля. Точные сроки зависят от конкретного автомобиля и страны вывоза: из Японии и Кореи обычно 45–60 дней, из Китая — от 30 дней. Мы всегда называем реалистичные сроки заранее.',
  },
  {
    q: 'Какие страны входят в ваш охват?',
    a: 'Основные направления — Япония, Южная Корея и Китай: именно там сосредоточены лучшие предложения по соотношению цена/качество. По запросу клиента работаем по всему миру — ОАЭ, Германия, США, Великобритания и другие рынки.',
  },
  {
    q: 'Как формируется итоговая стоимость авто?',
    a: 'Итоговая стоимость складывается из четырёх составляющих: сумма выкупа автомобиля на аукционе + растаможка + логистика (доставка до вас) + комиссия менеджеров, которая составляет около 80 000 рублей. Никаких скрытых платежей — всё фиксируется в договоре до начала сделки.',
  },
  {
    q: 'Можно ли посмотреть автомобиль до покупки?',
    a: 'Да, обязательно. Наш агент на месте проводит доскональную видеосъёмку автомобиля продолжительностью около 40 минут: снаружи, внутри, под капотом, снизу. Вы видите реальное состояние машины в деталях и принимаете решение осознанно.',
  },
  {
    q: 'Что происходит, если авто не соответствует описанию?',
    a: 'Такие ситуации случаются крайне редко — именно для этого мы проводим тщательную предварительную видеоинспекцию. Но если несоответствие всё же выявлено — мы полностью берём на себя юридическое сопровождение и решаем вопрос в вашу пользу.',
  },
  {
    q: 'Как проходит оплата? Это безопасно?',
    a: 'Оплата проходит через банк, и всю операцию осуществляете лично вы. Все платёжные документы вы получаете напрямую — никаких посредников с вашими деньгами. Максимально прозрачная схема: вы полностью контролируете каждый перевод.',
  },
];

/* ─── Reveal hook ───────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── 3D Gold Icon ─────────────────────────────────── */
function GoldIcon3D({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-14 h-14">
      <div className="absolute inset-0 rounded-xl opacity-40 blur-md"
           style={{ background: 'linear-gradient(135deg,#f5dfa0,#d4a843)' }} />
      <div className="absolute inset-0 rounded-xl"
           style={{
             background: 'linear-gradient(145deg,#f5dfa0 0%,#d4a843 45%,#8c6418 100%)',
             boxShadow: '0 1px 1px rgba(255,255,255,0.35) inset, 0 -2px 4px rgba(0,0,0,0.5) inset, 3px 6px 18px rgba(0,0,0,0.6), 0 0 24px rgba(212,168,67,0.22)',
           }} />
      <Icon name={name} fallback="Star" size={24} className="relative z-10"
            style={{ color: '#0a1628', filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.3))' }} />
    </div>
  );
}

/* ─── NavBar ────────────────────────────────────────── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Услуги', 'Доверие', 'FAQ', 'Контакты'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'backdrop-blur-md shadow-[0_2px_40px_rgba(0,0,0,0.7)]' : ''
    }`} style={{ background: scrolled ? 'rgba(2,8,22,0.96)' : 'transparent' }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Fidelis" className="w-10 h-10 object-contain"
               style={{ mixBlendMode: 'screen', filter: 'brightness(1.15) contrast(1.05)' }} />
          <div>
            <div className="font-ibm font-black text-[15px] text-gold-400 leading-none tracking-tight">FIDELIS</div>
            <div className="font-ibm text-[9px] tracking-[0.22em] text-gold-600/80 uppercase mt-0.5">Import Solutions</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
               className="font-ibm text-xs tracking-[0.18em] text-gold-300/60 hover:text-gold-400 transition-colors duration-300 uppercase">{l}</a>
          ))}
          <button className="btn-gold px-6 py-2.5 text-xs font-bold tracking-widest rounded-none">Получить расчёт</button>
        </div>

        <button className="md:hidden text-gold-400" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden backdrop-blur-md px-6 pb-6 flex flex-col gap-5 border-t border-gold-700/20"
             style={{ background: 'rgba(2,8,22,0.98)' }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
               className="font-ibm text-sm tracking-[0.2em] text-gold-300/70 uppercase">{l}</a>
          ))}
          <button className="btn-gold px-5 py-3 text-xs font-bold tracking-widest w-full">Получить расчёт</button>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#020816' }}>
      {/* Car photo */}
      <div className="absolute inset-0">
        <img src={CAR_IMG} alt="" className="w-full h-full object-cover object-center"
             style={{ opacity: 0.6, filter: 'saturate(0.75) brightness(0.65)' }} />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(100deg,#020816 32%,rgba(2,8,22,0.55) 62%,rgba(2,8,22,0.15) 100%)' }} />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top,#020816 0%,rgba(2,8,22,0.4) 35%,transparent 65%)' }} />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to bottom,rgba(2,8,22,0.75) 0%,transparent 25%)' }} />
      </div>

      {/* Floating gold dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-gold-400"
               style={{
                 width: i % 4 === 0 ? '2px' : '1px',
                 height: i % 4 === 0 ? '2px' : '1px',
                 left: `${(i * 41 + 7) % 100}%`,
                 top: `${(i * 57 + 12) % 100}%`,
                 opacity: 0.1 + (i % 5) * 0.06,
                 animation: `float ${3.5 + (i % 3)}s ease-in-out ${i * 0.35}s infinite`,
               }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-7 animate-[fade-in_1s_ease_0.2s_both]">
            <div className="h-px w-10 bg-gold-500" />
            <span className="font-ibm text-[11px] tracking-[0.4em] text-gold-500 uppercase">Premium Auto Import</span>
          </div>

          <h1 className="leading-[1.04] mb-6 animate-[fade-up_1s_ease_0.4s_both]"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
            <span className="block text-5xl md:text-6xl xl:text-7xl" style={{ color: 'rgba(255,255,255,0.95)' }}>Ваш автомобиль</span>
            <span className="block text-5xl md:text-6xl xl:text-7xl gold-shimmer-text mt-1">из любой точки мира</span>
          </h1>

          <p className="font-ibm text-base leading-relaxed max-w-lg mb-10 animate-[fade-up_1s_ease_0.6s_both]"
             style={{ color: 'rgba(245,223,160,0.52)' }}>
            Поиск, доставка, растаможивание и гарантия качества — полный цикл под ключ.
            Япония, Корея, Китай и по запросу — весь мировой авторынок.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-[fade-up_1s_ease_0.8s_both]">
            <button className="btn-gold px-10 py-4 text-sm font-bold tracking-[0.18em] flex items-center gap-3 group">
              <span>Подобрать автомобиль</span>
              <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border font-ibm text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-300"
                    style={{ borderColor: 'rgba(212,168,67,0.32)', color: '#e8c96a' }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.borderColor='rgba(212,168,67,0.65)'; (e.target as HTMLElement).style.background='rgba(212,168,67,0.05)'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.borderColor='rgba(212,168,67,0.32)'; (e.target as HTMLElement).style.background='transparent'; }}>
              Рассчитать стоимость
            </button>
          </div>

          <div className="mt-14 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 animate-[fade-up_1s_ease_1s_both]"
               style={{ borderTop: '1px solid rgba(212,168,67,0.1)' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="gold-text leading-none mb-1.5"
                     style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.85rem', fontWeight: 700 }}>{s.value}</div>
                <div className="font-ibm text-[11px] tracking-wide leading-snug" style={{ color: 'rgba(245,223,160,0.38)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country badges */}
      <div className="absolute bottom-16 right-6 md:right-12 flex flex-col gap-2 z-10 animate-[fade-in_1s_ease_1.2s_both]">
        {['🇯🇵 Япония', '🇰🇷 Корея', '🇨🇳 Китай', '🌍 По запросу'].map((c) => (
          <span key={c} className="font-ibm text-[11px] text-right px-3 py-1.5 backdrop-blur-sm"
                style={{ color: 'rgba(245,223,160,0.5)', border: '1px solid rgba(212,168,67,0.18)', background: 'rgba(2,8,22,0.35)' }}>
            {c}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20"
           style={{ background: 'linear-gradient(to top,#020816,transparent)' }} />

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-[fade-in_1s_ease_1.8s_both]">
        <span className="font-ibm text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(212,168,67,0.32)' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom,rgba(212,168,67,0.32),transparent)' }} />
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────── */
function Services() {
  return (
    <section id="услуги" className="relative py-24 md:py-28" style={{ background: '#020816' }}>
      <div className="absolute left-0 right-0 top-0 h-px"
           style={{ background: 'linear-gradient(90deg,transparent,rgba(212,168,67,0.22),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10 bg-gold-500" />
            <span className="font-ibm text-[11px] tracking-[0.38em] text-gold-500 uppercase">Наши услуги</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="rv" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
            Полный цикл <span className="gold-text">под ключ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div key={s.title} className="service-card relative overflow-hidden p-8 group rv"
                 style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="mb-6">
                <GoldIcon3D name={s.icon} />
              </div>
              <h3 className="font-ibm font-bold text-sm text-white/90 uppercase tracking-wider mb-3">{s.title}</h3>
              <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.44)' }}>{s.desc}</p>
              <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(212,168,67,0.055),transparent)' }} />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                   style={{ background: 'linear-gradient(90deg,#d4a843,#f5dfa0)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
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
    <section className="relative py-24 overflow-hidden"
             style={{ background: 'linear-gradient(180deg,#020816 0%,#030d1f 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-12" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10 bg-gold-500" />
            <span className="font-ibm text-[11px] tracking-[0.38em] text-gold-500 uppercase">Как мы работаем</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="rv" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
            6 шагов до <span className="gold-text">вашего авто</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="rv relative p-7 group transition-all duration-400"
                 style={{
                   border: '1px solid rgba(212,168,67,0.1)',
                   background: 'rgba(3,12,30,0.6)',
                   transitionDelay: `${(i % 3) * 0.1}s`,
                 }}
                 onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.3)' )}
                 onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.1)')}>
              <div className="flex items-start gap-4">
                <div className="gold-text leading-none flex-shrink-0 mt-0.5 opacity-30 group-hover:opacity-60 transition-opacity"
                     style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700 }}>{s.n}</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={s.icon} fallback="Star" size={13} className="text-gold-500/60" />
                    <h3 className="font-ibm font-bold text-sm text-white/85 uppercase tracking-wider">{s.title}</h3>
                  </div>
                  <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.4)' }}>{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    <section id="доверие" className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#020816' }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10 bg-gold-500" />
            <span className="font-ibm text-[11px] tracking-[0.38em] text-gold-500 uppercase">Почему выбирают нас</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="rv" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
            Работаем на <span className="gold-text">доверии</span>
          </h2>
          <p className="font-ibm text-sm mt-4 max-w-lg mx-auto rv" style={{ color: 'rgba(245,223,160,0.4)' }}>
            Fidelis — в переводе с латыни «верный». Это не просто название — это принцип каждой сделки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((t, i) => (
            <div key={t.title} className="trust-card p-7 group rv" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                     style={{ border: '1px solid rgba(212,168,67,0.22)' }}>
                  <Icon name={t.icon} fallback="Star" size={18} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-ibm font-bold text-sm text-white/85 uppercase tracking-wider mb-2">{t.title}</h3>
                  <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.4)' }}>{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-16 rv">
          <div className="relative overflow-hidden p-8 md:p-12 text-center"
               style={{ border: '1px solid rgba(212,168,67,0.16)', background: '#030c1e' }}>
            <div className="absolute top-4 left-8 text-7xl leading-none" style={{ fontFamily: 'serif', color: 'rgba(212,168,67,0.1)' }}>"</div>
            <div className="absolute bottom-0 right-8 text-7xl leading-none rotate-180" style={{ fontFamily: 'serif', color: 'rgba(212,168,67,0.1)' }}>"</div>

            <div key={reviewIdx} className="animate-[fade-up_0.5s_ease_both]">
              <p className="text-xl md:text-2xl italic leading-relaxed max-w-2xl mx-auto"
                 style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(255,255,255,0.72)' }}>
                {reviews[reviewIdx].text}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ background: 'rgba(212,168,67,0.35)' }} />
                <span className="font-ibm text-xs tracking-[0.25em] text-gold-500 uppercase">
                  {reviews[reviewIdx].author}, {reviews[reviewIdx].city}
                </span>
                <div className="h-px w-8" style={{ background: 'rgba(212,168,67,0.35)' }} />
              </div>
              <div className="font-ibm text-xs mt-1 tracking-wide" style={{ color: 'rgba(245,223,160,0.3)' }}>{reviews[reviewIdx].car}</div>
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
                        style={{
                          width: i === reviewIdx ? '2rem' : '0.375rem',
                          height: '0.375rem',
                          background: i === reviewIdx ? '#d4a843' : 'rgba(212,168,67,0.22)',
                        }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Item (самостоятельный компонент со своим state) ── */
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      border: `1px solid ${open ? 'rgba(212,168,67,0.38)' : 'rgba(212,168,67,0.14)'}`,
      background: open ? '#030c1e' : 'rgba(3,12,30,0.5)',
      transition: 'border-color 0.3s ease, background 0.3s ease',
    }}>
      <button
        className="w-full flex items-start gap-4 p-6 text-left group"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="gold-text flex-shrink-0 mt-0.5 font-bold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-ibm text-sm font-medium tracking-wide flex-1 group-hover:text-gold-300 transition-colors uppercase"
              style={{ color: open ? '#e8c96a' : 'rgba(255,255,255,0.8)' }}>
          {question}
        </span>
        <div className="flex-shrink-0 mt-0.5 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <Icon name="ChevronDown" size={16} className="text-gold-500/55" />
        </div>
      </button>

      {/* Answer — animated via max-height, always in DOM */}
      <div style={{
        maxHeight: open ? '500px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.42s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div className="px-6 pb-6 ml-10">
          <div className="h-px mb-4"
               style={{ background: 'linear-gradient(90deg,transparent,rgba(212,168,67,0.38),transparent)' }} />
          <p className="font-ibm text-sm leading-relaxed" style={{ color: 'rgba(245,223,160,0.52)' }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden"
             style={{ background: 'linear-gradient(180deg,#020816 0%,#030d1f 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5 rv">
            <div className="h-px w-10 bg-gold-500" />
            <span className="font-ibm text-[11px] tracking-[0.38em] text-gold-500 uppercase">FAQ</span>
            <div className="h-px w-10 bg-gold-500" />
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
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────── */
function CTA() {
  return (
    <section id="контакты" className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#020816' }}>
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute inset-0"
           style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(212,168,67,0.05),transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
           style={{ border: '1px solid rgba(212,168,67,0.05)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full"
           style={{ border: '1px solid rgba(212,168,67,0.08)' }} />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-8 rv">
          <div className="h-px w-10 bg-gold-500" />
          <span className="font-ibm text-[11px] tracking-[0.38em] text-gold-500 uppercase">Начать сотрудничество</span>
          <div className="h-px w-10 bg-gold-500" />
        </div>

        <h2 className="leading-tight mb-6 rv"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,6vw,4.5rem)', fontWeight: 900, color: 'rgba(255,255,255,0.92)' }}>
          Готовы найти<br /><span className="gold-shimmer-text">ваш автомобиль?</span>
        </h2>

        <p className="font-ibm text-sm leading-relaxed max-w-xl mx-auto mb-10 rv"
           style={{ color: 'rgba(245,223,160,0.46)' }}>
          Оставьте заявку — менеджер свяжется с вами в течение 15 минут и ответит на все вопросы. Первая консультация бесплатна.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 rv">
          <button className="btn-gold px-12 py-4 text-sm font-bold tracking-[0.18em] flex items-center justify-center gap-3 group">
            <Icon name="MessageCircle" size={16} />
            <span>Написать в WhatsApp</span>
          </button>
          <button className="font-ibm text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ border: '1px solid rgba(212,168,67,0.32)', color: '#e8c96a' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,168,67,0.6)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,168,67,0.32)'; }}>
            <Icon name="Phone" size={14} />
            <span>Заказать звонок</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 rv"
             style={{ borderTop: '1px solid rgba(212,168,67,0.1)' }}>
          {[
            { icon: 'Mail',     text: 'info@fidelis-import.com' },
            { icon: 'Clock',    text: 'Ответ за 15 минут' },
            { icon: 'FileText', text: 'Работа по договору' },
          ].map((item, i, arr) => (
            <div key={item.text} className="flex items-center gap-2">
              <Icon name={item.icon} size={13} className="text-gold-500/52" />
              <span className="font-ibm text-xs tracking-wide" style={{ color: 'rgba(245,223,160,0.42)' }}>{item.text}</span>
              {i < arr.length - 1 && <div className="hidden sm:block h-4 w-px ml-8" style={{ background: 'rgba(212,168,67,0.15)' }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10" style={{ background: '#020816', borderTop: '1px solid rgba(212,168,67,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Fidelis" className="w-9 h-9 object-contain"
               style={{ mixBlendMode: 'screen', filter: 'brightness(1.1)' }} />
          <div>
            <span className="font-ibm font-black text-sm tracking-tight" style={{ color: 'rgba(212,168,67,0.72)' }}>FIDELIS</span>
            <span className="font-ibm text-[10px] tracking-widest ml-2" style={{ color: 'rgba(212,168,67,0.45)' }}>Import Solutions</span>
          </div>
        </div>
        <div className="font-ibm text-xs tracking-wide" style={{ color: 'rgba(245,223,160,0.2)' }}>© 2025 Fidelis Import Solutions. Все права защищены.</div>
        <div className="flex items-center gap-5">
          {['Услуги', 'FAQ', 'Контакты'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
               className="font-ibm text-[10px] tracking-[0.18em] uppercase transition-colors"
               style={{ color: 'rgba(245,223,160,0.28)' }}
               onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(212,168,67,0.65)')}
               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(245,223,160,0.28)')}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ──────────────────────────────────────────── */
export default function Index() {
  useReveal();
  return (
    <div className="min-h-screen" style={{ background: '#020816' }}>
      <NavBar />
      <Hero />
      <Services />
      <Process />
      <Trust />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
