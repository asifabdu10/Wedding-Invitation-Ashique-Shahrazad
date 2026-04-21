import { useState } from 'react'
import styles from './RSVP.module.css'

export default function RSVP() {
  const [status, setStatus] = useState('idle') // idle | accepted | declined

  const handleYes = () => setStatus('accepted')
  const handleNo = () => setStatus('declined')

  if (status === 'accepted') {
    return (
      <div className={`${styles.feedback} ${styles.success}`}>
        <p>Wonderful! We can&apos;t wait to see you there! 🥳🥂</p>
        <button onClick={() => setStatus('idle')} className={styles.undo}>Change response</button>
      </div>
    )
  }

  if (status === 'declined') {
    return (
      <div className={`${styles.feedback} ${styles.error}`}>
        <p>Sadly, I can’t 🥀. You&apos;ll be missed!</p>
        <button onClick={() => setStatus('idle')} className={styles.undo}>Change response</button>
      </div>
    )
  }

  return (
    <section className={styles.section}>
      <p className={styles.label}>Will you attend?</p>
      <div className={styles.row}>
        <button className={`${styles.btn} ${styles.yes}`} onClick={handleYes}>
          Yes, I&apos;d love to!! 😁
        </button>
        <button className={`${styles.btn} ${styles.no}`} onClick={handleNo}>
          Sadly, I can’t 😔
        </button>
      </div>
    </section>
  )
}
