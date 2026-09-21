import { useCallback, useEffect, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { listEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../api/enquiries.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Modal from '../../components/common/Modal.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { Input, Select } from '../../components/common/Input.jsx';
import tableStyles from '../../styles/table.module.css';
import styles from './Enquiries.module.css';

const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'converted', label: 'Converted' },
  { value: 'closed', label: 'Closed' },
];

const STATUS_OPTIONS = STATUS_TABS.filter((s) => s.value !== 'all');

function statusClass(status) {
  return styles[`status_${status.replace(/-/g, '_')}`] || '';
}

function StatusBadge({ status }) {
  const label = STATUS_OPTIONS.find((s) => s.value === status)?.label || status;
  return <span className={`${styles.statusBadge} ${statusClass(status)}`}>{label}</span>;
}

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function Enquiries() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [viewing, setViewing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const params = {};
    if (status !== 'all') params.status = status;
    if (search.trim()) params.search = search.trim();
    return listEnquiries(params)
      .then((res) => setItems(res.success ? res.data : []))
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load enquiries')))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, search]);

  useEffect(() => {
    const t = setTimeout(load, search ? 350 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  async function handleStatusChange(item, nextStatus) {
    setUpdatingId(item._id);
    try {
      const res = await updateEnquiryStatus(item._id, nextStatus);
      if (res.success) {
        setItems((prev) => prev.map((i) => (i._id === item._id ? res.data : i)));
        toast.success('Status updated');
      } else {
        toast.error(res.message || 'Update failed');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Update failed'));
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await deleteEnquiry(toDelete._id);
      if (res.success) {
        toast.success('Enquiry deleted');
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

  return (
    <div>
      <PageHeader title="Enquiries" subtitle="Enquiries submitted through the website's contact and package forms." />

      <div className={styles.tabs}>
        {STATUS_TABS.map((t) => (
          <button
            key={t.value}
            className={`${styles.tab} ${status === t.value ? styles.tabActive : ''}`}
            onClick={() => setStatus(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={tableStyles.toolbar}>
        <div className={tableStyles.search}>
          <Input placeholder="Search by name, email or phone…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <Loader label="Loading enquiries…" />
      ) : (
        <div className={tableStyles.card}>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Package</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className={styles.clickableRow} onClick={() => setViewing(item)}>
                      <div className={styles.contactName}>{item.fullName}</div>
                      <div className={styles.contactLine}>{item.email}</div>
                      <div className={styles.contactLine}>{item.phone}</div>
                    </td>
                    <td className={tableStyles.muted}>{item.package ? item.package.title : 'General enquiry'}</td>
                    <td className={styles.messageCell} title={item.message} onClick={() => setViewing(item)}>
                      {item.message}
                    </td>
                    <td>
                      <div className={styles.statusCell}>
                        <StatusBadge status={item.status} />
                        <Select
                          className={styles.statusSelect}
                          value={item.status}
                          disabled={updatingId === item._id}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleStatusChange(item, e.target.value)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </td>
                    <td className={tableStyles.muted}>{formatDate(item.createdAt)}</td>
                    <td>
                      <div className={tableStyles.actions}>
                        <button className={tableStyles.iconBtn} onClick={() => setViewing(item)} aria-label="View">
                          <Eye size={15} />
                        </button>
                        <button
                          className={`${tableStyles.iconBtn} ${tableStyles.iconBtnDanger}`}
                          onClick={() => setToDelete(item)}
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className={tableStyles.empty}>
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewing && (
        <Modal title="Enquiry details" onClose={() => setViewing(null)}>
          <div className={styles.detailGrid}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Name</span>
              <span className={styles.detailValue}>{viewing.fullName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{viewing.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone</span>
              <span className={styles.detailValue}>{viewing.phone}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Address</span>
              <span className={styles.detailValue}>{viewing.address || '—'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Package</span>
              <span className={styles.detailValue}>{viewing.package ? viewing.package.title : 'General enquiry'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Message</span>
              <span className={styles.detailValue}>{viewing.message}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Additional requirements</span>
              <span className={styles.detailValue}>{viewing.additionalRequirements || '—'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.detailValue}>
                <StatusBadge status={viewing.status} />
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Submitted</span>
              <span className={styles.detailValue}>{formatDate(viewing.createdAt)}</span>
            </div>
          </div>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete enquiry"
          message={`Delete the enquiry from "${toDelete.fullName}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
