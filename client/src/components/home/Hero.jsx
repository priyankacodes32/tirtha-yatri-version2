import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../common/Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import styles from './Hero.module.css';

// Fallback content, used until settings load (or if the request fails) so
// the hero never renders empty — this is also what the admin's Site
// Settings > Hero fields are seeded with, so there's normally no flash.
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1623356788377-3313cc497e4b?fm=jpg&q=80&w=2200&auto=format&fit=crop';
const FALLBACK = {
  image: FALLBACK_IMAGE,
  eyebrow: "Discover Nepal's Sacred Himalayas",
  heading: 'Journey to Muktinath.\nDiscover the Soul of Mustang.',
  subheading:
    "A pilgrimage through 108 sacred water spouts, a passage through ancient walled kingdoms, and a Himalayan landscape unlike anywhere else on earth — planned by people who know this valley well.",
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const { settings } = useTheme();

  const hero = { ...FALLBACK, ...settings?.hero };
  const headingLines = hero.heading.split('\n');

  return (
    <section className={styles.hero} ref={ref}>
      <motion.div className={styles.bg} style={{ y }}>
        <img src={hero.image || FALLBACK_IMAGE} alt="Muktinath temple shrine with prayer flags and the Himalayan mountains behind it" />
      </motion.div>
      <div className={styles.gradient} />

      <div className={`container ${styles.content}`}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {headingLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {hero.subheading}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <Button to="/packages" size="lg">Explore Tour Packages</Button>
          <Button to="/customize-trip" variant="secondary" size="lg">Plan a Custom Journey</Button>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
