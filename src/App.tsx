import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import styles from './App.module.scss'

const nav = [['Coaching', '/coaching'], ['Academy', '/academy'], ['About', '/about']]

function BookingModal({ close }: { close: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close])

  return <div className={styles.modalBackdrop} onMouseDown={close} role="presentation">
    <section className={styles.modal} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button className={styles.close} onClick={close} aria-label="Close booking window">×</button>
      <span className={styles.eyebrow}>Ready when you are</span>
      <h2 id="booking-title">Book a session</h2>
      <p>The booking calendar is coming soon. Leave this window as a placeholder for your scheduling service.</p>
      <button className={styles.primary} onClick={close}>Got it</button>
    </section>
  </div>
}

function Header({ book }: { book: () => void }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location])
  return <header className={styles.header}>
    <Link className={styles.logo} to="/" aria-label="Ardjuna home"><span>A</span>RDJUNA</Link>
    <button className={styles.menuToggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><i /><i /></button>
    <nav className={open ? styles.navOpen : ''} aria-label="Main navigation">
      {nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
      <button className={styles.navButton} onClick={book}>Book a session <span>↗</span></button>
    </nav>
  </header>
}

function Home({ book }: { book: () => void }) {
  return <main>
    <section className={styles.hero}>
      <div className={styles.heroStrips} aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className={styles.heroContent}>
        <img src={`${import.meta.env.BASE_URL}assets/images/secrets-logo.svg`} alt="Secrets of Dota" />
        <div className={styles.heroTitle}>
          <h1><span>«SECRETS»</span><small>OF</small><span>DOTA</span></h1>
          <p>The only thing in life achieved without effort is failure</p>
        </div>
      </div>
    </section>

    <section className={styles.film}>
      <div className={styles.sectionNumber}>01 / STORY</div>
      <div className={styles.videoPlaceholder} aria-label="Video placeholder">
        <button aria-label="Play video"><span>▶</span></button>
        <p>VIDEO COMING SOON</p>
      </div>
      <div className={styles.statement}>
        <p>Victory is never accidental.</p>
        <h2>EVERY MOVE HAS<br /><em>A REASON.</em></h2>
        <p className={styles.copy}>Learn to read the map, understand the tempo, and make decisions with confidence. The difference between playing and improving starts here.</p>
      </div>
    </section>

    <section className={styles.coaching}>
      <div className={styles.collage} aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <div className={styles.coachingContent}>
        <span className={styles.eyebrow}>02 / Coaching</span>
        <h2>Ardjuna —<br /><em>Dota 2 Coaching</em></h2>
        <p>Individual Dota 2 training sessions built around your game, your goals, and the player you want to become.</p>
        <div className={styles.actions}><button className={styles.primary} onClick={book}>Book a session</button><Link className={styles.secondary} to="/coaching">Learn more <span>→</span></Link></div>
      </div>
    </section>
  </main>
}

function InnerPage({ title, kicker, children, book }: { title: string; kicker: string; children: React.ReactNode; book: () => void }) {
  return <main className={styles.inner}><span className={styles.eyebrow}>{kicker}</span><h1>{title}</h1><div className={styles.rule} /><p>{children}</p><button className={styles.primary} onClick={book}>Book a session</button><Link to="/">← Back home</Link></main>
}

export default function App() {
  const [booking, setBooking] = useState(false)
  const book = () => setBooking(true)
  return <><Header book={book} /><Routes>
    <Route path="/" element={<Home book={book} />} />
    <Route path="/coaching" element={<InnerPage title="COACHING" kicker="Individual growth" book={book}>Personal replay analysis, live sessions, and a clear practice plan tailored to the way you play.</InnerPage>} />
    <Route path="/academy" element={<InnerPage title="ACADEMY" kicker="Build your game" book={book}>A structured place to master Dota fundamentals, decision-making, and high-level game sense.</InnerPage>} />
    <Route path="/about" element={<InnerPage title="ABOUT" kicker="Meet Ardjuna" book={book}>Coaching that turns complex game knowledge into simple, practical decisions you can use in every match.</InnerPage>} />
  </Routes>{booking && <BookingModal close={() => setBooking(false)} />}</>
}
