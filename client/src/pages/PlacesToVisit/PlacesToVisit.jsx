import { useSearchParams } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition.jsx';
import DestinationCard from '../../components/destinations/DestinationCard.jsx';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getDestinations } from '../../api/destinationApi.js';
import { getCategories } from '../../api/categoryApi.js';
import styles from './PlacesToVisit.module.css';

export default function PlacesToVisit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const { data, loading, error } = useFetch(() => getDestinations({ category, limit: 24 }), [category]);
  const destinations = data?.data || [];

  // Category chips are admin-managed (Explore Mustang categories can be
  // added/renamed/retired from the dashboard without a code change).
  const { data: categoryData } = useFetch(() => getCategories('destination'), []);
  const categoryOptions = [{ name: 'All', slug: '' }, ...(categoryData?.data || [])];

  const setCategory = (value) => {
    const params = new URLSearchParams();
    if (value) params.set('category', value);
    setSearchParams(params);
  };

  return (
    <PageTransition>
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?fm=jpg&q=75&w=1800&auto=format&fit=crop"
          alt="Terraced houses overlooking a mountain range near Marpha"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Explore Mustang</span>
          <h1>Places That Define Mustang</h1>
          <p>From sacred temples to ancient kingdoms, discover the landscapes and stories hidden beyond the Himalayas.</p>
        </div>
      </section>

      <section className={`container ${styles.body}`}>
        <div className={styles.filters} role="tablist" aria-label="Filter destinations by category">
          {categoryOptions.map((c) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={category === c.slug}
              className={`${styles.filterBtn} ${category === c.slug ? styles.filterActive : ''}`}
              onClick={() => setCategory(c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {loading && <Loader label="Loading destinations…" fullHeight />}
        {error && <EmptyState title="Couldn't load destinations" message={error} />}
        {!loading && !error && destinations.length === 0 && (
          <EmptyState title="No destinations in this category yet" message="Try a different filter." />
        )}

        {!loading && !error && destinations.length > 0 && (
          <div className={styles.grid}>
            {destinations.map((dest, i) => (
              <DestinationCard key={dest._id} destination={dest} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
