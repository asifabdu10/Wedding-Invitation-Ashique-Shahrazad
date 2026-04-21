import styles from './DarkToggle.module.css'

export default function DarkToggle({ dark, onToggle }) {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
