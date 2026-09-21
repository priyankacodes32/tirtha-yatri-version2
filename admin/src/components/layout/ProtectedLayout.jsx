import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../common/Loader.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import styles from './ProtectedLayout.module.css';

export default function ProtectedLayout() {
  const { user, loading, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return <Loader label="Checking session…" fullHeight />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebarWrap} ${menuOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar onNavigate={() => setMenuOpen(false)} />
      </aside>
      {menuOpen && <div className={styles.scrim} onClick={() => setMenuOpen(false)} />}
      <div className={styles.main}>
        <Topbar onMenuClick={() => setMenuOpen((v) => !v)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
