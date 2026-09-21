import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Field from '../../components/common/Field.jsx';
import { Input, Textarea, Select, Checkbox } from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import RepeatableList from '../../components/common/RepeatableList.jsx';
import formStyles from '../../styles/form.module.css';

const blank = {
  name: '',
  category: '',
  shortDescription: '',
  description: '',
  coverImage: '',
  gallery: [],
  altitude: '',
  bestTimeToVisit: '',
  howToReach: '',
  thingsToDo: [],
  nearbyAttractions: [],
  isFeatured: false,
  isActive: true,
};

export default function DestinationForm({ initial, categories, onCancel, onSubmit, saving }) {
  const [form, setForm] = useState(() => (initial ? { ...blank, ...initial } : blank));

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      gallery: form.gallery.filter(Boolean),
      thingsToDo: form.thingsToDo.filter(Boolean),
      nearbyAttractions: form.nearbyAttractions.filter(Boolean),
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Basics</h2>
        <div className={formStyles.grid}>
          <Field label="Name" required className={formStyles.full}>
            <Input value={form.name} onChange={(e) => set('name', e.target.value)} required />
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
          <Field label="Altitude">
            <Input value={form.altitude} onChange={(e) => set('altitude', e.target.value)} placeholder="e.g. 3,710 m" />
          </Field>
          <Field label="Short Description" required className={formStyles.full} hint="Max 220 characters">
            <Textarea rows={2} maxLength={220} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} required />
          </Field>
          <Field label="Full Description" required className={formStyles.full}>
            <Textarea rows={5} value={form.description} onChange={(e) => set('description', e.target.value)} required />
          </Field>
        </div>
      </section>

      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Visiting Info</h2>
        <div className={formStyles.grid}>
          <Field label="Best Time to Visit">
            <Input value={form.bestTimeToVisit} onChange={(e) => set('bestTimeToVisit', e.target.value)} />
          </Field>
          <Field label="How to Reach" className={formStyles.full}>
            <Textarea rows={2} value={form.howToReach} onChange={(e) => set('howToReach', e.target.value)} />
          </Field>
        </div>
      </section>

      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Media</h2>
        <div className={formStyles.grid}>
          <Field label="Cover Image URL" required className={formStyles.full}>
            <Input value={form.coverImage} onChange={(e) => set('coverImage', e.target.value)} required />
          </Field>
          <Field label="Gallery Image URLs" className={formStyles.full}>
            <RepeatableList items={form.gallery} onChange={(v) => set('gallery', v)} placeholder="https://…" addLabel="Add image URL" />
          </Field>
        </div>
      </section>

      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Things to Do &amp; Nearby</h2>
        <div className={formStyles.grid}>
          <Field label="Things to Do">
            <RepeatableList items={form.thingsToDo} onChange={(v) => set('thingsToDo', v)} placeholder="Activity" addLabel="Add activity" />
          </Field>
          <Field label="Nearby Attractions">
            <RepeatableList
              items={form.nearbyAttractions}
              onChange={(v) => set('nearbyAttractions', v)}
              placeholder="Attraction"
              addLabel="Add attraction"
            />
          </Field>
        </div>
      </section>

      <section className={formStyles.section}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Checkbox label="Featured" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />
          <Checkbox label="Active" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} />
        </div>
      </section>

      <div className={formStyles.actionsBar}>
        <Button type="button" variant="outline" icon={X} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" icon={Save} disabled={saving}>
          {saving ? 'Saving…' : 'Save Destination'}
        </Button>
      </div>
    </form>
  );
}
