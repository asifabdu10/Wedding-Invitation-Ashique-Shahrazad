import { useState, useCallback } from 'react'
import Countdown from './Countdown'
import CardPetalShower from './CardPetalShower'
import styles from './InvitationCard.module.css'

/* ── SVG Icons ── */
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 18H5V8h14v13zM7 10h5v5H7z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

/* ── Interactive Heart Component ── */
function InteractiveHeart() {
  const [hearts, setHearts] = useState([])
  const spawnHeart = useCallback(() => {
    const id = Date.now() + Math.random()
    const x = (Math.random() - 0.5) * 120
    const rotation = (Math.random() - 0.5) * 60
    setHearts(prev => [...prev, { id, x, rotation }])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id))
    }, 1000)
  }, [])

  return (
    <div className={styles.heartWrapper} onMouseEnter={spawnHeart} onClick={(e) => { e.preventDefault(); spawnHeart(); }}>
      <span className={styles.heart} aria-hidden="true">💕</span>
      {hearts.map(h => (
        <span key={h.id} className={styles.popHeart} style={{ '--x': `${h.x}px`, '--r': `${h.rotation}deg` }}>💕</span>
      ))}
    </div>
  )
}

export default function InvitationCard() {
  return (
    <article className={styles.card} aria-label="Wedding Invitation">
      <CardPetalShower />

      <div className={styles.pageContent}>
        <div className={styles.initials}>A &amp; S</div>
        <p className={styles.bismillah}>In the name of Allah, the Most Gracious, the Most Merciful</p>
        <br />
        <p className={styles.parentsName}>Abdul Navaz & Vaheeda I</p>
        <p className={styles.address}>Parathara, Vandanam P.O, Alappuzha <br />Ph: 9496332144</p>
        <p className={styles.inviteText}>
          With immense joy and gratitude to Almighty, we cordially invite you and your family to the wedding ceremony of our beloved son
        </p>
        <div className={styles.divider}>✦</div>
        <h1 className={styles.name}>Ashique Abdulla P A</h1>
        <p className={styles.relation}>(G/S of Late Abdulla Kunju P A & Late P K Jameela Beevi (Parathara, Vandanam) AND Ibrahim Kunju I & Subaidha Beegum (Vadavadichira, Kakkazham))</p>
        <InteractiveHeart />
        <h2 className={styles.name}>Shahrazad Wahab</h2>
        <div className={styles.relationGroup}>
          <p className={styles.relation}>D/O Abdul Wahab & Haseena Wahab </p>
          <p className={styles.address}>Bismi Manzil, Vandanam P.O, Alappuzha </p>
          <p className={styles.relation}>(G/D Late Ahmed Moulavy & Late Khadeeja AND Late Osman & Nabeesa Beevi )</p>
        </div>
        <div className={styles.divider}>✦</div>
        <h2 className={styles.weddingTitle}>Wedding</h2>

        <div className={styles.dateRow}>
          <div className={styles.dateCell}>
            <span className={styles.cellTop}>August, 2026</span>
            <span className={`${styles.cellValue} ${styles.cellBig}`}>Sunday</span>
          </div>
          <div className={`${styles.dateCell} ${styles.narrowCell}`}>
            <span className={`${styles.cellValue} ${styles.cellHighlight}`}>02</span>
          </div>
          <div className={styles.dateCell}>
            <span className={`${styles.cellValue} ${styles.cellBig}`}>12 <span className={styles.cellSmall}>PM</span></span>
          </div>
        </div>

        <p className={styles.venueName}>Contour Resorts and Convention Centre</p>
        <p className={styles.venueLocation}><PinIcon /> Changanassery</p>

        <p className={`${styles.label} ${styles.countdownLabel}`}>Wedding Countdown</p>
        <Countdown />

        <div className={styles.btnRow}>
          <button className={styles.btn} onClick={() => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Ashique+Shahrazad&dates=20260802T120000/20260802T160000', '_blank')}>
            <CalendarIcon /> Add to Calendar
          </button>
          <a className={styles.btn} href="https://www.google.com/maps?q=Contour+Backwaters+Hotel+Resort+%26+Convention+Centre,+Alappuzha+-+Changanassery+Hwy,+Changanassery,+Kerala+686101&ftid=0x3b0626697048dfaf:0x62b48e73958ef7f7" target="_blank" rel="noopener noreferrer">
            <PinIcon /> Get Directions
          </a>
        </div>



        <div className={styles.divider}>✦</div>
        <p className={styles.footer}>
          With love ❤️,
          <br />
          Navaz &amp; Vaheeda
        </p>
      </div>
    </article>
  )
}
