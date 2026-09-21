import { Search, X } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import { getCategories } from '../../api/categoryApi.js';
import styles from './PackageFilters.module.css';

const SORT_OPTIONS = [
  { label: 'Newest', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'discountedPrice' },
  { label: 'Price: High to Low', value: '-discountedPrice' },
];

export default function PackageFilters({ filters, onChange, resultCount }) {
  // Package categories are admin-managed — see Category model / /api/categories?type=package.
  const { data: categoryData } = useFetch(() => getCategories('package'), []);
  const categories = [{ name: 'All Categories', slug: '' }, ...(categoryData?.data || [])];

  const set = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  const hasActiveFilters = filters.category || filters.search;

  return (
    <div className={styles.bar}>
      <div className={styles.searchField}>
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search packages…"
          value={filters.search}
          onChange={set('search')}
          aria-label="Search packages"
        />
      </div>

      <select value={filters.category} onChange={set('category')} aria-label="Filter by category">
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      <select value={filters.sort} onChange={set('sort')} aria-label="Sort packages">
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <div className={styles.count}>
        {resultCount !== undefined ? `${resultCount} package${resultCount === 1 ? '' : 's'}` : ''}
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange({ category: '', search: '', sort: filters.sort })}
        >
          <X size={14} /> Clear filters
        </button>
      )}
    </div>
  );
}
