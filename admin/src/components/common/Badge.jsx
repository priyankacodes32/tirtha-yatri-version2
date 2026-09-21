import styles from './Badge.module.css';

// `label` overrides the default "Active"/"Inactive" text (e.g. "Published"/
// "Draft") while keeping the same active/inactive color treatment.
export default function Badge({ active, label }) {
  return <span className={`${styles.badge} ${active ? styles.active : styles.inactive}`}>{label || (active ? 'Active' : 'Inactive')}</span>;
}
