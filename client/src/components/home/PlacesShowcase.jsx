import { ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Button from '../common/Button.jsx';
import DestinationCard from '../destinations/DestinationCard.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getFeaturedDestinations } from '../../api/destinationApi.js';
import styles from './PlacesShowcase.module.css';

// The first and fourth cards span two columns for a storytelling, non-uniform grid.
const LARGE_INDEXES = new Set([0, 3]);

export default function PlacesShowcase() {
  const { data, loading, error } = useFetch(getFeaturedDestinations, []);
  const destinations = data?.data || [];

  return (
    <section className={`${styles.section}`}>
      <div className="container">
        <SectionTitle
          eyebrow="Explore Mustang"
          title="Places That Define Mustang"
          subtitle="From sacred temples to ancient kingdoms, discover the landscapes and stories hidden beyond the Himalayas."
        />
      </div>

      <div className="container">
        {loading && <Loader label="Loading destinations…" />}
        {error && <EmptyState title="Couldn't load destinations" message={error} />}
        {!loading && !error && destinations.length === 0 && (
          <EmptyState title="No destinations yet" message="Check back soon." />
        )}

        {!loading && !error && destinations.length > 0 && (
          <>
            <div className={styles.grid}>
              {destinations.map((dest, i) => (
                <DestinationCard key={dest._id} destination={dest} index={i} size={LARGE_INDEXES.has(i) ? 'lg' : 'md'} />
              ))}
            </div>

            <div className={styles.cta}>
              <Button to="/explore-mustang" variant="outline" icon={ArrowRight}>
                Explore All Destinations
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
