import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import styles from './PhotoCard.module.css';

export default function PhotoCard({ photo, index = 0, onClick }) {
  return (
    <motion.button
      type="button"
      className={styles.card}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
    >
      <img src={photo.image} alt={photo.altText} loading="lazy" className={styles.img} />
      <div className={styles.overlay}>
        <Expand size={20} />
        <span className={styles.title}>{photo.title}</span>
      </div>
    </motion.button>
  );
}
