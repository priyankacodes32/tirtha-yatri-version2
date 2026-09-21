import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, Play, Video as VideoIcon } from 'lucide-react';
import { listVideos, createVideo, updateVideo, deleteVideo } from '../../api/videos.js';
import { listActiveCategories } from '../../api/categories.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { Input, Select } from '../../components/common/Input.jsx';
import VideoForm from './VideoForm.jsx';
import styles from './Videos.module.css';

export default function Videos() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    Promise.all([listVideos(), listActiveCategories('gallery')])
      .then(([videoRes, catRes]) => {
        setItems(videoRes.success ? videoRes.data : []);
        setCategories(catRes.success ? catRes.data : []);
      })
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load videos')))
      .finally(() => setLoading(false));
  }

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setModalOpen(true);
  }

  async function handleSubmit(payload) {
    setSaving(true);
    try {
      const res = editing ? await updateVideo(editing._id, payload) : await createVideo(payload);
      if (res.success) {
        toast.success(editing ? 'Video updated' : 'Video added');
        setModalOpen(false);
        load();
      } else {
        toast.error(res.message || 'Save failed');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Save failed'));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await deleteVideo(toDelete._id);
      if (res.success) {
        toast.success('Video deleted');
        setItems((prev) => prev.filter((i) => i._id !== toDelete._id));
        setToDelete(null);
      } else {
        toast.error(res.message || 'Delete failed');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Delete failed'));
    } finally {
      setDeleting(false);
    }
  }

  const filtered = items.filter(
    (i) => (category === 'all' || i.category === category) && i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Videos"
        subtitle="Videos shown across the public site."
        action={
          <Button icon={Plus} onClick={openAdd}>
            Add Video
          </Button>
        }
      />

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Input placeholder="Search by title…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select className={styles.categorySelect} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <Loader label="Loading videos…" />
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>No videos found.</div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <div className={`${styles.card} ${!item.isActive ? styles.inactive : ''}`} key={item._id}>
              <div className={styles.thumbWrap}>
                {item.thumbnail ? (
                  <img className={styles.thumb} src={item.thumbnail} alt="" loading="lazy" />
                ) : (
                  <VideoIcon className={styles.placeholder} size={40} />
                )}
                <div className={styles.playOverlay}>
                  <span className={styles.playIcon}>
                    <Play size={18} fill="currentColor" />
                  </span>
                </div>
                {item.isFeatured && (
                  <span className={styles.featuredStar} title="Featured">
                    <Star size={14} fill="currentColor" />
                  </span>
                )}
                <div className={styles.actionBar}>
                  <button className={styles.actionBtn} onClick={() => openEdit(item)} aria-label="Edit">
                    <Pencil size={14} />
                  </button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={() => setToDelete(item)} aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className={styles.body}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.meta}>
                  {item.category ? categories.find((c) => c.slug === item.category)?.name || item.category : 'Uncategorized'}
                </span>
                <Badge active={item.isActive} />
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? 'Edit Video' : 'Add Video'} onClose={() => setModalOpen(false)}>
          <VideoForm initial={editing} categories={categories} onCancel={() => setModalOpen(false)} onSubmit={handleSubmit} saving={saving} />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete video"
          message={`Delete "${toDelete.title}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
