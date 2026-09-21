import PageTransition from '../../components/layout/PageTransition.jsx';
import CustomTripForm from '../../components/forms/CustomTripForm.jsx';
import styles from './CustomizeTrip.module.css';

export default function CustomizeTrip() {
  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Customize Your Trip</span>
          <h1>Build a Journey Around You</h1>
          <p>Six quick questions — we'll turn them into a Muktinath & Mustang itinerary made for your dates, pace and budget.</p>
        </div>
      </section>

      <section className={`container ${styles.body}`}>
        <CustomTripForm />
      </section>
    </PageTransition>
  );
}
