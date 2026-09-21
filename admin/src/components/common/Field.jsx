import styles from './Field.module.css';

/**
 * Labeled form field wrapper — wraps an <input>/<textarea>/<select>/custom
 * control passed as children, with a consistent label + hint + error layout.
 */
export default function Field({ label, hint, error, required, children, className = '' }) {
  return (
    <label className={`${styles.field} ${className}`}>
      {label && (
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
