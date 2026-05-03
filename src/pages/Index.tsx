import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/f1f30175-ef7d-405a-be11-a40b5cfa5f35/files/a6e68de1-4366-4431-9cdf-c24c32cddf3d.jpg';

const services = [
  {
    icon: 'Search',
    title: 'Поиск и подбор',
    desc: 'Находим автомобиль под ваш запрос и бюджет на крупнейших аукционах и рынках Азии, Европы и Америки. Полный анализ истории и технического состояния.',
    kanji: '探',
  },
  {
    icon: 'Ship',
    title: 'Доставка',
    desc: 'Организуем морскую и наземную доставку «под ключ». Страхование груза, отслеживание на всех этапах, точные сроки.',
    kanji: '送',
  },
  {
    icon: 'FileCheck',
    title: 'Растаможивание',
    desc: 'Полное сопровождение таможенного оформления. Оптимизация пошлин, минимизация рисков, все документы в порядке.',
    kanji: '関',
  },
  {
    icon: 'ShieldCheck',
    title: 'Гарантия качества',
    desc: 'Независимая техническая экспертиза перед покупкой. Гарантия соответствия автомобиля заявленным характеристикам.',
    kanji: '証',
  },
];

const stats = [
  { value: '500+', label: 'Автомобилей доставлено' },
  { value: '7 лет', label: 'На рынке импорта' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '15+', label: 'Стран присутствия' },
];

const trustItems = [
  {
    icon: 'Award',
    title: 'Официальная лицензия',
    desc: 'Работаем в полном соответствии с законодательством. Все документы оформляются официально.',
  },
  {
    icon: 'Eye',
    title: 'Полная прозрачность',
    desc: 'Вы видите каждый этап сделки: от поиска до передачи ключей. Никаких скрытых платежей.',
  },
  {
    icon: 'Headphones',
    title: 'Персональный менеджер',
    desc: 'Ваш личный менеджер на связи 24/7. Отвечаем в течение 15 минут на любой запрос.',
  },
  {
    icon: 'Landmark',
    title: 'Юридическая защита',
    desc: 'Договор с фиксацией всех условий. Ваши средства защищены на каждом этапе сделки.',
  },
  {
    icon: 'Globe',
    title: 'Международная сеть',
    desc: 'Собственные партнёры в Японии, Корее, ОАЭ, Германии и США. Доступ к эксклюзивным лотам.',
  },
  {
    icon: 'Star',
    title: 'Репутация 7 лет',
    desc: 'Сотни успешных сделок. Рекомендации клиентов — наш главный актив.',
  },
];

