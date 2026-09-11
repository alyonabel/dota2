import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import styles from './App.module.scss'

type Language = 'ru' | 'en'

const copy = {
  ru: {
    nav: ['Тренировки', 'Академия', 'О нас'], book: 'Записаться', modalKicker: 'Когда будете готовы', modalTitle: 'Записаться на занятие',
    modalText: 'Календарь записи скоро появится. Пока свяжитесь с нами, чтобы выбрать удобное время.', modalClose: 'Понятно',
    hero: ['Secrets', 'of Dota'], motto: 'The only thing in life achieved without effort is failure', discover: 'Узнать больше',
    storyKicker: '01 / Наша история', storyTitle: 'DOTA IS|MORE THAN A GAME',
    story: 'В 2011 году на выставке GamesCom в Кёльне состоялся первый международный турнир по Доте 2. До этого периода численность игроков не превышала 20 тысяч, после чего их количество возросло. Несмотря на то, что эта игра не воспринималась всерьёз, общими усилиями она получила международное признание. Со временем каждый научился формировать собственный взгляд на игру, что послужило причиной для серьёзных разногласий и беспрецедентной критики чужих идей. Подвергнув анализу многочисленные суждения мы заметили, что игроки основывались на личном убеждении, не принимая во внимание научные методы. На основе текущих результатов становится ясно, что отбросив осуждения, мы сможем повысить уровень взаимодействия с союзниками, что поспособствует развитию. Самосознание и готовность преодолеть эти противоречия позволит увидеть игру в новом свете и повысить навыки командной игры, от простых комбинаций до более сложных. Это толкование даёт нам возможность пересмотреть свои выводы, которые будут определять нашу коллективную способность разрешить мнимые разногласия и взглянуть на проблему в её полноценной структуре.',
    coachingKicker: '02 / Тренировки', coachingTitle: 'Ardjuna —|Тренер по Dota 2', coachingText: 'Индивидуальные занятия по Dota 2, построенные вокруг вашей игры, целей и уровня, которого вы хотите достичь.', learn: 'Подробнее',
    academyKicker: '03 / Выберите свой путь', academyTitle: 'АКАДЕМИЯ', academyLead: 'Знание превращает хаос боя в систему. Выберите свой уровень — и начните путь к следующему рангу.',
    levels: [
      { slug: 'beginner', number: '01', title: 'Новичок', tag: 'Основы игры', text: 'Разберитесь в героях, линиях, предметах и главных принципах Dota 2.', page: 'ТВОЙ ПЕРВЫЙ ШАГ', detail: 'Освойте карту, роли героев, экономику и базовые механики. Программа поможет уверенно начать играть и понимать, что происходит в каждом матче.' },
      { slug: 'experienced', number: '02', title: 'Опытный', tag: 'Управление игрой', text: 'Улучшите макроигру, принятие решений и стабильность в каждом матче.', page: 'КОНТРОЛИРУЙ ИГРУ', detail: 'Научитесь читать карту, выбирать правильные цели и превращать преимущество в победу. Разбираем ваши матчи и избавляемся от повторяющихся ошибок.' },
      { slug: 'professional', number: '03', title: 'Профессионал', tag: 'Путь к мастерству', text: 'Отточите командное взаимодействие, драфты и мышление высокого уровня.', page: 'ИГРАЙ НА ПРЕДЕЛЕ', detail: 'Углублённая подготовка: драфты, темп, коммуникация и анализ соперника. Для игроков, которые ставят перед собой самые высокие цели.' }
    ],
    aboutKicker: '04 / Познакомьтесь с Ardjuna', aboutTitle: 'О НАС', aboutText: 'Тренировки, которые превращают сложные знания об игре в простые практические решения для каждого матча.', back: '← Назад в академию',
    footerText: 'Смотрите глубже. Думайте точнее. Играйте вместе.', footerNav: 'Навигация', footerContact: 'Начните следующий матч по-новому', copyright: 'Все права защищены',
    soundOn: 'Включить звук видео', soundOff: 'Выключить звук видео', videoPause: 'Поставить видео на паузу', videoPlay: 'Продолжить видео'
  },
  en: {
    nav: ['Coaching', 'Academy', 'About'], book: 'Book a session', modalKicker: 'Ready when you are', modalTitle: 'Book a session',
    modalText: 'The booking calendar is coming soon. Contact us to choose a convenient time.', modalClose: 'Got it',
    hero: ['“Secrets”', 'of Dota'], motto: 'The only thing in life achieved without effort is failure', discover: 'Discover',
    storyKicker: '01 / Our story', storyTitle: 'DOTA IS|MORE THAN A GAME',
    story: 'In 2011, the first international Dota 2 tournament was held at GamesCom in Cologne. Before then, the number of players had not exceeded 20,000; afterward, that number began to grow. Although the game was not taken seriously at first, through a collective effort it earned international recognition. Over time, everyone learned to form their own view of the game, which led to serious disagreements and unprecedented criticism of other people’s ideas. After analyzing numerous opinions, we noticed that players relied on personal beliefs without considering scientific methods. The current results make it clear that, by setting judgment aside, we can improve the way we interact with our allies and encourage further growth. Self-awareness and a willingness to overcome these contradictions allow us to see the game in a new light and improve our teamwork, from simple combinations to more complex ones. This interpretation gives us an opportunity to reconsider the conclusions that will define our collective ability to resolve imagined disagreements and view the problem in its complete structure.',
    coachingKicker: '02 / Coaching', coachingTitle: 'Ardjuna —|Dota 2 Coaching', coachingText: 'Individual Dota 2 training sessions built around your game, your goals, and the player you want to become.', learn: 'Learn more',
    academyKicker: '03 / Choose your path', academyTitle: 'ACADEMY', academyLead: 'Knowledge turns the chaos of battle into a system. Choose your level and begin the climb to your next rank.',
    levels: [
      { slug: 'beginner', number: '01', title: 'Beginner', tag: 'Game foundations', text: 'Understand heroes, lanes, items, and the core principles of Dota 2.', page: 'YOUR FIRST STEP', detail: 'Master the map, hero roles, economy, and core mechanics. This program will help you play with confidence and understand what is happening in every match.' },
      { slug: 'experienced', number: '02', title: 'Experienced', tag: 'Control the game', text: 'Improve your macro play, decision-making, and consistency in every match.', page: 'CONTROL THE GAME', detail: 'Learn to read the map, choose the right objectives, and turn advantages into victories. We review your matches and eliminate recurring mistakes.' },
      { slug: 'professional', number: '03', title: 'Professional', tag: 'Path to mastery', text: 'Refine teamwork, drafting, and high-level competitive thinking.', page: 'PLAY AT YOUR LIMIT', detail: 'Advanced preparation: drafting, tempo, communication, and opponent analysis. For players pursuing the highest goals.' }
    ],
    aboutKicker: '04 / Meet Ardjuna', aboutTitle: 'ABOUT', aboutText: 'Coaching that turns complex game knowledge into simple, practical decisions you can use in every match.', back: '← Back to academy',
    footerText: 'See deeper. Think clearer. Play together.', footerNav: 'Navigation', footerContact: 'Approach your next match differently', copyright: 'All rights reserved',
    soundOn: 'Turn video sound on', soundOff: 'Turn video sound off', videoPause: 'Pause background video', videoPlay: 'Resume background video'
  }
}

