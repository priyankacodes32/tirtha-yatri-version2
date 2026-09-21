import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mountain } from 'lucide-react';
import { humanizeSlug } from '../../utils/format.js';
import styles from './DestinationCard.module.css';

export default function DestinationCard({ destination, index = 0, size = 'md' }) {
  return (
    <motion.article
      className={`${styles.card} ${styles[size] || ''}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.35), ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/destinations/${destination.slug}`} className={styles.link}>
        <img src={destination.coverImage} alt={destination.name} loading="lazy" className={styles.img} />
        <div className={styles.overlay} />

        <span className={styles.category}>{humanizeSlug(destination.category)}</span>

        <div className={styles.content}>
          {destination.altitude && (
            <span className={styles.altitude}>
              <Mountain size={13} /> {destination.altitude}
            </span>
          )}
          <h3 className={styles.name}>{destination.name}</h3>
          <p className={styles.desc}>{destination.shortDescription}</p>
          <span className={styles.explore}>
            Explore Destination <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