const faqs = [
  {
    q: 'Сколько времени занимает весь процесс от заявки до получения авто?',
    a: 'В среднем 4–8 недель в зависимости от страны отправки и выбранного способа доставки. Из Японии и Кореи — около 5 недель, из Европы — 3–4 недели. Мы всегда называем точные сроки заранее.',
  },
  {
    q: 'Какие страны входят в ваш охват?',
    a: 'Работаем со всеми ключевыми авторынками: Япония, Южная Корея, ОАЭ, Германия, США, Великобритания, Китай. Для каждой страны — проверенные партнёры и отлаженная логистика.',
  },
  {
    q: 'Как формируется итоговая стоимость авто?',
    a: 'Итоговая цена = стоимость автомобиля + доставка + таможенные пошлины и сборы + наша комиссия. Мы предоставляем детальный расчёт до начала сделки. Никаких скрытых платежей.',
  },
  {
    q: 'Можно ли посмотреть автомобиль до покупки?',
    a: 'Да. Мы организуем полноценную видеоинспекцию с нашим представителем на месте. Вы увидите авто в реальном времени, сможете задать вопросы и получить детальный фотоотчёт.',
  },
  {
    q: 'Что происходит, если авто не соответствует описанию?',
    a: 'Это наша ответственность. Договор фиксирует все характеристики. В случае несоответствия — возврат средств или замена автомобиля. За 7 лет работы такие ситуации решались в 100% случаев в пользу клиента.',
  },
  {
    q: 'Как проходит оплата? Это безопасно?',
    a: 'Оплата поэтапная: аванс для бронирования лота, остаток после подтверждения отправки. Деньги переводятся только на счета партнёров с историей. Полная безопасность на каждом шаге.',
  },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-gold-500 flex items-center justify-center">
            <span className="text-gold-400 font-cormorant font-bold text-lg leading-none">F</span>
          </div>
          <div>
            <div className="font-oswald text-sm tracking-[0.25em] text-gold-400 uppercase leading-none">Fidelis</div>
            <div className="font-ibm text-[9px] tracking-[0.2em] text-gold-600 uppercase">Import Solutions</div>
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

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating kanji deco */}
      <div className="absolute top-1/4 right-8 md:right-24 text-[200px] md:text-[320px] font-cormorant text-gold-500/5 pointer-events-none select-none leading-none animate-[float_6s_ease-in-out_infinite]">
        車
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 animate-[fade-in_1s_ease_0.2s_both]">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">
              Premium Auto Import
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-cormorant font-light leading-[1.05] mb-6 animate-[fade-up_1s_ease_0.4s_both]">
            <span className="block text-5xl md:text-7xl text-white/90">Ваш автомобиль</span>
            <span className="block text-5xl md:text-7xl gold-shimmer-text mt-1">из любой точки мира</span>
          </h1>

          {/* Sub */}
          <p className="font-ibm text-base md:text-lg text-gold-300/60 leading-relaxed max-w-xl mb-10 animate-[fade-up_1s_ease_0.6s_both]">
            Поиск, доставка, растаможивание и гарантия качества — полный цикл под ключ. 
            Работаем с рынками Японии, Кореи, Европы и США с 2017 года.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 animate-[fade-up_1s_ease_0.8s_both]">
            <button className="btn-gold px-10 py-4 text-sm font-bold tracking-[0.2em] flex items-center gap-3 group">
              <span>Подобрать автомобиль</span>
              <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gold-500/40 text-gold-400 font-oswald text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-gold-500/80 hover:bg-gold-500/5 transition-all duration-300">
              Рассчитать стоимость
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-16 pt-10 border-t border-gold-500/15 grid grid-cols-2 md:grid-cols-4 gap-8 animate-[fade-up_1s_ease_1s_both]">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-cormorant text-3xl md:text-4xl gold-text font-semibold leading-none mb-1">{s.value}</div>
                <div className="font-ibm text-xs text-gold-300/45 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fade-in_1s_ease_1.5s_both]">
        <span className="font-oswald text-[9px] tracking-[0.4em] text-gold-500/40 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-500/40 to-transparent" />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="услуги" className="relative py-24 md:py-32 bg-navy-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6 reveal">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">Наши услуги</span>
            <div className="h-px w-12 bg-gold-500" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white/90 reveal delay-100">
            Полный цикл <span className="gold-text">под ключ</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card relative overflow-hidden p-8 group reveal delay-${(i + 1) * 100}`}
            >
              {/* Kanji watermark */}
              <div className="absolute top-4 right-4 text-8xl font-cormorant text-gold-500/8 pointer-events-none select-none group-hover:text-gold-500/14 transition-all duration-500">
                {s.kanji}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500/70 transition-colors duration-300">
                <Icon name={s.icon} fallback="Star" size={22} className="text-gold-400" />
              </div>

              <h3 className="font-oswald text-lg tracking-[0.1em] text-white/90 uppercase mb-3">{s.title}</h3>
              <p className="font-ibm text-sm text-gold-300/50 leading-relaxed">{s.desc}</p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold-500 to-gold-300 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative side lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
    </section>
  );
}

function Process() {
  const steps = [
    { n: '01', title: 'Заявка', desc: 'Оставляете запрос с параметрами авто и бюджетом' },
    { n: '02', title: 'Подбор', desc: 'Находим лучшие варианты и согласовываем с вами' },
    { n: '03', title: 'Покупка', desc: 'Оформляем сделку и вносим оплату на аукционе' },
    { n: '04', title: 'Доставка', desc: 'Организуем отправку с отслеживанием на каждом этапе' },
    { n: '05', title: 'Оформление', desc: 'Растаможка, СБКТС, регистрация — берём на себя' },
    { n: '06', title: 'Передача', desc: 'Получаете авто с полным пакетом документов' },
  ];

  return (
    <section className="relative py-24 bg-navy-900/40 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute right-0 top-0 text-[300px] font-cormorant text-gold-500/4 pointer-events-none select-none leading-none">道</div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6 reveal">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-oswald text-xs tracking-[0.35em] text-gold-500 uppercase">Как мы работаем</span>
            <div className="h-px w-12 bg-gold-500" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white/90 reveal delay-100">
            6 шагов до <span className="gold-text">вашего авто</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`relative p-7 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 group reveal delay-${(i % 3 + 1) * 100}`}
            >
              <div className="font-cormorant text-6xl font-light gold-text opacity-25 group-hover:opacity-50 transition-opacity leading-none mb-4">
                {s.n}
              </div>
              <h3 className="font-oswald text-base tracking-[0.12em] text-white/85 uppercase mb-2">{s.title}</h3>
              <p className="font-ibm text-sm text-gold-300/45 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section id="доверие" className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
      <div className="absolute left-0 top-0 text-[280px] font-cormorant text-gold-500/4 pointer-events-none select-none leading-none">信</div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
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
                  <h3 className="font-oswald text-sm tracking-[0.12em] text-white/85 uppercase mb-2">{t.title}</h3>
                  <p className="font-ibm text-sm text-gold-300/45 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review quote */}
        <div className="mt-16 border border-gold-500/20 p-8 md:p-12 text-center relative overflow-hidden reveal">
          <div className="absolute top-4 left-8 text-6xl font-cormorant text-gold-500/15 leading-none">"</div>
          <div className="absolute bottom-4 right-8 text-6xl font-cormorant text-gold-500/15 leading-none rotate-180">"</div>
          <p className="font-cormorant text-xl md:text-2xl text-white/75 italic leading-relaxed max-w-2xl mx-auto">
            Забрал BMW 5 серии из Германии. Ребята сопровождали на каждом шаге, все документы чистые. 
            Рекомендую без оговорок.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gold-500/40" />
            <span className="font-oswald text-xs tracking-[0.25em] text-gold-500 uppercase">Алексей М., Москва</span>
            <div className="h-px w-8 bg-gold-500/40" />
          </div>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={14} className="text-gold-500 fill-gold-500" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-navy-900/30 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute right-0 bottom-0 text-[260px] font-cormorant text-gold-500/4 pointer-events-none select-none leading-none">問</div>

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
                <span className="font-oswald text-sm tracking-[0.08em] text-white/80 uppercase flex-1 group-hover:text-gold-300 transition-colors">
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

function CTA() {
  return (
    <section id="контакты" className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold-700/5 via-transparent to-navy-900/50" />

      {/* Decorative circles */}
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

        {/* Contact info */}
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
            <Icon name="Globe" size={14} className="text-gold-500/60" />
            <span className="font-ibm text-xs text-gold-300/50 tracking-wide">15+ стран присутствия</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-gold-500/40 flex items-center justify-center">
            <span className="text-gold-400 font-cormorant font-bold text-base leading-none">F</span>
          </div>
          <div>
            <div className="font-oswald text-xs tracking-[0.25em] text-gold-400/70 uppercase leading-none">Fidelis Import Solutions</div>
          </div>
        </div>

        <div className="font-ibm text-xs text-gold-300/25 tracking-wide">
          © 2024 Fidelis Import Solutions. Все права защищены.
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