type Text = typeof copy.ru

function BookingModal({ close, t }: { close: () => void; t: Text }) {
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close(); document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey) }, [close])
  return <div className={styles.modalBackdrop} onMouseDown={close} role="presentation"><section className={styles.modal} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className={styles.close} onClick={close} aria-label="Close">×</button><span className={styles.eyebrow}>{t.modalKicker}</span><h2 id="booking-title">{t.modalTitle}</h2><p>{t.modalText}</p><button className={styles.primary} onClick={close}>{t.modalClose}</button></section></div>
}

function Header({ book, language, setLanguage, t }: { book: () => void; language: Language; setLanguage: (language: Language) => void; t: Text }) {
  const [open, setOpen] = useState(false); const location = useLocation()
  useEffect(() => setOpen(false), [location])
  const nav = [[t.nav[0], '/coaching'], [t.nav[1], '/academy'], [t.nav[2], '/about']]
  return <header className={styles.header}><Link className={styles.logo} to="/" aria-label="Ardjuna home"><img src={`${import.meta.env.BASE_URL}assets/images/icon.png`} alt="" /><span>ARDJUNA</span></Link><button className={styles.menuToggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><i /><i /></button><nav className={open ? styles.navOpen : ''} aria-label="Main navigation">{nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}<button className={styles.navButton} onClick={book}>{t.book} <span>↗</span></button><div className={styles.language} aria-label="Language"><button className={language === 'ru' ? styles.languageActive : ''} onClick={() => setLanguage('ru')}>RU</button><i /><button className={language === 'en' ? styles.languageActive : ''} onClick={() => setLanguage('en')}>EN</button></div></nav></header>
}

function Home({ t }: { t: Text }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const toggleSound = () => { if (!videoRef.current) return; videoRef.current.muted = !muted; setMuted(!muted) }
  const togglePlayback = () => { if (!videoRef.current) return; if (videoRef.current.paused) void videoRef.current.play(); else videoRef.current.pause() }
  const storyTitle = t.storyTitle.split('|')
  return <main><section className={styles.hero}><video ref={videoRef} className={styles.heroVideo} autoPlay muted loop playsInline onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Dota 2 cinematic background"><source src={`${import.meta.env.BASE_URL}assets/videos/dota-web-25.mp4`} type="video/mp4" /></video><div className={styles.heroContent}><div className={`${styles.heroTitle} ${playing ? styles.heroTitlePlaying : ''}`}><h1>{t.hero[0]} <span>{t.hero[1]}</span></h1><p>{t.motto}</p></div></div><div className={styles.mediaControls}><button className={`${styles.mediaToggle} ${styles.playbackToggle}`} type="button" onClick={togglePlayback} aria-label={playing ? t.videoPause : t.videoPlay} aria-pressed={!playing}><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13.5" /><path className={styles.playGlyph} d="M13 10.8 22 16l-9 5.2Z" /><g className={styles.pauseGlyph}><path d="M12.5 10.5v11" /><path d="M19.5 10.5v11" /></g></svg></button><button className={`${styles.mediaToggle} ${styles.soundToggle} ${muted ? styles.isMuted : ''}`} type="button" onClick={toggleSound} aria-label={muted ? t.soundOn : t.soundOff} aria-pressed={!muted}><svg viewBox="0 0 32 32" aria-hidden="true"><path className={styles.speakerGlyph} d="M6.5 13h4l5.5-4.5v15L10.5 19h-4Z" /><path className={styles.waveGlyph} d="M20 12.2c1.2 1 1.8 2.2 1.8 3.8S21.2 18.8 20 19.8M23 9.5c2 1.8 3 3.9 3 6.5s-1 4.7-3 6.5" /><path className={styles.muteSlash} d="M7.5 7.5l17 17" /><path className={styles.muteSlashAlt} d="M24.5 7.5l-17 17" /></svg></button></div></section><section className={styles.story} id="story"><span className={styles.eyebrow}>{t.storyKicker}</span><div className={styles.storyGrid}><h2><span>{storyTitle[0]}</span><br /><em>{storyTitle[1]}</em></h2><p>{t.story}</p></div></section></main>
}

function Coaching({ book, t }: { book: () => void; t: Text }) { const title = t.coachingTitle.split('|'); return <main><section className={styles.coaching}><div className={styles.collage} aria-hidden="true"><span /><span /><span /><span /><span /></div><div className={styles.coachingContent}><span className={styles.eyebrow}>{t.coachingKicker}</span><h2>{title[0]}<br /><em>{title[1]}</em></h2><p>{t.coachingText}</p><div className={styles.actions}><button className={styles.primary} onClick={book}>{t.book}</button><Link className={styles.secondary} to="/academy">{t.learn} <span>→</span></Link></div></div></section></main> }

function Academy({ t }: { t: Text }) {
  const navigate = useNavigate()
  const openLevel = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const changePage = () => navigate(`/academy/${slug}`)
    const transition = (document as Document & { startViewTransition?: (callback: () => void) => void }).startViewTransition
    if (transition) transition.call(document, changePage)
    else changePage()
  }
  return <main className={styles.academy}><div className={styles.academyIntro}><span className={styles.eyebrow}>{t.academyKicker}</span><h1>{t.academyTitle}</h1><p>{t.academyLead}</p></div><div className={styles.levelGrid}>{t.levels.map((level) => <Link className={styles.levelCard} to={`/academy/${level.slug}`} onClick={(event) => openLevel(event, level.slug)} key={level.slug}><span className={styles.levelNumber}>{level.number}</span><div className={styles.rune} aria-hidden="true"><i /></div><span className={styles.levelTag}>{level.tag}</span><h2>{level.title}</h2><p>{level.text}</p><span className={styles.cardArrow}>→</span></Link>)}</div></main>
}

