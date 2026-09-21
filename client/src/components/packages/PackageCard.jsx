import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import Button from '../common/Button.jsx';
import { formatPrice, humanizeSlug } from '../../utils/format.js';
import { useEnquiryModal } from '../../context/EnquiryModalContext.jsx';
import styles from './PackageCard.module.css';

export default function PackageCard({ pkg, index = 0 }) {
  const { openEnquiry } = useEnquiryModal();
  const hasDiscount = pkg.discountedPrice < pkg.originalPrice;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/tours/${pkg.slug}`} className={styles.mediaLink}>
        <div className={styles.media}>
          <img src={pkg.coverImage} alt={pkg.title} loading="lazy" />
          <span className={styles.badge}>{humanizeSlug(pkg.category)}</span>
        </div>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/tours/${pkg.slug}`}>{pkg.title}</Link>
        </h3>
        <p className={styles.desc}>{pkg.shortDescription}</p>

        <div className={styles.meta}>
          <span><Clock size={14} /> {pkg.duration}</span>
          <span><MapPin size={14} /> {pkg.startPoint}</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            {hasDiscount && <span className={styles.originalPrice}>{formatPrice(pkg.originalPrice, pkg.currency)}</span>}
            <span className={styles.discountedPrice}>{formatPrice(pkg.discountedPrice, pkg.currency)}</span>
          </div>
          <div className={styles.actions}>
            <Button variant="ghost" size="sm" onClick={() => openEnquiry({ package: pkg })}>
              Enquire
            </Button>
            <Button to={`/tours/${pkg.slug}`} variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
