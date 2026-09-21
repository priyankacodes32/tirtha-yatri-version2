import { useParams } from 'react-router-dom';
import { Mountain, Sun, Route, CheckCircle2, MapPinned } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition.jsx';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getDestinationBySlug } from '../../api/destinationApi.js';
import { humanizeSlug } from '../../utils/format.js';
import styles from './DestinationDetails.module.css';

export default function DestinationDetails() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(() => getDestinationBySlug(slug), [slug]);
  const dest = data?.data;

  if (loading) return <Loader label="Loading destination…" fullHeight />;
  if (error || !dest) {
    return (
      <EmptyState
        title="Destination not found"
        message={error || "This destination may have been removed or the link is incorrect."}
        action={<Button to="/explore-mustang">Explore Other Destinations</Button>}
      />
    );
  }

  return (
    <PageTransition>
      <section className={styles.hero}>
        <img src={dest.coverImage} alt={dest.name} className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.badge}>{humanizeSlug(dest.category)}</span>
          <h1>{dest.name}</h1>
          {dest.altitude && (
            <span className={styles.altitude}><Mountain size={16} /> {dest.altitude}</span>
          )}
        </div>
      </section>

      <div className={`container ${styles.layout}`}>
        <div className={styles.main}>
          <section className={styles.section}>
            <h2>About {dest.name}</h2>
            <p className={styles.paragraph}>{dest.description}</p>
          </section>

          {dest.thingsToDo?.length > 0 && (
            <section className={styles.section}>
              <h2>Things to Do</h2>
              <ul className={styles.list}>
                {dest.thingsToDo.map((t) => <li key={t}><CheckCircle2 size={16} /> {t}</li>)}
              </ul>
            </section>
          )}

          {dest.gallery?.length > 0 && (
            <section className={styles.section}>
              <h2>Gallery</h2>
              <div className={styles.galleryGrid}>
                {dest.gallery.map((img) => (
                  <img key={img} src={img} alt={`${dest.name} gallery`} loading="lazy" />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            {dest.bestTimeToVisit && (
              <div className={styles.infoRow}>
                <Sun size={18} className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>Best Time to Visit</div>
                  <div className={styles.infoValue}>{dest.bestTimeToVisit}</div>
                </div>
              </div>
            )}
            {dest.howToReach && (
              <div className={styles.infoRow}>
                <Route size={18} className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>How to Reach</div>
                  <div className={styles.infoValue}>{dest.howToReach}</div>
                </div>
              </div>
            )}
            {dest.nearbyAttractions?.length > 0 && (
              <div className={styles.infoRow}>
                <MapPinned size={18} className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>Nearby Attractions</div>
                  <div className={styles.tagList}>
                    {dest.nearbyAttractions.map((a) => <span key={a} className={styles.tag}>{a}</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.ctaCard}>
            <h3>Ready to visit?</h3>
            <p>Browse packages that pass through this route, or ask us to build one around it.</p>
            <Button to="/packages" className={styles.fullWidth}>Browse Packages</Button>
            <Button to="/customize-trip" variant="outline" className={styles.fullWidth}>Customize a Trip</Button>
          </div>
        </aside>
      </div>
    </PageTransition>
  );
}
