import { Mountain } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition.jsx';
import Button from '../../components/common/Button.jsx';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <PageTransition>
      <section className={styles.wrap}>
        <Mountain size={48} className={styles.icon} />
        <span className={styles.code}>404</span>
        <h1>This trail doesn't lead anywhere</h1>
        <p>The page you're looking for might have moved, or never existed on this route.</p>
        <div className={styles.actions}>
          <Button to="/">Back to Home</Button>
          <Button to="/packages" variant="outline">Browse Packages</Button>
        </div>
      </section>
    </PageTransition>
  );
}