function AcademyScene({ index }: { index: number }) {
  return <div className={`${styles.academyScene} ${styles[`scene${index}`]}`} aria-hidden="true">
    <span className={styles.sceneCaption}>{['HEROES / LANES / ITEMS', 'VISION / TEMPO / OBJECTIVES', 'DRAFT / TEAMPLAY / MASTERY'][index]}</span>
  </div>
}

function LevelPage({ index, t }: { index: number; t: Text }) {
  const level = t.levels[index]
  return <main className={`${styles.levelPage} ${styles[`levelTheme${index}`]}`}><AcademyScene index={index} /><div className={styles.levelContent}><span className={styles.eyebrow}>{t.academyTitle} / {level.number}</span><span className={styles.levelTag}>{level.tag}</span><h1>{level.page}</h1><p>{level.detail}</p><Link className={styles.secondary} to="/academy">{t.back}</Link></div><span className={styles.verticalLabel}>ARDJUNA · DOTA ACADEMY · {level.number}</span></main>
}

function About({ t, book }: { t: Text; book: () => void }) { return <main><section className={`${styles.coaching} ${styles.about}`}><div className={styles.collage} aria-hidden="true"><span /><span /><span /><span /><span /></div><div className={styles.coachingContent}><span className={styles.eyebrow}>{t.aboutKicker}</span><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className={styles.actions}><button className={styles.primary} onClick={book}>{t.book}</button><Link className={styles.secondary} to="/academy">{t.learn} <span>→</span></Link></div></div></section></main> }

