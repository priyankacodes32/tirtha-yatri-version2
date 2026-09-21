import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Field from '../../components/common/Field.jsx';
import { Input, Select, Checkbox } from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import MediaUploadField from '../../components/common/MediaUploadField.jsx';
import { uploadImage } from '../../api/uploads.js';

const blank = {
  title: '',
  image: '',
  category: '',
  location: '',
  altText: '',
  isFeatured: false,
};

export default function GalleryForm({ initial, categories, onCancel, onSubmit, saving }) {
  const [form, setForm] = useState(() => (initial ? { ...blank, ...initial } : blank));
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...form });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Field label="Title" required>
        <Input value={form.title} onChange={(e) => set('title', e.target.value)} required />
      </Field>

      <Field label="Image" required hint="Upload a file, or paste/edit an image URL directly.">
        <MediaUploadField
          value={form.image}
          onChange={(v) => set('image', v)}
          uploadFn={uploadImage}
          accept="image/jpeg,image/png,image/webp,image/gif"
          preview="image"
        />
      </Field>

      <Field label="Category" required>
        <Select value={form.category} onChange={(e) => set('category', e.target.value)} required>
          <option value="">Select category…</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Location" hint="Optional — e.g. where the photo was taken">
        <Input value={form.location} onChange={(e) => set('location', e.target.value)} />
      </Field>

      <Field label="Alt Text" required hint="Describes the image for screen readers and search engines — required for accessibility and SEO.">
        <Input value={form.altText} onChange={(e) => set('altText', e.target.value)} required />
      </Field>

      <Checkbox label="Featured" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />

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
