import { Mountain } from 'lucide-react';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon: Icon = Mountain, title = 'Nothing here yet', message, action }) {
  return (
    <div className={styles.wrap}>
      <Icon size={40} className={styles.icon} aria-hidden="true" />
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
