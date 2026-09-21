import { useParams } from 'react-router-dom';
import { Clock, MapPin, Mountain, Sun, Users, Compass, Star, CheckCircle2, XCircle } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition.jsx';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import PackageCard from '../../components/packages/PackageCard.jsx';
import ItineraryTimeline from '../../components/packages/ItineraryTimeline.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getPackageBySlug, getPackages } from '../../api/packageApi.js';
import { useEnquiryModal } from '../../context/EnquiryModalContext.jsx';
import { formatPrice, humanizeSlug } from '../../utils/format.js';
import styles from './PackageDetails.module.css';

export default function PackageDetails() {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiryModal();

  const { data, loading, error } = useFetch(() => getPackageBySlug(slug), [slug]);
  const pkg = data?.data;

  const { data: relatedData } = useFetch(
    () => (pkg ? getPackages({ category: pkg.category, limit: 4 }) : Promise.resolve({ data: [] })),
    [pkg?.category]
  );
  const related = (relatedData?.data || []).filter((p) => p.slug !== slug).slice(0, 3);

  if (loading) return <Loader label="Loading package…" fullHeight />;
  if (error || !pkg) {
    return (
      <EmptyState
        title="Package not found"
        message={error || "This package may have been removed or the link is incorrect."}
        action={<Button to="/packages">Browse All Packages</Button>}
      />
    );
  }

  const hasDiscount = pkg.discountedPrice < pkg.originalPrice;

  const facts = [
    { icon: Clock, label: 'Duration', value: pkg.duration },
    { icon: MapPin, label: 'Start Point', value: pkg.startPoint },
    { icon: MapPin, label: 'End Point', value: pkg.endPoint },
    { icon: Mountain, label: 'Max Elevation', value: pkg.maxElevation || '—' },
    { icon: Sun, label: 'Best Season', value: pkg.bestSeason || '—' },
    { icon: Compass, label: 'Travel Mode', value: humanizeSlug(pkg.travelMode) },
    { icon: Users, label: 'Group Type', value: pkg.groupType || '—' },
  ];

  return (
    <PageTransition>
      <section className={styles.hero}>
        <img src={pkg.coverImage} alt={pkg.title} className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.badge}>{humanizeSlug(pkg.category)}</span>
          <h1>{pkg.title}</h1>
          <div className={styles.heroMeta}>
            <span><Clock size={15} /> {pkg.duration}</span>
            <span><MapPin size={15} /> {pkg.startPoint} → {pkg.endPoint}</span>
            <span className={styles.rating}><Star size={15} fill="currentColor" /> Featured Journey</span>
          </div>
        </div>
      </section>

      <div className={`container ${styles.layout}`}>
        <div className={styles.main}>
          <div className={styles.factsGrid}>
            {facts.map((f) => (
              <div key={f.label} className={styles.factCard}>
                <f.icon size={18} className={styles.factIcon} />
                <div>
                  <div className={styles.factLabel}>{f.label}</div>
                  <div className={styles.factValue}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>

          <section className={styles.section}>
            <h2>Overview</h2>
            <p className={styles.paragraph}>{pkg.description}</p>
          </section>

          {pkg.highlights?.length > 0 && (
            <section className={styles.section}>
              <h2>Highlights</h2>
              <ul className={styles.highlightList}>
                {pkg.highlights.map((h) => (
                  <li key={h}><CheckCircle2 size={16} /> {h}</li>
                ))}
              </ul>
            </section>
          )}

          {pkg.itinerary?.length > 0 && (
            <section className={styles.section}>
              <h2>Day-by-Day Itinerary</h2>
              <ItineraryTimeline itinerary={pkg.itinerary} />
            </section>
          )}

          <section className={`${styles.section} ${styles.includeExcludeGrid}`}>
            {pkg.includes?.length > 0 && (
              <div>
                <h2>Includes</h2>
                <ul className={styles.includeList}>
                  {pkg.includes.map((i) => <li key={i}><CheckCircle2 size={15} /> {i}</li>)}
                </ul>
              </div>
            )}
            {pkg.excludes?.length > 0 && (
              <div>
                <h2>Excludes</h2>
                <ul className={styles.excludeList}>
                  {pkg.excludes.map((i) => <li key={i}><XCircle size={15} /> {i}</li>)}
                </ul>
              </div>
            )}
          </section>

          {(pkg.accommodationInfo || pkg.travelInformation || pkg.importantNotes) && (
            <section className={styles.section}>
              {pkg.accommodationInfo && (
                <div className={styles.infoBlock}>
                  <h3>Accommodation</h3>
                  <p className={styles.paragraph}>{pkg.accommodationInfo}</p>
                </div>
              )}
              {pkg.travelInformation && (
                <div className={styles.infoBlock}>
                  <h3>Travel Information</h3>
                  <p className={styles.paragraph}>{pkg.travelInformation}</p>
                </div>
              )}
              {pkg.importantNotes && (
                <div className={styles.infoBlock}>
                  <h3>Important Notes</h3>
                  <p className={styles.paragraph}>{pkg.importantNotes}</p>
                </div>
              )}
            </section>
          )}

          {pkg.gallery?.length > 0 && (
            <section className={styles.section}>
              <h2>Gallery</h2>
              <div className={styles.galleryGrid}>
                {pkg.gallery.map((img) => (
                  <img key={img} src={img} alt={`${pkg.title} gallery`} loading="lazy" />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.priceRow}>
              {hasDiscount && <span className={styles.originalPrice}>{formatPrice(pkg.originalPrice, pkg.currency)}</span>}
              <span className={styles.price}>{formatPrice(pkg.discountedPrice, pkg.currency)}</span>
              <span className={styles.perPerson}>per person</span>
            </div>
            <Button size="lg" className={styles.fullWidth} onClick={() => openEnquiry({ package: pkg })}>
              Send Enquiry
            </Button>
            <Button to="/customize-trip" variant="outline" size="lg" className={styles.fullWidth}>
              Customize This Trip
            </Button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className={`container ${styles.relatedSection}`}>
          <h2>Related Packages</h2>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => <PackageCard key={p._id} pkg={p} index={i} />)}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
