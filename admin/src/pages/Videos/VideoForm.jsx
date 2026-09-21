import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Field from '../../components/common/Field.jsx';
import { Input, Textarea, Select, Checkbox } from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import MediaUploadField from '../../components/common/MediaUploadField.jsx';
import { uploadImage, uploadVideo } from '../../api/uploads.js';

const blank = {
  title: '',
  description: '',
  videoUrl: '',
  thumbnail: '',
  category: '',
  isFeatured: false,
  isActive: true,
};

export default function VideoForm({ initial, categories, onCancel, onSubmit, saving }) {
  const [form, setForm] = useState(() => (initial ? { ...blank, ...initial, category: initial.category || '' } : blank));
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, category: form.category || undefined };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Field label="Title" required>
        <Input value={form.title} onChange={(e) => set('title', e.target.value)} required />
      </Field>

      <Field label="Description">
        <Textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
      </Field>

      <Field label="Video" required hint="Upload a video file, or paste an external URL (YouTube, Vimeo, CDN, etc.).">
        <MediaUploadField
          value={form.videoUrl}
          onChange={(v) => set('videoUrl', v)}
          uploadFn={uploadVideo}
          accept="video/mp4,video/webm,video/quicktime"
          preview="none"
        />
      </Field>

      <Field label="Thumbnail" hint="Optional — shown before playback. Upload an image or paste a URL.">
        <MediaUploadField
          value={form.thumbnail}
          onChange={(v) => set('thumbnail', v)}
          uploadFn={uploadImage}
          accept="image/jpeg,image/png,image/webp,image/gif"
          preview="image"
        />
      </Field>

      <Field label="Category" hint="Optional — shares the same categories as Gallery photos.">
        <Select value={form.category} onChange={(e) => set('category', e.target.value)}>
          <option value="">Uncategorized</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </Field>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Checkbox label="Featured" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />
        <Checkbox label="Active" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        <Button type="button" variant="outline" icon={X} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" icon={Save} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
