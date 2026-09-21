import styles from './Input.module.css';

export function Input({ className = '', ...rest }) {
  return <input className={`${styles.input} ${className}`} {...rest} />;
}

export function Textarea({ className = '', ...rest }) {
  return <textarea className={`${styles.input} ${className}`} {...rest} />;
}

export function Select({ className = '', children, ...rest }) {
  return (
    <select className={`${styles.input} ${className}`} {...rest}>
      {children}
    </select>
  );
}

export function Checkbox({ label, checked, onChange, ...rest }) {
  return (
    <label className={styles.checkboxRow}>
      <input type="checkbox" className={styles.checkbox} checked={checked} onChange={onChange} {...rest} />
      {label}
    </label>
  );
}
