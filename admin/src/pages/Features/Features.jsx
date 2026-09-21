import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { listFeatures, createFeature, updateFeature, deleteFeature } from '../../api/features.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import { FEATURE_ICON_NAMES } from '../../utils/icons.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import Field from '../../components/common/Field.jsx';
import { Input, Textarea, Select, Checkbox } from '../../components/common/Input.jsx';
import tableStyles from '../../styles/table.module.css';

const emptyFeature = { icon: 'Compass', title: '', description: '', order: 0, isActive: true };

export default function Features() {
  const toast = useToast();
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyFeature);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    listFeatures()
      .then((res) => setFeatures(res.success ? res.data : []))
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load features')))
      .finally(() => setLoading(false));
  }

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setEditing(null);
    setForm(emptyFeature);
    setModalOpen(true);
  }

  function openEdit(feature) {
    setEditing(feature);
    setForm({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      order: feature.order ?? 0,
      isActive: feature.isActive,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      const res = editing ? await updateFeature(editing._id, payload) : await createFeature(payload);
      if (res.success) {
        toast.success(editing ? 'Feature updated' : 'Feature created');
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
      const res = await deleteFeature(toDelete._id);
      if (res.success) {
        toast.success('Feature deleted');
        setToDelete(null);
        load();
      } else {
        toast.error(res.message || 'Delete failed');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Delete failed'));
    } finally {
      setDeleting(false);
    }
  }

  const sorted = [...features].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div>
      <PageHeader
        title="Features"
        subtitle="The highlight cards shown on the public site's homepage."
        action={
          <Button icon={Plus} onClick={openAdd}>
            Add Feature
          </Button>
        }
      />

      {loading ? (
        <Loader label="Loading features…" />
      ) : (
        <div className={tableStyles.card}>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Icon</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((f) => {
                  const IconComp = Icons[f.icon] || Sparkles;
                  return (
                    <tr key={f._id}>
                      <td>{f.order}</td>
                      <td>
                        <IconComp size={18} />
                      </td>
                      <td>{f.title}</td>
                      <td className={tableStyles.muted}>{f.description}</td>
                      <td>
                        <Badge active={f.isActive} />
                      </td>
                      <td>
                        <div className={tableStyles.actions}>
                          <button className={tableStyles.iconBtn} onClick={() => openEdit(f)} aria-label="Edit">
                            <Pencil size={15} />
                          </button>
                          <button
                            className={`${tableStyles.iconBtn} ${tableStyles.iconBtnDanger}`}
                            onClick={() => setToDelete(f)}
                            aria-label="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={6} className={tableStyles.empty}>
                      No features yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? 'Edit Feature' : 'Add Feature'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Field label="Icon" required>
              <Select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}>
                {FEATURE_ICON_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Title" required>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            </Field>
            <Field label="Description" required>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                required
              />
            </Field>
            <Field label="Order">
              <Input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))} />
            </Field>
            <Checkbox
              label="Active"
              checked={form.isActive}
              onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
            />
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
          title="Delete feature"
          message={`Delete "${toDelete.title}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
