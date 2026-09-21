import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button.jsx';
import { humanizeSlug } from '../../utils/format.js';
import { getReadingTime, formatBlogDate } from '../../utils/readingTime.js';
import styles from './FeaturedArticle.module.css';

export default function FeaturedArticle({ blog, dark = false }) {
  return (
    <motion.article
      className={`${styles.card} ${dark ? styles.dark : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/blog/${blog.slug}`} className={styles.imageLink}>
        <img src={blog.coverImage} alt={blog.title} className={styles.img} />
      </Link>
      <div className={styles.body}>
        <span className={styles.category}>{humanizeSlug(blog.category)}</span>
        <h2 className={styles.title}>
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>
        <p className={styles.excerpt}>{blog.excerpt}</p>
        <div className={styles.meta}>
          <span>{getReadingTime(blog.content)}</span>
          <span aria-hidden="true">·</span>
          <span>{formatBlogDate(blog.publishedAt || blog.createdAt)}</span>
        </div>
        <Button to={`/blog/${blog.slug}`} variant={dark ? 'secondary' : 'outline'} icon={ArrowRight} className={styles.cta}>
          Read More
        </Button>
      </div>
    </motion.article>
  );
}
