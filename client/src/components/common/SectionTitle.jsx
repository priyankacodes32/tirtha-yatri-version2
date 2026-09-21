import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', dark = false }) {
  return (
    <motion.div
      className={`${styles.wrap} ${align === 'left' ? styles.left : ''} ${dark ? styles.dark : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
}
