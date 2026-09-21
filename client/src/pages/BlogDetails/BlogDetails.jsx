import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition.jsx';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import BlogCard from '../../components/blog/BlogCard.jsx';
import TableOfContents from '../../components/blog/TableOfContents.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getBlogBySlug, getBlogs } from '../../api/blogApi.js';
import { parseBlog, renderBlocks } from '../../utils/markdown.jsx';
import { humanizeSlug } from '../../utils/format.js';
import { getReadingTime, formatBlogDate } from '../../utils/readingTime.js';
import styles from './BlogDetails.module.css';

export default function BlogDetails() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(() => getBlogBySlug(slug), [slug]);
  const blog = data?.data;

  const { blocks, headings } = useMemo(() => (blog ? parseBlog(blog.content) : { blocks: [], headings: [] }), [blog]);

  const { data: categoryPosts } = useFetch(
    () => (blog ? getBlogs({ category: blog.category, limit: 12 }) : Promise.resolve({ data: [] })),
    [blog?.category]
  );

  const related = useMemo(() => {
    if (!blog) return [];
    const pool = (categoryPosts?.data || []).filter((b) => b.slug !== slug);
    // Same category is already guaranteed by the query above; within that,
    // prefer posts sharing a tag with the current article.
    const withSharedTag = pool.filter((b) => (b.tags || []).some((t) => blog.tags?.includes(t)));
    const rest = pool.filter((b) => !withSharedTag.includes(b));
    return [...withSharedTag, ...rest].slice(0, 3);
  }, [blog, categoryPosts, slug]);

  if (loading) return <Loader label="Loading story…" fullHeight />;
  if (error || !blog) {
    return (
      <EmptyState
        title="Story not found"
        message={error || "This article may have been unpublished or the link is incorrect."}
        action={<Button to="/blog">Back to Blog</Button>}
      />
    );
  }

  return (
    <PageTransition>
      <article>
        <header className={styles.header}>
          <div className="container">
            <span className={styles.category}>{humanizeSlug(blog.category)}</span>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.excerpt}>{blog.excerpt}</p>
            <div className={styles.meta}>
              <span>By {blog.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formatBlogDate(blog.publishedAt || blog.createdAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{getReadingTime(blog.content)}</span>
            </div>
          </div>
        </header>

        <div className={`container ${styles.heroImageWrap}`}>
          <img src={blog.coverImage} alt={blog.title} className={styles.heroImage} />
        </div>

        <div className={`container ${styles.layout}`}>
          {headings.length >= 3 && (
            <aside className={styles.sidebar}>
              <div className={styles.sidebarSticky}>
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}

          <div className={`${styles.content} ${headings.length >= 3 ? '' : styles.contentWide}`}>
            {renderBlocks(blocks)}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className={`container ${styles.related}`}>
          <h2>Continue Exploring Mustang</h2>
          <div className={styles.relatedGrid}>
            {related.map((b, i) => (
              <BlogCard key={b._id} blog={b} index={i} />
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