function Footer({ t, book }: { t: Text; book: () => void }) {
  return <footer className={styles.footer}><div className={styles.footerLead}><Link className={styles.footerBrand} to="/"><img src={`${import.meta.env.BASE_URL}assets/images/icon.png`} alt="" /><span>ARDJUNA</span></Link><p>{t.footerText}</p></div><div className={styles.footerLinks}><span>{t.footerNav}</span><Link to="/coaching">{t.nav[0]}</Link><Link to="/academy">{t.nav[1]}</Link><Link to="/about">{t.nav[2]}</Link></div><div className={styles.footerCta}><span>{t.footerContact}</span><button onClick={book}>{t.book}<i>↗</i></button></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} ARDJUNA. {t.copyright}.</span><span>DOTA 2 COACHING / ACADEMY</span></div></footer>
}

export default function App() {
  const [booking, setBooking] = useState(false)
  const [language, setLanguageState] = useState<Language>(() => localStorage.getItem('ardjuna-language') === 'en' ? 'en' : 'ru')
  const setLanguage = (next: Language) => { setLanguageState(next); localStorage.setItem('ardjuna-language', next) }
  useEffect(() => { document.documentElement.lang = language }, [language])
  const t = copy[language]; const book = () => setBooking(true)
  return <><Header book={book} language={language} setLanguage={setLanguage} t={t} /><Routes><Route path="/" element={<Home t={t} />} /><Route path="/coaching" element={<Coaching book={book} t={t} />} /><Route path="/academy" element={<Academy t={t} />} />{t.levels.map((level, index) => <Route key={level.slug} path={`/academy/${level.slug}`} element={<LevelPage index={index} t={t} />} />)}<Route path="/about" element={<About t={t} book={book} />} /></Routes><Footer t={t} book={book} />{booking && <BookingModal close={() => setBooking(false)} t={t} />}</>
}
