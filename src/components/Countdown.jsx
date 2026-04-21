import { useCountdown } from '../hooks/useCountdown'
import styles from './Countdown.module.css'

const WEDDING_DATE = '2026-08-02T12:00:00'

function Box({ value, unit, digits = 2 }) {
  const display = String(value).padStart(digits, '0')
  return (
    <div className={styles.box}>
      <span className={styles.value}>{display}</span>
      <span className={styles.unit}>{unit}</span>
    </div>
  )
}

export default function Countdown() {
  const { days, hours, mins, secs, expired } = useCountdown(WEDDING_DATE)

  if (expired) {
    return (
      <div className={styles.countdownCard}>
        <p className={styles.expired} aria-live="polite">
          🎉 The wedding is today!
        </p>
      </div>
    )
  }

  return (
    <div className={styles.countdownCard}>
      <div className={styles.row} aria-label="Wedding countdown timer" role="timer">
        <Box value={days}  unit="Days"  digits={3} />
        <Box value={hours} unit="Hours" />
        <Box value={mins}  unit="Mins"  />
        <Box value={secs}  unit="Secs"  />
      </div>
    </div>
  )
}
