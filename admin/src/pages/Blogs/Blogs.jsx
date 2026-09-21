import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { listBlogs, createBlog, updateBlog, deleteBlog } from '../../api/blogs.js';
import { listActiveCategories } from '../../api/categories.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { Input, Select } from '../../components/common/Input.jsx';
import BlogForm from './BlogForm.jsx';
import tableStyles from '../../styles/table.module.css';
import styles from './Blogs.module.css';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { dateStyle: 'medium' });
}

export default function Blogs() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  function load() {
    setLoading(true);
    Promise.all([listBlogs(), listActiveCategories('blog')])
      .then(([blogRes, catRes]) => {
        setItems(blogRes.success ? blogRes.data : []);
        setCategories(catRes.success ? catRes.data : []);
      })
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load blog posts')))
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
      const res = editing ? await updateBlog(editing._id, payload) : await createBlog(payload);
      if (res.success) {
        toast.success(editing ? 'Blog post updated' : 'Blog post created');
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

  async function handleTogglePublish(item) {
    setTogglingId(item._id);
    try {
      const res = await updateBlog(item._id, { published: !item.published });
      if (res.success) {
        setItems((prev) => prev.map((i) => (i._id === item._id ? res.data : i)));
        toast.success(res.data.published ? 'Post published' : 'Post moved to draft');
      } else {
        toast.error(res.message || 'Update failed');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Update failed'));
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await deleteBlog(toDelete._id);
      if (res.success) {
        toast.success('Blog post deleted');
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

  const filtered = items.filter((b) => {
    if (status === 'published' && !b.published) return false;
    if (status === 'draft' && b.published) return false;
    if (category !== 'all' && b.category !== category) return false;
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return b.title.toLowerCase().includes(term) || (b.excerpt || '').toLowerCase().includes(term);
  });

  return (
    <div>
      <PageHeader
        title="Blog"
        subtitle="Articles shown on the public site's blog."
        action={
          <Button icon={Plus} onClick={openAdd}>
            Add Post
          </Button>
        }
      />

      <div className={tableStyles.toolbar}>
        <div className={tableStyles.search}>
          <Input placeholder="Search by title or excerpt…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select className={styles.filterSelect} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Select>
        <Select className={styles.filterSelect} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <Loader label="Loading blog posts…" />
      ) : (
        <div className={tableStyles.card}>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <img className={tableStyles.thumb} src={b.coverImage} alt="" />
                    </td>
                    <td>{b.title}</td>
                    <td className={tableStyles.muted}>{categories.find((c) => c.slug === b.category)?.name || b.category}</td>
                    <td>
                      <Badge active={b.published} label={b.published ? 'Published' : 'Draft'} />
                    </td>
                    <td>
                      {b.isFeatured ? (
                        <Star size={16} className={styles.featuredStar} fill="currentColor" aria-label="Featured" />
                      ) : (
                        <span className={tableStyles.muted}>—</span>
                      )}
                    </td>
                    <td className={tableStyles.muted}>{formatDate(b.published ? b.publishedAt : b.createdAt)}</td>
                    <td>
                      <div className={tableStyles.actions}>
                        <button
                          className={tableStyles.iconBtn}
                          onClick={() => handleTogglePublish(b)}
                          disabled={togglingId === b._id}
                          aria-label={b.published ? 'Unpublish' : 'Publish'}
                          title={b.published ? 'Unpublish' : 'Publish'}
                        >
                          {b.published ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button className={tableStyles.iconBtn} onClick={() => openEdit(b)} aria-label="Edit">
                          <Pencil size={15} />
                        </button>
                        <button
                          className={`${tableStyles.iconBtn} ${tableStyles.iconBtnDanger}`}
                          onClick={() => setToDelete(b)}
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className={tableStyles.empty}>
                      No blog posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? 'Edit Post' : 'Add Post'} onClose={() => setModalOpen(false)}>
          <BlogForm initial={editing} categories={categories} onCancel={() => setModalOpen(false)} onSubmit={handleSubmit} saving={saving} />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete blog post"
          message={`Delete "${toDelete.title}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
