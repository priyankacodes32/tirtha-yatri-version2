import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Sparkles,
  FolderTree,
  Package,
  MapPin,
  Image,
  Video,
  Mail,
  BookOpen,
  Star,
  CalendarCheck,
  Users,
  Mountain,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/settings', label: 'Site Settings', icon: Settings },
  { to: '/features', label: 'Features', icon: Sparkles },
  { to: '/categories', label: 'Categories', icon: FolderTree },
  { to: '/packages', label: 'Packages', icon: Package },
  { to: '/destinations', label: 'Destinations', icon: MapPin },
  { to: '/enquiries', label: 'Enquiries', icon: Mail },
  { to: '/gallery', label: 'Gallery', icon: Image },
  { to: '/videos', label: 'Videos', icon: Video },
  { to: '/blogs', label: 'Blog', icon: BookOpen },
];

const comingSoon = [
  { label: 'Reviews', icon: Star },
  { label: 'Bookings', icon: CalendarCheck },
  { label: 'Users', icon: Users },
];

export default function Sidebar({ onNavigate }) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.brand}>
        <Mountain size={22} className={styles.brandIcon} aria-hidden="true" />
        <span>
          Tirtha Yatri
          <small>Admin</small>
        </span>
      </div>

      <ul className={styles.list}>
        {links.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.divider} />
      <p className={styles.sectionLabel}>Coming soon</p>
      <ul className={styles.list}>
        {comingSoon.map(({ label, icon: Icon }) => (
          <li key={label}>
            <span className={`${styles.link} ${styles.disabled}`} aria-disabled="true">
              <Icon size={18} aria-hidden="true" />
              {label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
