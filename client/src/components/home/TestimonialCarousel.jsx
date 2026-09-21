import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionTitle from '../common/SectionTitle.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getReviews } from '../../api/reviewApi.js';
import styles from './TestimonialCarousel.module.css';

export default function TestimonialCarousel() {
  const { data, loading, error } = useFetch(() => getReviews({ featured: 'true' }), []);
  const reviews = data?.data || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reviews.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, [reviews.length]);

  const go = (dir) => setIndex((i) => (i + dir + reviews.length) % reviews.length);

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          eyebrow="Traveller Stories"
          title="Stories From Fellow Travellers"
          subtitle="Demo reviews shown for now — real traveller stories will replace these before launch."
          dark
        />
      </div>

      <div className={`container ${styles.wrap}`}>
        {loading && <Loader label="Loading stories…" />}
        {error && <EmptyState title="Couldn't load reviews" message={error} />}
        {!loading && !error && reviews.length === 0 && (
          <EmptyState title="No reviews yet" message="Check back soon for traveller stories." />
        )}

        {!loading && !error && reviews.length > 0 && (
          <div className={styles.carousel}>
            <button type="button" className={styles.navBtn} onClick={() => go(-1)} aria-label="Previous story">
              <ChevronLeft size={20} />
            </button>

            <div className={styles.slideWrap}>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={reviews[index]._id}
                  className={styles.slide}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Quote className={styles.quoteIcon} size={30} aria-hidden="true" />
                  <div className={styles.stars} aria-label={`${reviews[index].rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < reviews[index].rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <p className={styles.text}>{reviews[index].reviewText}</p>
                  <footer className={styles.author}>
                    <img src={reviews[index].avatar} alt="" className={styles.avatar} />
                    <div>
                      <cite className={styles.name}>{reviews[index].name}</cite>
                      <div className={styles.meta}>
                        {reviews[index].location} · {reviews[index].tour}
                      </div>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <button type="button" className={styles.navBtn} onClick={() => go(1)} aria-label="Next story">
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {reviews.length > 1 && (
          <div className={styles.dots}>
            {reviews.map((r, i) => (
              <button
                key={r._id}
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to story ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
