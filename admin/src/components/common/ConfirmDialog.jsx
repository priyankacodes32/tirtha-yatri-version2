import Modal from './Modal.jsx';
import Button from './Button.jsx';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({ title = 'Are you sure?', message, confirmLabel = 'Delete', onConfirm, onCancel, busy }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button variant="outline" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={busy}>
          {busy ? 'Working…' : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
