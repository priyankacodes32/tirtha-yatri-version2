import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { listCategories, createCategory, updateCategory, deleteCategory } from '../../api/categories.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import { CATEGORY_TYPES } from '../../utils/icons.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import Field from '../../components/common/Field.jsx';
import { Input, Textarea, Checkbox } from '../../components/common/Input.jsx';
import tableStyles from '../../styles/table.module.css';
import styles from './Categories.module.css';

const emptyCategory = { name: '', description: '', icon: '', order: 0, isActive: true };

export default function Categories() {
  const toast = useToast();
  const [type, setType] = useState('destination');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCategory);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load(t) {
    setLoading(true);
    listCategories(t)
      .then((res) => setItems(res.success ? res.data : []))
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load categories')))
      .finally(() => setLoading(false));
  }

  useEffect(() => load(type), [type]); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setEditing(null);
    setForm(emptyCategory);
    setModalOpen(true);
  }

  function openEdit(cat) {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description || '',
      icon: cat.icon || '',
      order: cat.order ?? 0,
      isActive: cat.isActive,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, type, order: Number(form.order) || 0 };
      const res = editing ? await updateCategory(editing._id, payload) : await createCategory(payload);
      if (res.success) {
        toast.success(editing ? 'Category updated' : 'Category created');
        setModalOpen(false);
        load(type);
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
      const res = await deleteCategory(toDelete._id);
      if (res.success) {
        toast.success('Category deleted');
        setToDelete(null);
        load(type);
      } else {
        toast.error(res.message || 'Delete failed');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Delete failed'));
    } finally {
      setDeleting(false);
    }
  }

  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Categories power the dropdown filters and forms across destinations, packages, blog and gallery."
        action={
          <Button icon={Plus} onClick={openAdd}>
            Add Category
          </Button>
        }
      />

      <div className={styles.tabs}>
        {CATEGORY_TYPES.map((t) => (
          <button
            key={t.value}
            className={`${styles.tab} ${type === t.value ? styles.tabActive : ''}`}
            onClick={() => setType(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Loading categories…" />
      ) : (
        <div className={tableStyles.card}>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Icon</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c) => (
                  <tr key={c._id}>
                    <td>{c.order}</td>
                    <td>{c.name}</td>
                    <td className={tableStyles.muted}>{c.slug}</td>
                    <td className={tableStyles.muted}>{c.icon || '—'}</td>
                    <td>
                      <Badge active={c.isActive} />
                    </td>
                    <td>
                      <div className={tableStyles.actions}>
                        <button className={tableStyles.iconBtn} onClick={() => openEdit(c)} aria-label="Edit">
                          <Pencil size={15} />
                        </button>
                        <button
                          className={`${tableStyles.iconBtn} ${tableStyles.iconBtnDanger}`}
                          onClick={() => setToDelete(c)}
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={6} className={tableStyles.empty}>
                      No categories yet for this type.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? 'Edit Category' : `Add ${CATEGORY_TYPES.find((t) => t.value === type)?.label} Category`} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Field label="Name" required>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            </Field>
            <Field label="Description">
              <Textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </Field>
            <Field label="Icon" hint="Optional — a lucide-react export name">
              <Input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} placeholder="e.g. Mountain" />
            </Field>
            <Field label="Order">
              <Input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))} />
            </Field>
            <Checkbox label="Active" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete category"
          message={`Delete "${toDelete.name}"? Packages/destinations already using this category will need to be updated separately.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
