import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import FeaturedArticle from '../../components/blog/FeaturedArticle.jsx';
import BlogCard from '../../components/blog/BlogCard.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getBlogs } from '../../api/blogApi.js';
import { getCategories } from '../../api/categoryApi.js';
import styles from './Blog.module.css';

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [search, setSearch] = useState('');

  const { data: categoryData } = useFetch(() => getCategories('blog'), []);
  const categories = [{ name: 'All', slug: '' }, ...(categoryData?.data || [])];

  const { data: featuredData } = useFetch(() => getBlogs({ featured: 'true' }), []);
  const featured = featuredData?.data || [];

  const { data, loading, error } = useFetch(() => getBlogs({ category, limit: 50 }), [category]);
  const posts = data?.data || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((b) =>
      [b.title, b.excerpt, b.category, ...(b.tags || [])].join(' ').toLowerCase().includes(q)
    );
  }, [posts, search]);

  const setCategory = (slug) => {
    const params = new URLSearchParams();
    if (slug) params.set('category', slug);
    setSearchParams(params);
  };

  const heroArticle = featured[0];
  const secondaryFeatured = featured.slice(1, 3);

  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Blog</span>
          <h1>Explore Mustang</h1>
          <p>Stories, travel guides and tips to help you discover the landscapes, culture and sacred places of Mustang.</p>
        </div>
      </section>

      {heroArticle && (
        <section className={`container ${styles.heroArticle}`}>
          <FeaturedArticle blog={heroArticle} />
        </section>
      )}

      {secondaryFeatured.length > 0 && (
        <section className={`container ${styles.section}`}>
          <SectionTitle eyebrow="Handpicked" title="Featured Stories" align="left" />
          <div className={styles.featuredGrid}>
            {secondaryFeatured.map((b, i) => (
              <BlogCard key={b._id} blog={b} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className={`container ${styles.section}`}>
        <SectionTitle eyebrow="Read On" title="Latest Stories" align="left" />

        <div className={styles.toolbar}>
          <div className={styles.searchField}>
            <Search size={17} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search Mustang stories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search blog posts"
            />
          </div>

          <div className={styles.filters} role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
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
        </div>

        {loading && <Loader label="Loading stories…" fullHeight />}
        {error && <EmptyState title="Couldn't load stories" message={error} />}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState title="No stories found" message="Try a different category or search term." />
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((b, i) => (
              <BlogCard key={b._id} blog={b} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
