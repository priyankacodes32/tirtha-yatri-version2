import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { listDestinations, createDestination, updateDestination, deleteDestination } from '../../api/destinations.js';
import { listActiveCategories } from '../../api/categories.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { Input } from '../../components/common/Input.jsx';
import DestinationForm from './DestinationForm.jsx';
import tableStyles from '../../styles/table.module.css';

export default function Destinations() {
  const toast = useToast();
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list');
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    Promise.all([listDestinations(), listActiveCategories('destination')])
      .then(([destRes, catRes]) => {
        setDestinations(destRes.success ? destRes.data : []);
        setCategories(catRes.success ? catRes.data : []);
      })
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load destinations')))
      .finally(() => setLoading(false));
  }

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setEditing(null);
    setView('form');
  }

  function openEdit(dest) {
    setEditing(dest);
    setView('form');
  }

  async function handleSubmit(payload) {
    setSaving(true);
    try {
      const res = editing ? await updateDestination(editing._id, payload) : await createDestination(payload);
      if (res.success) {
        toast.success(editing ? 'Destination updated' : 'Destination created');
        setView('list');
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
      const res = await deleteDestination(toDelete._id);
      if (res.success) {
        toast.success('Destination deleted');
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

  if (view === 'form') {
    return (
      <div>
        <PageHeader title={editing ? `Edit: ${editing.name}` : 'Add Destination'} subtitle="All fields are used across the destination detail page." />
        <DestinationForm initial={editing} categories={categories} onCancel={() => setView('list')} onSubmit={handleSubmit} saving={saving} />
      </div>
    );
  }

  const filtered = destinations.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Destinations"
        subtitle="Destinations shown on the public site."
        action={
          <Button icon={Plus} onClick={openAdd}>
            Add Destination
          </Button>
        }
      />

      <div className={tableStyles.toolbar}>
        <div className={tableStyles.search}>
          <Input placeholder="Search by name…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <Loader label="Loading destinations…" />
      ) : (
        <div className={tableStyles.card}>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Altitude</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d._id}>
                    <td>
                      <img className={tableStyles.thumb} src={d.coverImage} alt="" />
                    </td>
                    <td>{d.name}</td>
                    <td className={tableStyles.muted}>{d.category}</td>
                    <td className={tableStyles.muted}>{d.altitude || '—'}</td>
                    <td>
                      <Badge active={d.isActive} />
                    </td>
                    <td>
                      <div className={tableStyles.actions}>
                        <button className={tableStyles.iconBtn} onClick={() => openEdit(d)} aria-label="Edit">
                          <Pencil size={15} />
                        </button>
                        <button
                          className={`${tableStyles.iconBtn} ${tableStyles.iconBtnDanger}`}
                          onClick={() => setToDelete(d)}
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
                    <td colSpan={6} className={tableStyles.empty}>
                      No destinations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete destination"
          message={`Delete "${toDelete.name}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
