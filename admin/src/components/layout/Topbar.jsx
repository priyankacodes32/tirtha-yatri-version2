import { LogOut, Menu, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Topbar.module.css';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className={styles.bar}>
      <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Toggle menu">
        <Menu size={22} />
      </button>

      <a className={styles.siteLink} href="http://localhost:5173" target="_blank" rel="noreferrer">
        <ExternalLink size={14} />
        View site
      </a>

      <div className={styles.spacer} />

      <div className={styles.user}>
        <div className={styles.avatar}>{(user?.name || 'A').charAt(0).toUpperCase()}</div>
        <div className={styles.userInfo}>
          <span className={styles.name}>{user?.name}</span>
          <span className={styles.email}>{user?.email}</span>
        </div>
        <button className={styles.logoutBtn} onClick={logout} title="Logout" aria-label="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
