import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const LOGO_URL = 'https://cdn.poehali.dev/projects/f1f30175-ef7d-405a-be11-a40b5cfa5f35/bucket/5ced9890-3c4d-48ba-ae42-c7a6867bd130.jpg';

const services = [
  {
    icon: 'Search',
    title: 'Поиск и подбор',
    desc: 'Находим автомобиль под ваш запрос и бюджет на крупнейших аукционах Японии, Кореи, Китая и других рынков. Полный анализ истории и технического состояния.',
    deco: '🔍',
  },
  {
    icon: 'Ship',
    title: 'Доставка',
    desc: 'Организуем морскую и наземную доставку «под ключ». Страхование груза, отслеживание на всех этапах, точные сроки.',
    deco: '🚢',
  },
  {
    icon: 'FileCheck',
    title: 'Растаможивание',
    desc: 'Полное сопровождение таможенного оформления. Оптимизация пошлин, минимизация рисков, все документы в порядке.',
    deco: '📋',
  },
  {
    icon: 'ShieldCheck',
    title: 'Гарантия качества',
    desc: 'Независимая видеоинспекция перед покупкой — около 40 минут доскональной съёмки от нашего агента на месте.',
    deco: '✅',
  },
];

const stats = [
  { value: '500+', label: 'Автомобилей доставлено' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '40 мин', label: 'Видеоинспекция авто' },
  { value: '15 мин', label: 'Ответ менеджера' },
];

const trustItems = [
  {
    icon: 'FileText',
    title: 'Работа по договору',
    desc: 'Каждая сделка оформляется официальным договором с фиксацией всех условий, сроков и характеристик автомобиля.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Юридическая чистота',
    desc: 'Полная проверка юридической истории авто. Никакого криминала, залогов и скрытых обременений.',
  },
  {
    icon: 'Banknote',
    title: 'Прозрачная оплата',
    desc: 'Оплата через банк напрямую клиентом. Все документы на операцию вы получаете лично — никаких посредников с вашими деньгами.',
  },
  {
    icon: 'Headphones',
    title: 'Персональный менеджер',
    desc: 'Ваш личный менеджер на связи 24/7. Отвечаем в течение 15 минут. Сопровождаем от заявки до ключей.',
  },
  {
    icon: 'Eye',
    title: 'Полная прозрачность',
    desc: 'Вы видите каждый этап сделки в режиме реального времени. Никаких скрытых платежей и неожиданных расходов.',
  },
  {
    icon: 'Award',
    title: 'Сертифицированные партнёры',
    desc: 'Работаем только с проверенными агентами и аукционами. Каждый партнёр прошёл строгую верификацию.',
  },
];

