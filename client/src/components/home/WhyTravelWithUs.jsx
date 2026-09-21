import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getFeatures } from '../../api/featureApi.js';
import { getIcon } from '../../utils/iconMap.js';
import styles from './WhyTravelWithUs.module.css';

export default function WhyTravelWithUs() {
  const { data, loading, error } = useFetch(getFeatures, []);
  const features = data?.data || [];

  return (
    <section className={`container ${styles.section}`}>
      <SectionTitle
        eyebrow="Why Travel With Us"
        title="Built Around the Journey, Not Just the Booking"
        subtitle="What makes planning a Muktinath trip with us different."
      />

      {loading && <Loader label="Loading…" />}
      {error && <EmptyState title="Couldn't load this section" message={error} />}

      {!loading && !error && features.length > 0 && (
        <div className={styles.grid}>
          {features.map((feature, i) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.div
                key={feature._id}
                className={`${styles.card} ${i % 2 === 1 ? styles.offset : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
              >
                <span className={styles.iconWrap}>
                  <Icon size={26} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
