import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Lightbox.module.css';

/**
 * Full-screen image viewer with prev/next navigation and keyboard support.
 * `images` is the currently-filtered list; `index` is the open item's
 * position in it, or null when closed.
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const isOpen = index !== null && index !== undefined;
  const image = isOpen ? images[index] : null;

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && (
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

          <button
            type="button"
            className={`${styles.nav} ${styles.navPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <motion.div
            key={image._id}
            className={styles.figureWrap}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={image.image} alt={image.altText} className={styles.image} />
            <div className={styles.caption}>
              <h3>{image.title}</h3>
              {image.location && <p>{image.location}</p>}
            </div>
          </motion.div>

          <button
            type="button"
            className={`${styles.nav} ${styles.navNext}`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
