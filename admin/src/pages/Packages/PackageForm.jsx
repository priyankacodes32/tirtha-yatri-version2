import { useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';
import Field from '../../components/common/Field.jsx';
import { Input, Textarea, Select, Checkbox } from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import RepeatableList from '../../components/common/RepeatableList.jsx';
import { TRAVEL_MODES } from '../../utils/icons.js';
import formStyles from '../../styles/form.module.css';

const blank = {
  title: '',
  shortDescription: '',
  description: '',
  category: '',
  travelMode: 'jeep',
  duration: '',
  startPoint: '',
  endPoint: '',
  maxElevation: '',
  bestSeason: '',
  groupType: '',
  originalPrice: '',
  discountedPrice: '',
  currency: 'NPR',
  coverImage: '',
  gallery: [],
  highlights: [],
  itinerary: [],
  includes: [],
  excludes: [],
  accommodationInfo: '',
  travelInformation: '',
  importantNotes: '',
  isFeatured: false,
  isActive: true,
};

export default function PackageForm({ initial, categories, onCancel, onSubmit, saving }) {
  const [form, setForm] = useState(() => (initial ? { ...blank, ...initial } : blank));

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function addItineraryDay() {
    set('itinerary', [...form.itinerary, { day: form.itinerary.length + 1, title: '', description: '' }]);
  }
  function updateItineraryDay(i, key, value) {
    const next = [...form.itinerary];
    next[i] = { ...next[i], [key]: value };
    set('itinerary', next);
  }
  function removeItineraryDay(i) {
    set(
      'itinerary',
      form.itinerary.filter((_, idx) => idx !== i)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      originalPrice: Number(form.originalPrice) || 0,
      discountedPrice: Number(form.discountedPrice) || 0,
      gallery: form.gallery.filter(Boolean),
      highlights: form.highlights.filter(Boolean),
      includes: form.includes.filter(Boolean),
      excludes: form.excludes.filter(Boolean),
      itinerary: form.itinerary
        .filter((d) => d.title || d.description)
        .map((d, i) => ({ ...d, day: Number(d.day) || i + 1 })),
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Basics</h2>
        <div className={formStyles.grid}>
          <Field label="Title" required className={formStyles.full}>
            <Input value={form.title} onChange={(e) => set('title', e.target.value)} required />
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
          <Field label="Travel Mode" required>
            <Select value={form.travelMode} onChange={(e) => set('travelMode', e.target.value)} required>
              {TRAVEL_MODES.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </Select>
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
        <h2 className={formStyles.sectionTitle}>Route &amp; Duration</h2>
        <div className={formStyles.grid}>
          <Field label="Duration" required hint="e.g. 4 Days / 3 Nights">
            <Input value={form.duration} onChange={(e) => set('duration', e.target.value)} required />
          </Field>
          <Field label="Start Point" required>
            <Input value={form.startPoint} onChange={(e) => set('startPoint', e.target.value)} required />
          </Field>
          <Field label="End Point" required>
            <Input value={form.endPoint} onChange={(e) => set('endPoint', e.target.value)} required />
          </Field>
          <Field label="Max Elevation">
            <Input value={form.maxElevation} onChange={(e) => set('maxElevation', e.target.value)} />
          </Field>
          <Field label="Best Season">
            <Input value={form.bestSeason} onChange={(e) => set('bestSeason', e.target.value)} />
          </Field>
          <Field label="Group Type">
            <Input value={form.groupType} onChange={(e) => set('groupType', e.target.value)} />
          </Field>
        </div>
      </section>

      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Pricing</h2>
        <div className={formStyles.grid}>
          <Field label="Original Price" required>
            <Input type="number" min="0" value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)} required />
          </Field>
          <Field label="Discounted Price" required>
            <Input type="number" min="0" value={form.discountedPrice} onChange={(e) => set('discountedPrice', e.target.value)} required />
          </Field>
          <Field label="Currency">
            <Input value={form.currency} onChange={(e) => set('currency', e.target.value)} />
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
        <h2 className={formStyles.sectionTitle}>Highlights, Includes &amp; Excludes</h2>
        <div className={formStyles.grid}>
          <Field label="Highlights">
            <RepeatableList items={form.highlights} onChange={(v) => set('highlights', v)} placeholder="Highlight" addLabel="Add highlight" />
          </Field>
          <Field label="Includes">
            <RepeatableList items={form.includes} onChange={(v) => set('includes', v)} placeholder="Included item" addLabel="Add item" />
          </Field>
          <Field label="Excludes">
            <RepeatableList items={form.excludes} onChange={(v) => set('excludes', v)} placeholder="Excluded item" addLabel="Add item" />
          </Field>
        </div>
      </section>

      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Itinerary</h2>
        {form.itinerary.map((day, i) => (
          <div className={formStyles.dayGroup} key={i}>
            <div className={formStyles.dayGroupHead}>
              <span className={formStyles.dayLabel}>Day {i + 1}</span>
              <button type="button" className={formStyles.removeBtn} onClick={() => removeItineraryDay(i)} aria-label="Remove day">
                <Trash2 size={15} />
              </button>
            </div>
            <div className={formStyles.grid2}>
              <Field label="Day number">
                <Input type="number" min="1" value={day.day} onChange={(e) => updateItineraryDay(i, 'day', e.target.value)} />
              </Field>
              <Field label="Title">
                <Input value={day.title} onChange={(e) => updateItineraryDay(i, 'title', e.target.value)} />
              </Field>
            </div>
            <Field label="Description">
              <Textarea rows={2} value={day.description} onChange={(e) => updateItineraryDay(i, 'description', e.target.value)} />
            </Field>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" icon={Plus} onClick={addItineraryDay}>
          Add Day
        </Button>
      </section>

      <section className={formStyles.section}>
        <h2 className={formStyles.sectionTitle}>Additional Info</h2>
        <div className={formStyles.grid}>
          <Field label="Accommodation Info" className={formStyles.full}>
            <Textarea rows={2} value={form.accommodationInfo} onChange={(e) => set('accommodationInfo', e.target.value)} />
          </Field>
          <Field label="Travel Information" className={formStyles.full}>
            <Textarea rows={2} value={form.travelInformation} onChange={(e) => set('travelInformation', e.target.value)} />
          </Field>
          <Field label="Important Notes" className={formStyles.full}>
            <Textarea rows={2} value={form.importantNotes} onChange={(e) => set('importantNotes', e.target.value)} />
          </Field>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          <Checkbox label="Featured" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />
          <Checkbox label="Active" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} />
        </div>
      </section>

      <div className={formStyles.actionsBar}>
        <Button type="button" variant="outline" icon={X} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" icon={Save} disabled={saving}>
          {saving ? 'Saving…' : 'Save Package'}
        </Button>
      </div>
    </form>
  );
}
