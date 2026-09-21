import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './ItineraryTimeline.module.css';

export default function ItineraryTimeline({ itinerary }) {
  const [openDay, setOpenDay] = useState(itinerary?.[0]?.day ?? null);

  if (!itinerary?.length) return null;

  return (
    <ol className={styles.timeline}>
      {itinerary.map((item) => {
        const isOpen = openDay === item.day;
        return (
          <li key={item.day} className={styles.item}>
            <button
              type="button"
              className={styles.header}
              onClick={() => setOpenDay(isOpen ? null : item.day)}
              aria-expanded={isOpen}
            >
              <span className={styles.dayBadge}>Day {item.day}</span>
              <span className={styles.dayTitle}>{item.title}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className={styles.chevron}>
                <ChevronDown size={18} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.bodyWrap}
                >
                  <p className={styles.body}>{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