const reviews = [
  {
    text: 'Взял Toyota Land Cruiser 300 из Японии. Всё прошло идеально — видео с осмотром пришло на следующий день после запроса, машина пришла точно в срок. Документы чистые. Очень доволен.',
    author: 'Дмитрий К.',
    city: 'Москва',
    car: 'Toyota LC 300, Япония',
  },
  {
    text: 'Заказывал через Fidelis Lexus LX из Японии. Менеджер был на связи буквально 24/7, отвечал мгновенно. Все расходы были озвучены заранее, никаких сюрпризов. Рекомендую.',
    author: 'Андрей В.',
    city: 'Санкт-Петербург',
    car: 'Lexus LX 570, Япония',
  },
  {
    text: 'Привезли Honda Stepwgn из Японии под ключ. Юридически всё чисто, договор на руках, оплата через банк — всё сам контролировал. Очень надёжная компания.',
    author: 'Сергей Н.',
    city: 'Екатеринбург',
    car: 'Honda Stepwgn, Япония',
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
    a: 'Да, обязательно. Наш агент на месте проводит доскональную видеосъёмку автомобиля продолжительностью около 40 минут: снаружи, внутри, под капотом, снизу. Вы видите реальное состояние машины в деталях, можете задать вопросы и получить полный фотоотчёт.',
  },
  {
    q: 'Что происходит, если авто не соответствует описанию?',
    a: 'Такие ситуации случаются крайне редко — именно для этого мы проводим тщательную предварительную инспекцию. Но если несоответствие всё же выявлено — мы полностью берём на себя юридическое сопровождение и решаем вопрос в вашу пользу. Вы не остаётесь один на один с проблемой.',
  },
  {
    q: 'Как проходит оплата? Это безопасно?',
    a: 'Оплата проходит через банк, и всю операцию осуществляете лично вы. Все платёжные документы вы получаете напрямую — никаких посредников с вашими деньгами. Это максимально прозрачная и безопасная схема: вы полностью контролируете каждый перевод.',
  },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Animated Car SVG ─────────────────────────────────── */
function CarSVG() {
  return (
    <div className="relative w-full flex items-center justify-center select-none pointer-events-none">
      {/* Ground glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-4 bg-gold-500/10 blur-2xl rounded-full" />

      <svg
        viewBox="0 0 800 320"
        className="w-full max-w-2xl animate-[float_5s_ease-in-out_infinite]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2d55" />
            <stop offset="50%" stopColor="#0d1a30" />
            <stop offset="100%" stopColor="#050d1a" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8882a" />
            <stop offset="50%" stopColor="#f5dfa0" />
            <stop offset="100%" stopColor="#d4a843" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a7ab5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1a3d6e" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="70%" stopColor="#111" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Body shadow */}
        <ellipse cx="400" cy="295" rx="280" ry="18" fill="rgba(0,0,0,0.5)" />

        {/* Car body */}
        <g filter="url(#shadow)">
          {/* Lower body */}
          <path
            d="M100 220 L120 180 L680 180 L700 220 L700 260 L100 260 Z"
            fill="url(#bodyGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
          />
          {/* Upper body / cabin */}
          <path
            d="M200 180 L240 110 L310 85 L490 85 L560 110 L600 180 Z"
            fill="url(#bodyGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
          />
        </g>

        {/* Gold accent stripe */}
        <path
          d="M110 230 L690 230"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Windows */}
        <path
          d="M248 178 L270 118 L320 95 L480 95 L530 118 L552 178 Z"
          fill="url(#glassGrad)"
          stroke="#4a7ab5"
          strokeWidth="1"
          opacity="0.9"
        />
        {/* Window divider */}
        <line x1="400" y1="95" x2="400" y2="178" stroke="#4a7ab5" strokeWidth="1.5" opacity="0.5" />

        {/* Window shine */}
        <path
          d="M260 130 L280 105 L330 100 L280 138 Z"
          fill="white"
          opacity="0.08"
        />
        <path
          d="M420 100 L500 100 L520 130 L420 140 Z"
          fill="white"
          opacity="0.05"
        />

        {/* Headlights */}
        <ellipse cx="135" cy="218" rx="25" ry="12" fill="#d4a843" opacity="0.9" filter="url(#glow)" />
        <ellipse cx="135" cy="218" rx="18" ry="8" fill="#f5dfa0" opacity="0.95" filter="url(#glow)" />
        {/* Headlight beam */}
        <path
          d="M112 212 L40 195 L40 241 L112 224 Z"
          fill="url(#goldGrad)"
          opacity="0.15"
        />

        {/* Taillights */}
        <rect x="655" y="208" width="30" height="16" rx="2" fill="#c0392b" opacity="0.9" filter="url(#glow)" />
        <rect x="660" y="211" width="20" height="10" rx="1" fill="#e74c3c" opacity="0.8" />

        {/* Front wheel */}
        <circle cx="210" cy="262" r="42" fill="url(#wheelGrad)" stroke="url(#goldGrad)" strokeWidth="2" />
        <circle cx="210" cy="262" r="28" fill="#1a1a1a" stroke="#d4a843" strokeWidth="1" />
        <circle cx="210" cy="262" r="14" fill="#111" stroke="#d4a843" strokeWidth="0.5" />
        {/* Spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={210 + 16 * Math.cos((angle * Math.PI) / 180)}
            y1={262 + 16 * Math.sin((angle * Math.PI) / 180)}
            x2={210 + 27 * Math.cos((angle * Math.PI) / 180)}
            y2={262 + 27 * Math.sin((angle * Math.PI) / 180)}
            stroke="#d4a843"
            strokeWidth="1.5"
          />
        ))}
        <circle cx="210" cy="262" r="4" fill="#d4a843" />

        {/* Rear wheel */}
        <circle cx="590" cy="262" r="42" fill="url(#wheelGrad)" stroke="url(#goldGrad)" strokeWidth="2" />
        <circle cx="590" cy="262" r="28" fill="#1a1a1a" stroke="#d4a843" strokeWidth="1" />
        <circle cx="590" cy="262" r="14" fill="#111" stroke="#d4a843" strokeWidth="0.5" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={590 + 16 * Math.cos((angle * Math.PI) / 180)}
            y1={262 + 16 * Math.sin((angle * Math.PI) / 180)}
            x2={590 + 27 * Math.cos((angle * Math.PI) / 180)}
            y2={262 + 27 * Math.sin((angle * Math.PI) / 180)}
            stroke="#d4a843"
            strokeWidth="1.5"
          />
        ))}
        <circle cx="590" cy="262" r="4" fill="#d4a843" />

        {/* Door handle */}
        <rect x="355" y="200" width="35" height="5" rx="2.5" fill="#d4a843" opacity="0.7" />
        <rect x="440" y="200" width="35" height="5" rx="2.5" fill="#d4a843" opacity="0.7" />

        {/* Grille */}
        <rect x="108" y="210" width="22" height="14" rx="2" fill="url(#bodyGrad)" stroke="#d4a843" strokeWidth="0.8" opacity="0.8" />
        {[212, 216, 220].map((y) => (
          <line key={y} x1="110" y1={y} x2="128" y2={y} stroke="#d4a843" strokeWidth="0.6" opacity="0.6" />
        ))}

        {/* Brand badge */}
        <circle cx="400" cy="180" r="6" fill="#d4a843" opacity="0.6" />
      </svg>

      {/* Speed lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-20">
        {[80, 120, 60, 100, 70].map((w, i) => (
          <div
            key={i}
            className="h-px bg-gradient-to-r from-gold-500 to-transparent animate-[slide-right_2s_ease-in-out_infinite]"
            style={{ width: `${w}px`, animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────── */
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy-950/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Fidelis"
            className="w-11 h-11 object-contain"
          />
          <div>
            <div className="font-montserrat font-black text-base text-gold-400 leading-none tracking-tight">FIDELIS</div>
            <div className="font-ibm text-[9px] tracking-[0.18em] text-gold-600 uppercase">Import Solutions</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-oswald text-xs tracking-[0.2em] text-gold-300/70 hover:text-gold-400 transition-colors duration-300 uppercase"
            >
              {l}
            </a>
          ))}
          <button className="btn-gold px-5 py-2 text-xs font-bold tracking-widest rounded-none">
            Получить расчёт
          </button>
        </div>

        <button className="md:hidden text-gold-400" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-950/98 backdrop-blur-md px-6 pb-6 flex flex-col gap-5 border-t border-gold-700/20">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-oswald text-sm tracking-[0.2em] text-gold-300/70 uppercase"
            >
              {l}
            </a>
          ))}
          <button className="btn-gold px-5 py-3 text-xs font-bold tracking-widest w-full">
            Получить расчёт
          </button>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,168,67,0.12),transparent)]" />
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-25" />

      {/* Road perspective lines */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden opacity-20">
        {[-3,-2,-1,0,1,2,3].map((i) => (
          <div
            key={i}
            className="absolute bottom-0 h-full w-px bg-gradient-to-t from-gold-500/60 to-transparent"
            style={{ left: `calc(50% + ${i * 14}%)`, transform: `perspective(300px) rotateX(40deg)` }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-4 mb-6 animate-[fade-in_1s_ease_0.2s_both]">
              <div className="h-px w-10 bg-gold-500" />
              <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">
                Premium Auto Import
              </span>
            </div>

            <h1 className="font-cormorant font-light leading-[1.05] mb-5 animate-[fade-up_1s_ease_0.4s_both]">
              <span className="block text-5xl md:text-6xl xl:text-7xl text-white/90">Ваш автомобиль</span>
              <span className="block text-5xl md:text-6xl xl:text-7xl gold-shimmer-text mt-1">из любой точки мира</span>
            </h1>

            <p className="font-ibm text-base text-gold-300/60 leading-relaxed max-w-lg mb-8 animate-[fade-up_1s_ease_0.6s_both]">
              Поиск, доставка, растаможивание и гарантия качества — полный цикл под ключ.
              Работаем с Японией, Кореей, Китаем и другими рынками по всему миру.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-[fade-up_1s_ease_0.8s_both]">
              <button className="btn-gold px-10 py-4 text-sm font-bold tracking-[0.2em] flex items-center gap-3 group">
                <span>Подобрать автомобиль</span>
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-gold-500/40 text-gold-400 font-oswald text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-gold-500/80 hover:bg-gold-500/5 transition-all duration-300">
                Рассчитать стоимость
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-gold-500/15 grid grid-cols-2 md:grid-cols-4 gap-6 animate-[fade-up_1s_ease_1s_both]">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-cormorant text-2xl md:text-3xl gold-text font-semibold leading-none mb-1">{s.value}</div>
                  <div className="font-ibm text-[11px] text-gold-300/45 tracking-wide leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated car */}
          <div className="hidden lg:flex flex-col items-center justify-center animate-[fade-in_1.5s_ease_0.5s_both]">
            <CarSVG />
            {/* Country badges */}
            <div className="flex items-center gap-3 mt-6 flex-wrap justify-center">
              {['🇯🇵 Япония', '🇰🇷 Корея', '🇨🇳 Китай', '🌍 По запросу'].map((c) => (
                <span
                  key={c}
                  className="font-ibm text-[11px] text-gold-300/60 border border-gold-500/20 px-3 py-1 tracking-wide"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile car */}
      <div className="lg:hidden w-full px-6 pb-8 animate-[fade-in_1.5s_ease_0.5s_both]">
        <CarSVG />
        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          {['🇯🇵 Япония', '🇰🇷 Корея', '🇨🇳 Китай', '🌍 По запросу'].map((c) => (
            <span key={c} className="font-ibm text-[10px] text-gold-300/55 border border-gold-500/20 px-2 py-1">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-950 to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fade-in_1s_ease_1.8s_both]">
        <span className="font-oswald text-[9px] tracking-[0.4em] text-gold-500/40 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-500/40 to-transparent" />
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────── */
function Services() {
  return (
    <section id="услуги" className="relative py-24 md:py-28 bg-navy-950">
      {/* Automotive stripe deco */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6 reveal">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">Наши услуги</span>
            <div className="h-px w-12 bg-gold-500" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white/90 reveal delay-100">
            Полный цикл <span className="gold-text">под ключ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card relative overflow-hidden p-8 group reveal delay-${(i + 1) * 100}`}
            >
              {/* Decorative auto-themed corner */}
              <div className="absolute top-4 right-4 text-5xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none select-none">
                {s.deco}
              </div>

              <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500/70 transition-colors duration-300">
                <Icon name={s.icon} fallback="Star" size={22} className="text-gold-400" />
              </div>

              <h3 className="font-montserrat font-bold text-sm tracking-tight text-white/90 uppercase mb-3">{s.title}</h3>
              <p className="font-ibm text-sm text-gold-300/50 leading-relaxed">{s.desc}</p>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold-500 to-gold-300 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
    </section>
  );
}

/* ── Process ──────────────────────────────────────────── */
function Process() {
  const steps = [
    { n: '01', title: 'Заявка', desc: 'Оставляете запрос с параметрами авто и бюджетом', icon: 'ClipboardList' },
    { n: '02', title: 'Подбор', desc: 'Находим лучшие варианты на аукционах и согласовываем', icon: 'Search' },
    { n: '03', title: 'Покупка', desc: 'Оформляем сделку, оплата через банк — вы контролируете', icon: 'Banknote' },
    { n: '04', title: 'Инспекция', desc: '40-минутное видео от нашего агента на месте', icon: 'Video' },
    { n: '05', title: 'Доставка', desc: 'Морская или наземная — с отслеживанием каждый день', icon: 'Ship' },
    { n: '06', title: 'Передача', desc: 'Растаможка, СБКТС, ПТС и ключи — полный пакет', icon: 'Car' },
  ];

  return (
    <section className="relative py-24 bg-navy-800/30 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6 reveal">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">Как мы работаем</span>
            <div className="h-px w-12 bg-gold-500" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white/90 reveal delay-100">
            6 шагов до <span className="gold-text">вашего авто</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`relative p-7 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 group bg-navy-900/40 reveal delay-${(i % 3 + 1) * 100}`}
            >
              <div className="flex items-start gap-4">
                <div className="font-cormorant text-4xl font-light gold-text opacity-30 group-hover:opacity-60 transition-opacity leading-none flex-shrink-0 mt-1">
                  {s.n}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={s.icon} fallback="Star" size={15} className="text-gold-500/70" />
                    <h3 className="font-montserrat font-bold text-sm text-white/85 uppercase tracking-tight">{s.title}</h3>
                  </div>
                  <p className="font-ibm text-sm text-gold-300/45 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Trust ────────────────────────────────────────────── */
function Trust() {
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setReviewIdx((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="доверие" className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
      {/* Subtle car silhouette deco */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none select-none">
        <svg viewBox="0 0 600 250" className="w-[500px]" fill="#d4a843">
          <path d="M50 180 L80 120 L200 80 L400 80 L500 120 L550 180 L550 210 L50 210 Z" />
          <circle cx="160" cy="212" r="35" />
          <circle cx="440" cy="212" r="35" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6 reveal">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">Почему выбирают нас</span>
            <div className="h-px w-12 bg-gold-500" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white/90 reveal delay-100">
            Работаем на <span className="gold-text">доверии</span>
          </h2>
          <p className="font-ibm text-sm text-gold-300/45 mt-4 max-w-lg mx-auto reveal delay-200">
            Fidelis — в переводе с латыни «верный». Это не просто название — это принцип каждой сделки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((t, i) => (
            <div
              key={t.title}
              className={`trust-card p-7 group reveal delay-${(i % 3 + 1) * 100}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-gold-500/25 flex items-center justify-center flex-shrink-0 group-hover:border-gold-500/60 transition-colors duration-300">
                  <Icon name={t.icon} fallback="Star" size={18} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-sm text-white/85 uppercase tracking-tight mb-2">{t.title}</h3>
                  <p className="font-ibm text-sm text-gold-300/45 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews carousel */}
        <div className="mt-16 reveal">
          <div className="border border-gold-500/20 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-4 left-8 text-7xl font-cormorant text-gold-500/12 leading-none">"</div>
            <div className="absolute bottom-0 right-8 text-7xl font-cormorant text-gold-500/12 leading-none rotate-180">"</div>

            <div
              key={reviewIdx}
              className="animate-[fade-up_0.5s_ease_both]"
            >
              <p className="font-cormorant text-xl md:text-2xl text-white/75 italic leading-relaxed max-w-2xl mx-auto">
                {reviews[reviewIdx].text}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gold-500/40" />
                <span className="font-oswald text-xs tracking-[0.25em] text-gold-500 uppercase">
                  {reviews[reviewIdx].author}, {reviews[reviewIdx].city}
                </span>
                <div className="h-px w-8 bg-gold-500/40" />
              </div>
              <div className="font-ibm text-xs text-gold-300/35 mt-1 tracking-wide">{reviews[reviewIdx].car}</div>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={13} className="text-gold-500 fill-gold-500" />
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === reviewIdx
                      ? 'w-8 h-1.5 bg-gold-500'
                      : 'w-1.5 h-1.5 bg-gold-500/25 hover:bg-gold-500/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-navy-800/25 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-12" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6 reveal">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">FAQ</span>
            <div className="h-px w-12 bg-gold-500" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white/90 reveal delay-100">
            Частые <span className="gold-text">вопросы</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`faq-item reveal delay-${(i % 3 + 1) * 100} ${openIdx === i ? 'open' : ''}`}
            >
              <button
                className="w-full flex items-start gap-4 p-6 text-left group"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-cormorant text-lg gold-text flex-shrink-0 mt-0.5 font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-oswald text-sm tracking-[0.06em] text-white/80 uppercase flex-1 group-hover:text-gold-300 transition-colors">
                  {f.q}
                </span>
                <Icon
                  name={openIdx === i ? 'ChevronUp' : 'ChevronDown'}
                  size={16}
                  className="text-gold-500/60 flex-shrink-0 mt-0.5 transition-transform duration-300"
                />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 pt-0 ml-10 animate-[fade-up_0.3s_ease_both]">
                  <div className="h-px gold-divider mb-4" />
                  <p className="font-ibm text-sm text-gold-300/55 leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="контакты" className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(212,168,67,0.06),transparent)]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-500/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-500/8 rounded-full" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-8 reveal">
          <div className="h-px w-12 bg-gold-500" />
          <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">Начать сотрудничество</span>
          <div className="h-px w-12 bg-gold-500" />
        </div>

        <h2 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-light text-white/90 leading-tight mb-6 reveal delay-100">
          Готовы найти<br />
          <span className="gold-shimmer-text">ваш автомобиль?</span>
        </h2>

        <p className="font-ibm text-sm text-gold-300/50 leading-relaxed max-w-xl mx-auto mb-10 reveal delay-200">
          Оставьте заявку — менеджер свяжется с вами в течение 15 минут и ответит на все вопросы. Первая консультация бесплатна.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 reveal delay-300">
          <button className="btn-gold px-12 py-4 text-sm font-bold tracking-[0.2em] flex items-center justify-center gap-3 group">
            <Icon name="MessageCircle" size={16} />
            <span>Написать в WhatsApp</span>
          </button>
          <button className="border border-gold-500/40 text-gold-400 font-oswald text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-gold-500/70 hover:bg-gold-500/5 transition-all duration-300 flex items-center justify-center gap-2">
            <Icon name="Phone" size={14} />
            <span>Заказать звонок</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t border-gold-500/10 reveal delay-400">
          <div className="flex items-center gap-3">
            <Icon name="Mail" size={14} className="text-gold-500/60" />
            <span className="font-ibm text-xs text-gold-300/50 tracking-wide">info@fidelis-import.com</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-gold-500/20" />
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={14} className="text-gold-500/60" />
            <span className="font-ibm text-xs text-gold-300/50 tracking-wide">Ответ в течение 15 минут</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-gold-500/20" />
          <div className="flex items-center gap-3">
            <Icon name="FileText" size={14} className="text-gold-500/60" />
            <span className="font-ibm text-xs text-gold-300/50 tracking-wide">Работа по договору</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Fidelis" className="w-9 h-9 object-contain" />
          <div className="font-montserrat font-black text-sm text-gold-400/70 tracking-tight">
            FIDELIS <span className="font-ibm font-normal text-[10px] text-gold-600 tracking-widest">Import Solutions</span>
          </div>
        </div>

        <div className="font-ibm text-xs text-gold-300/25 tracking-wide">
          © 2025 Fidelis Import Solutions. Все права защищены.
        </div>

        <div className="flex items-center gap-5">
          {['Услуги', 'FAQ', 'Контакты'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-oswald text-[10px] tracking-[0.2em] text-gold-300/35 hover:text-gold-400/70 transition-colors uppercase"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── Root ─────────────────────────────────────────────── */
export default function Index() {
  useReveal();

  return (
    <div className="min-h-screen bg-navy-950">
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
