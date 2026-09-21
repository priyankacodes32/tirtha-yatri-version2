import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Mail, Sparkles, Image, Video } from 'lucide-react';
import api from '../../api/axios.js';
import { listPackages } from '../../api/packages.js';
import { listDestinations } from '../../api/destinations.js';
import { listFeatures } from '../../api/features.js';
import { listGallery } from '../../api/gallery.js';
import { listVideos } from '../../api/videos.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const results = await Promise.allSettled([
        listPackages({ limit: 1 }),
        listDestinations({ limit: 1 }),
        listFeatures(),
        api.get('/enquiries').then((res) => res.data),
        listGallery(),
        listVideos(),
      ]);

      if (cancelled) return;

      const [packagesRes, destinationsRes, featuresRes, enquiriesRes, galleryRes, videosRes] = results;

      setStats({
        packages: packagesRes.status === 'fulfilled' ? packagesRes.value.count ?? 0 : 0,
        destinations: destinationsRes.status === 'fulfilled' ? destinationsRes.value.count ?? 0 : 0,
        features: featuresRes.status === 'fulfilled' ? featuresRes.value.count ?? 0 : 0,
        enquiries: enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.count ?? 0 : null,
        gallery: galleryRes.status === 'fulfilled' ? galleryRes.value.count ?? 0 : null,
        videos: videosRes.status === 'fulfilled' ? videosRes.value.count ?? 0 : null,
      });
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = stats && [
    { label: 'Total Packages', value: stats.packages, icon: Package, to: '/packages' },
    { label: 'Total Destinations', value: stats.destinations, icon: MapPin, to: '/destinations' },
    { label: 'Active Features', value: stats.features, icon: Sparkles, to: '/features' },
    { label: 'Total Enquiries', value: stats.enquiries ?? '—', icon: Mail, to: '/enquiries' },
    { label: 'Gallery Images', value: stats.gallery ?? '—', icon: Image, to: '/gallery' },
    { label: 'Total Videos', value: stats.videos ?? '—', icon: Video, to: '/videos' },
  ];

  return (
    <div>
      <PageHeader title={`Welcome back, ${user?.name?.split(' ')[0] || 'Admin'}`} subtitle="Here's a quick look at Tirtha Yatri right now." />

      {loading ? (
        <Loader label="Loading dashboard…" />
      ) : (
        <div className={styles.grid}>
          {cards.map(({ label, value, icon: Icon, to }) => (
            <Link className={styles.card} to={to} key={label}>
              <div className={styles.iconWrap}>
                <Icon size={20} />
              </div>
              <div>
                <p className={styles.value}>{value}</p>
                <p className={styles.label}>{label}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
