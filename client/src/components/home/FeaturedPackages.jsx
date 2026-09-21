import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Button from '../common/Button.jsx';
import PackageCard from '../packages/PackageCard.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getFeaturedPackages } from '../../api/packageApi.js';
import { getCategories } from '../../api/categoryApi.js';
import styles from './FeaturedPackages.module.css';

export default function FeaturedPackages() {
  const { data, loading, error } = useFetch(getFeaturedPackages, []);
  const { data: categoryData } = useFetch(() => getCategories('package'), []);
  const [tab, setTab] = useState('');

  const packages = data?.data || [];
  const filtered = tab ? packages.filter((p) => p.category === tab) : packages;

  // Only show tabs for categories actually represented among the featured
  // packages, so admins adding a new package category don't get an empty tab here.
  const tabs = useMemo(() => {
    const present = new Set(packages.map((p) => p.category));
    const known = (categoryData?.data || []).filter((c) => present.has(c.slug));
    return [{ name: 'All', slug: '' }, ...known];
  }, [packages, categoryData]);

  return (
    <section className={`container ${styles.section}`}>
      <SectionTitle
        eyebrow="Tour Packages"
        title="Find Your Way to Muktinath"
        subtitle="Jeep, bus, flight, helicopter or a full pilgrimage journey — choose the pace that fits your trip."
      />

      <div className={styles.tabs} role="tablist" aria-label="Filter featured packages">
        {tabs.map((t) => (
          <button
            key={t.slug}
            role="tab"
            aria-selected={tab === t.slug}
            className={`${styles.tab} ${tab === t.slug ? styles.tabActive : ''}`}
            onClick={() => setTab(t.slug)}
          >
            {t.name}
          </button>
        ))}
      </div>

      {loading && <Loader label="Loading packages…" />}
      {error && <EmptyState title="Couldn't load packages" message={error} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No packages in this category yet" message="Try a different filter, or view all packages." />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((pkg, i) => (
            <PackageCard key={pkg._id} pkg={pkg} index={i} />
          ))}
        </div>
      )}

      <div className={styles.cta}>
        <Button to="/packages" variant="outline" icon={ArrowRight}>
          View All Packages
        </Button>
      </div>
    </section>
  );
}
