import styles from './Loader.module.css';

export default function Loader({ label = 'Loading…', fullHeight = false }) {
  return (
    <div className={`${styles.wrap} ${fullHeight ? styles.fullHeight : ''}`} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
