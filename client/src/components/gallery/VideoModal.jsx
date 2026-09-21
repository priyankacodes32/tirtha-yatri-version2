import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './VideoModal.module.css';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return undefined;
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>

          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={video._id}
              src={video.videoUrl}
              poster={video.thumbnail || undefined}
              controls
              autoPlay
              className={styles.video}
            >
              Your browser doesn't support embedded video.
            </video>
            <div className={styles.caption}>
              <h3>{video.title}</h3>
              {video.description && <p>{video.description}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
