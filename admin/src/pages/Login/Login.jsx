import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Mountain, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Input } from '../../components/common/Input.jsx';
import Field from '../../components/common/Field.jsx';
import Button from '../../components/common/Button.jsx';
import styles from './Login.module.css';

export default function Login() {
  const { user, isAdmin, loading, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && isAdmin) {
    const to = location.state?.from || '/';
    return <Navigate to={to} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          <Mountain size={28} className={styles.brandIcon} />
          <div>
            <h1 className={styles.title}>Tirtha Yatri</h1>
            <p className={styles.subtitle}>Admin dashboard</p>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <Field label="Email" required>
          <Input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@tirthayatri.com"
            required
          />
        </Field>

        <Field label="Password" required>
          <Input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </Field>

        <Button type="submit" icon={LogIn} disabled={submitting} className={styles.submitBtn}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
