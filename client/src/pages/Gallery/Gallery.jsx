import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition.jsx';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import PhotoCard from '../../components/gallery/PhotoCard.jsx';
import VideoCard from '../../components/gallery/VideoCard.jsx';
import Lightbox from '../../components/gallery/Lightbox.jsx';
import VideoModal from '../../components/gallery/VideoModal.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getGalleryImages } from '../../api/galleryApi.js';
import { getVideos } from '../../api/videoApi.js';
import { getCategories } from '../../api/categoryApi.js';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') === 'videos' ? 'videos' : 'photos';
  const category = searchParams.get('category') || '';

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const { data: categoryData } = useFetch(() => getCategories('gallery'), []);
  const categories = [{ name: 'All', slug: '' }, ...(categoryData?.data || [])];

  const { data: photoData, loading: photosLoading, error: photosError } = useFetch(
    () => getGalleryImages({ category }),
    [category]
  );
  const { data: videoData, loading: videosLoading, error: videosError } = useFetch(
    () => getVideos({ category }),
    [category]
  );

  const photos = photoData?.data || [];
  const videos = videoData?.data || [];

  const setTab = (next) => {
    const params = new URLSearchParams(searchParams);
    if (next === 'videos') params.set('tab', 'videos');
    else params.delete('tab');
    setSearchParams(params);
  };

  const setCategory = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) params.set('category', slug);
    else params.delete('category');
    setSearchParams(params);
  };

  return (
    <PageTransition>
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1573238749554-3fc79bad86d7?fm=jpg&q=75&w=1800&auto=format&fit=crop"
          alt="A Himalayan monastery roof with prayer flags"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Gallery</span>
          <h1>Muktinath & Mustang in Pictures</h1>
          <p>Temples, villages, high desert canyons and traveller moments — browse photos and video from the route.</p>
        </div>
      </section>

      <section className={`container ${styles.body}`}>
        <div className={styles.tabs} role="tablist" aria-label="Gallery type">
          <button
            role="tab"
            aria-selected={tab === 'photos'}
            className={`${styles.tabBtn} ${tab === 'photos' ? styles.tabActive : ''}`}
            onClick={() => setTab('photos')}
          >
            <ImageIcon size={16} /> Photos
          </button>
          <button
            role="tab"
            aria-selected={tab === 'videos'}
            className={`${styles.tabBtn} ${tab === 'videos' ? styles.tabActive : ''}`}
            onClick={() => setTab('videos')}
          >
            <VideoIcon size={16} /> Videos
          </button>
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

        {tab === 'photos' && (
          <>
            {photosLoading && <Loader label="Loading photos…" fullHeight />}
            {photosError && <EmptyState title="Couldn't load photos" message={photosError} />}
            {!photosLoading && !photosError && photos.length === 0 && (
              <EmptyState title="No photos in this category yet" message="Try a different filter." />
            )}
            {!photosLoading && !photosError && photos.length > 0 && (
              <div className={styles.masonry}>
                {photos.map((photo, i) => (
                  <PhotoCard key={photo._id} photo={photo} index={i} onClick={() => setLightboxIndex(i)} />
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'videos' && (
          <>
            {videosLoading && <Loader label="Loading videos…" fullHeight />}
            {videosError && <EmptyState title="Couldn't load videos" message={videosError} />}
            {!videosLoading && !videosError && videos.length === 0 && (
              <EmptyState title="No videos in this category yet" message="Check back soon." />
            )}
            {!videosLoading && !videosError && videos.length > 0 && (
              <div className={styles.videoGrid}>
                {videos.map((video, i) => (
                  <VideoCard key={video._id} video={video} index={i} onClick={() => setActiveVideo(video)} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <Lightbox images={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </PageTransition>
  );
}
