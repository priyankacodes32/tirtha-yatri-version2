import { motion } from 'framer-motion';
import { Play, Video as VideoIcon } from 'lucide-react';
import styles from './VideoCard.module.css';

export default function VideoCard({ video, index = 0, onClick }) {
  return (
    <motion.button
      type="button"
      className={styles.card}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <div className={styles.thumbWrap}>
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} loading="lazy" className={styles.thumb} />
        ) : (
          <div className={styles.thumbFallback}>
            <VideoIcon size={32} />
          </div>
        )}
        <span className={styles.playBtn}>
          <Play size={22} fill="currentColor" />
        </span>
      </div>
      <div className={styles.info}>
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
      </div>
    </motion.button>
  );
}
