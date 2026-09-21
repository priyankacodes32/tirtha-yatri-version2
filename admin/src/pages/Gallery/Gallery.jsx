import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { listGallery, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../../api/gallery.js';
import { listActiveCategories } from '../../api/categories.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';
import Modal from '../../components/common/Modal.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { Input, Select } from '../../components/common/Input.jsx';
import GalleryForm from './GalleryForm.jsx';
import styles from './Gallery.module.css';

export default function Gallery() {
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
    Promise.all([listGallery(), listActiveCategories('gallery')])
      .then(([galleryRes, catRes]) => {
        setItems(galleryRes.success ? galleryRes.data : []);
        setCategories(catRes.success ? catRes.data : []);
      })
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load gallery')))
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
      const res = editing ? await updateGalleryImage(editing._id, payload) : await createGalleryImage(payload);
      if (res.success) {
        toast.success(editing ? 'Image updated' : 'Image added');
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
      const res = await deleteGalleryImage(toDelete._id);
      if (res.success) {
        toast.success('Image deleted');
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
        title="Gallery"
        subtitle="Photos shown across the public site's gallery pages."
        action={
          <Button icon={Plus} onClick={openAdd}>
            Add Image
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
        <Loader label="Loading gallery…" />
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>No gallery images found.</div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <div className={styles.card} key={item._id}>
              <div className={styles.thumbWrap}>
                <img className={styles.thumb} src={item.image} alt={item.altText} loading="lazy" />
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
                  {categories.find((c) => c.slug === item.category)?.name || item.category}
                  {item.location ? ` · ${item.location}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? 'Edit Image' : 'Add Image'} onClose={() => setModalOpen(false)}>
          <GalleryForm initial={editing} categories={categories} onCancel={() => setModalOpen(false)} onSubmit={handleSubmit} saving={saving} />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete image"
          message={`Delete "${toDelete.title}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
