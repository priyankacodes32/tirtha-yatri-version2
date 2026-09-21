import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from './Input.jsx';
import Button from './Button.jsx';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import styles from './MediaUploadField.module.css';

/**
 * A URL text field paired with a real file-upload button. Uploading fills
 * the URL field automatically (via `uploadFn`, e.g. uploadImage/uploadVideo
 * from api/uploads.js); the field stays editable so a pasted URL can
 * override it afterwards. Optionally renders a live preview.
 */
export default function MediaUploadField({
  value,
  onChange,
  uploadFn,
  accept,
  placeholder = 'https://…',
  preview = 'image', // 'image' | 'video' | 'none'
}) {
  const toast = useToast();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      const res = await uploadFn(file, setProgress);
      if (res.success) {
        onChange(res.data.url);
        toast.success('Upload complete');
      } else {
        toast.error(res.message || 'Upload failed');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Upload failed'));
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        <Button type="button" variant="outline" size="sm" icon={Upload} disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? `Uploading… ${progress}%` : 'Upload'}
        </Button>
        <input ref={inputRef} type="file" accept={accept} hidden onChange={handleFile} />
      </div>
      {preview === 'image' && value && (
        <img className={styles.preview} src={value} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = '')} />
      )}
      {preview === 'video' && value && <video className={styles.videoPreview} src={value} controls />}
    </div>
  );
}
