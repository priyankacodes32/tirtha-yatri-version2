import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Compass, Search } from 'lucide-react';
import Button from '../common/Button.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getCategories } from '../../api/categoryApi.js';
import styles from './SmartSearch.module.css';

const START_POINTS = ['Any starting point', 'Pokhara', 'Kathmandu'];

export default function SmartSearch() {
  const navigate = useNavigate();
  const [startPoint, setStartPoint] = useState(START_POINTS[0]);
  const [travelType, setTravelType] = useState('');

  // Travel types are admin-managed package categories.
  const { data: categoryData } = useFetch(() => getCategories('package'), []);
  const travelTypes = [{ name: 'Any travel type', slug: '' }, ...(categoryData?.data || [])];

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (startPoint !== START_POINTS[0]) params.set('search', startPoint);
    if (travelType) params.set('category', travelType);
    navigate(`/packages${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <label className={styles.field}>
        <span><MapPin size={15} /> Starting From</span>
        <select value={startPoint} onChange={(e) => setStartPoint(e.target.value)}>
          {START_POINTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span><Compass size={15} /> Travel Type</span>
        <select value={travelType} onChange={(e) => setTravelType(e.target.value)}>
          {travelTypes.map((t) => (
            <option key={t.slug} value={t.slug}>{t.name}</option>
          ))}
        </select>
      </label>

      <Button type="submit" size="md" icon={Search} className={styles.submit}>
        Find My Journey
      </Button>
    </motion.form>
  );
}
