import { Link } from 'react-router-dom';
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const { settings } = useTheme();
  const siteName = settings?.siteName || 'Tirtha Yatri';
  const contact = settings?.contact || {};
  const social = settings?.social || {};

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.brand}>
            <Mountain size={22} aria-hidden="true" />
            <span>{siteName}</span>
          </Link>
          <p className={styles.tagline}>
            A digital gateway to Muktinath and Mustang — pilgrimage, culture and the Himalayas, planned with care.
          </p>
          {(social.facebook || social.instagram || social.youtube) && (
            <div className={styles.social}>
              {social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>}
              {social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>}
              {social.youtube && <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>}
            </div>
          )}
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Explore</h3>
          <Link to="/explore-mustang">Places to Visit</Link>
          <Link to="/packages">Tour Packages</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/customize-trip">Customize Your Trip</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Popular Packages</h3>
          <Link to="/packages?category=jeep">Jeep Tours</Link>
          <Link to="/packages?category=flight">Flight Tours</Link>
          <Link to="/packages?category=helicopter">Helicopter Tours</Link>
          <Link to="/packages?category=pilgrimage">Pilgrimage Tours</Link>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Get in Touch</h3>
          {contact.email && (
            <a href={`mailto:${contact.email}`} className={styles.contactRow}>
              <Mail size={16} /> {contact.email}
            </a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className={styles.contactRow}>
              <Phone size={16} /> {contact.phone}
            </a>
          )}
          {contact.address && (
            <span className={styles.contactRow}>
              <MapPin size={16} /> {contact.address}
            </span>
          )}
        </div>
      </div>

      <div className={`container ${styles.bottomBar}`}>
        <p>© {year} {siteName}. All rights reserved.</p>
        <p className={styles.disclaimer}>Built as an independent travel platform — not affiliated with any other Muktinath tour operator.</p>
      </div>
    </footer>
  );
}
