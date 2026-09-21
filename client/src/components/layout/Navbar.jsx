import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Mountain } from 'lucide-react';
import Button from '../common/Button.jsx';
import { useEnquiryModal } from '../../context/EnquiryModalContext.jsx';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/explore-mustang', label: 'Explore Mustang' },
  { to: '/packages', label: 'Tour Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { openEnquiry } = useEnquiryModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route changes reset scroll to the top (see ScrollToTop), so the navbar's
  // transparent-over-hero state should reset too, not carry over from the
  // scroll position on the previous page.
  useEffect(() => {
    setMobileOpen(false);
    setScrolled(window.scrollY > 40);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const transparent = !scrolled && !mobileOpen;

  return (
    <header className={`${styles.navbar} ${transparent ? styles.transparent : styles.solid}`}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
          <Mountain size={22} aria-hidden="true" />
          <span>Tirtha Yatri</span>
        </NavLink>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button to="/customize-trip" size="sm">
            Plan My Trip
          </Button>
        </div>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobilePanel}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile primary">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <Button
              to="/customize-trip"
              size="md"
              className={styles.mobileCta}
            >
              Plan My Trip
            </Button>
            <button
              type="button"
              className={styles.mobileEnquireLink}
              onClick={() => {
                setMobileOpen(false);
                openEnquiry();
              }}
            >
              Or send a quick enquiry →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
