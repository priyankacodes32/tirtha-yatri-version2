import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <Link className={styles.link} to="/">
        Back to dashboard
      </Link>
    </div>
  );
}
