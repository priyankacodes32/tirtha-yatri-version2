import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { listPackages, createPackage, updatePackage, deletePackage } from '../../api/packages.js';
import { listActiveCategories } from '../../api/categories.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { Input } from '../../components/common/Input.jsx';
import PackageForm from './PackageForm.jsx';
import tableStyles from '../../styles/table.module.css';

export default function Packages() {
  const toast = useToast();
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    Promise.all([listPackages(), listActiveCategories('package')])
      .then(([pkgRes, catRes]) => {
        setPackages(pkgRes.success ? pkgRes.data : []);
        setCategories(catRes.success ? catRes.data : []);
      })
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load packages')))
      .finally(() => setLoading(false));
  }

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setEditing(null);
    setView('form');
  }

  function openEdit(pkg) {
    setEditing(pkg);
    setView('form');
  }

  async function handleSubmit(payload) {
    setSaving(true);
    try {
      const res = editing ? await updatePackage(editing._id, payload) : await createPackage(payload);
      if (res.success) {
        toast.success(editing ? 'Package updated' : 'Package created');
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
      const res = await deletePackage(toDelete._id);
      if (res.success) {
        toast.success('Package deleted');
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
        <PageHeader title={editing ? `Edit: ${editing.title}` : 'Add Package'} subtitle="All fields are used across the package detail page." />
        <PackageForm initial={editing} categories={categories} onCancel={() => setView('list')} onSubmit={handleSubmit} saving={saving} />
      </div>
    );
  }

  const filtered = packages.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Packages"
        subtitle="Tour packages shown on the public site."
        action={
          <Button icon={Plus} onClick={openAdd}>
            Add Package
          </Button>
        }
      />

      <div className={tableStyles.toolbar}>
        <div className={tableStyles.search}>
          <Input placeholder="Search by title…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <Loader label="Loading packages…" />
      ) : (
        <div className={tableStyles.card}>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img className={tableStyles.thumb} src={p.coverImage} alt="" />
                    </td>
                    <td>{p.title}</td>
                    <td className={tableStyles.muted}>{p.category}</td>
                    <td>
                      {p.currency} {p.discountedPrice}
                      {p.discountedPrice !== p.originalPrice && (
                        <span className={tableStyles.muted} style={{ textDecoration: 'line-through', marginLeft: 6 }}>
                          {p.originalPrice}
                        </span>
                      )}
                    </td>
                    <td>
                      <Badge active={p.isActive} />
                    </td>
                    <td>
                      <div className={tableStyles.actions}>
                        <button className={tableStyles.iconBtn} onClick={() => openEdit(p)} aria-label="Edit">
                          <Pencil size={15} />
                        </button>
                        <button
                          className={`${tableStyles.iconBtn} ${tableStyles.iconBtnDanger}`}
                          onClick={() => setToDelete(p)}
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
                      No packages found.
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
          title="Delete package"
          message={`Delete "${toDelete.title}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
