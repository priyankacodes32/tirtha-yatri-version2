import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { humanizeSlug } from '../../utils/format.js';
import { getReadingTime, formatBlogDate } from '../../utils/readingTime.js';
import styles from './BlogCard.module.css';

export default function BlogCard({ blog, index = 0 }) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link to={`/blog/${blog.slug}`} className={styles.imageLink}>
        <img src={blog.coverImage} alt={blog.title} loading="lazy" className={styles.img} />
      </Link>
      <div className={styles.body}>
        <span className={styles.category}>{humanizeSlug(blog.category)}</span>
        <h3 className={styles.title}>
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>
        <p className={styles.excerpt}>{blog.excerpt}</p>
        <div className={styles.meta}>
          <span>{getReadingTime(blog.content)}</span>
          <span aria-hidden="true">·</span>
          <span>{formatBlogDate(blog.publishedAt || blog.createdAt)}</span>
        </div>
        <Link to={`/blog/${blog.slug}`} className={styles.readMore}>
          Read Story <ArrowRight size={15} />
        </Link>
      </div>
    </motion.article>
  );
}
