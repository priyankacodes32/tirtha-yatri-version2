import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition.jsx';
import PackageFilters from '../../components/packages/PackageFilters.jsx';
import PackageCard from '../../components/packages/PackageCard.jsx';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getPackages } from '../../api/packageApi.js';
import styles from './Packages.module.css';

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '-createdAt';
  const page = Number(searchParams.get('page')) || 1;

  // Local, immediately-responsive text field; debounced into the URL/query below.
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const id = setTimeout(() => {
      const current = searchParams.get('search') || '';
      if (searchInput !== current) {
        const params = new URLSearchParams(searchParams);
        if (searchInput) params.set('search', searchInput);
        else params.delete('search');
        params.delete('page');
        setSearchParams(params);
      }
    }, 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const search = searchParams.get('search') || '';

  const { data, loading, error } = useFetch(
    () => getPackages({ category, search, sort, page, limit: 9 }),
    [category, search, sort, page]
  );

  const filters = useMemo(() => ({ category, search: searchInput, sort }), [category, searchInput, sort]);

  const handleFiltersChange = (next) => {
    const params = new URLSearchParams();
    if (next.category) params.set('category', next.category);
    if (next.sort && next.sort !== '-createdAt') params.set('sort', next.sort);
    if (next.search) params.set('search', next.search);
    setSearchParams(params);
    setSearchInput(next.search || '');
  };

  const goToPage = (p) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(p));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const packages = data?.data || [];
  const pages = data?.pages || 1;

  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Tour Packages</span>
          <h1>Find Your Way to Muktinath</h1>
          <p>Jeep, flight, helicopter and pilgrimage-focused journeys, all fully bookable through our team.</p>
        </div>
      </section>

      <section className={`container ${styles.body}`}>
        <PackageFilters filters={filters} onChange={handleFiltersChange} resultCount={data?.count} />

        {loading && <Loader label="Loading packages…" fullHeight />}
        {error && <EmptyState title="Couldn't load packages" message={error} />}
        {!loading && !error && packages.length === 0 && (
          <EmptyState
            title="No packages match your filters"
            message="Try clearing filters or searching a different term."
          />
        )}

        {!loading && !error && packages.length > 0 && (
          <>
            <div className={styles.grid}>
              {packages.map((pkg, i) => (
                <PackageCard key={pkg._id} pkg={pkg} index={i} />
              ))}
            </div>

            {pages > 1 && (
              <div className={styles.pagination}>
                <Button variant="outline" size="sm" icon={ChevronLeft} iconPosition="left" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                  Prev
                </Button>
                <span className={styles.pageIndicator}>Page {page} of {pages}</span>
                <Button variant="outline" size="sm" icon={ChevronRight} disabled={page >= pages} onClick={() => goToPage(page + 1)}>
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </PageTransition>
  );
}
