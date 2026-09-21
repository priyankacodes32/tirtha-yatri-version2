import { motion } from 'framer-motion';
import Button from '../common/Button.jsx';
import styles from './CtaBand.module.css';

const IMAGE = 'https://images.unsplash.com/photo-1753952969735-9be9feb9a217?fm=jpg&q=75&w=1800&auto=format&fit=crop';

export default function CtaBand() {
  return (
    <section className={styles.band}>
      <img src={IMAGE} alt="" className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} />
      <motion.div
        className={`container ${styles.content}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>This is the beginning of a journey into the Himalayas.</h2>
        <p>Tell us your dates, and we'll take care of the mountains, the roads and the rituals in between.</p>
        <div className={styles.actions}>
          <Button to="/customize-trip" size="lg">Plan a Custom Journey</Button>
          <Button to="/contact" variant="secondary" size="lg">Talk to a Travel Expert</Button>
        </div>
      </motion.div>
    </section>
  );
}
