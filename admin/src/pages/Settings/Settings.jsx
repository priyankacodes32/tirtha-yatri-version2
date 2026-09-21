import { useEffect, useState } from 'react';
import { Save, Info } from 'lucide-react';
import { getSettings, updateSettings } from '../../api/settings.js';
import { useToast, apiErrorMessage } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import Field from '../../components/common/Field.jsx';
import { Input, Textarea } from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import MediaUploadField from '../../components/common/MediaUploadField.jsx';
import { uploadImage } from '../../api/uploads.js';
import formStyles from '../../styles/form.module.css';
import styles from './Settings.module.css';

const THEME_FIELDS = [
  { key: 'primary', label: 'Primary (deep blue)' },
  { key: 'secondary', label: 'Secondary / Saffron accent' },
  { key: 'accent', label: 'Gold accent' },
  { key: 'base', label: 'Base (ivory)' },
];

const emptyForm = {
  siteName: '',
  tagline: '',
  theme: { primary: '#123B5D', secondary: '#E76F24', accent: '#E9B44C', base: '#F7F4EE' },
  hero: { image: '', eyebrow: '', heading: '', subheading: '' },
  contact: { email: '', phone: '', address: '', hours: '' },
  social: { facebook: '', instagram: '', youtube: '' },
};

export default function Settings() {
  const toast = useToast();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings()
      .then((res) => {
        if (res.success) {
          setForm({
            siteName: res.data.siteName || '',
            tagline: res.data.tagline || '',
            theme: { ...emptyForm.theme, ...res.data.theme },
            hero: { ...emptyForm.hero, ...res.data.hero },
            contact: { ...emptyForm.contact, ...res.data.contact },
            social: { ...emptyForm.social, ...res.data.social },
          });
        }
      })
      .catch((err) => toast.error(apiErrorMessage(err, 'Failed to load settings')))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setField(section, key, value) {
    setForm((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateSettings(form);
      if (res.success) {
        toast.success('Settings saved. The public site reflects this immediately.');
      } else {
        toast.error(res.message || 'Failed to save settings');
      }
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Failed to save settings'));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader label="Loading settings…" fullHeight />;

  return (
    <div>
      <PageHeader title="Site Settings" subtitle="Controls the public Tirtha Yatri site's branding, hero, contact and social links." />

      <form onSubmit={handleSubmit}>
        <section className={formStyles.section}>
          <h2 className={formStyles.sectionTitle}>General</h2>
          <div className={formStyles.grid}>
            <Field label="Site name">
              <Input value={form.siteName} onChange={(e) => setForm((f) => ({ ...f, siteName: e.target.value }))} />
            </Field>
            <Field label="Tagline" className={formStyles.full}>
              <Input value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
            </Field>
          </div>
        </section>

        <section className={formStyles.section}>
          <h2 className={formStyles.sectionTitle}>Theme</h2>
          <p className={formStyles.sectionNote}>
            <Info size={13} style={{ verticalAlign: '-2px', marginRight: 4 }} />
            Saved theme colors take effect on the public site automatically — no redeploy needed.
          </p>

          <div className={formStyles.grid}>
            {THEME_FIELDS.map(({ key, label }) => (
              <Field label={label} key={key}>
                <div className={formStyles.colorRow}>
                  <input
                    type="color"
                    className={formStyles.colorSwatch}
                    value={form.theme[key] || '#000000'}
                    onChange={(e) => setField('theme', key, e.target.value)}
                  />
                  <Input value={form.theme[key] || ''} onChange={(e) => setField('theme', key, e.target.value)} placeholder="#123B5D" />
                </div>
              </Field>
            ))}
          </div>

          <p className={styles.previewLabel}>Live preview</p>
          <div
            className={styles.preview}
            style={{
              background: form.theme.base,
              borderColor: form.theme.primary,
            }}
          >
            <h3 style={{ color: form.theme.primary, fontFamily: 'var(--font-heading)' }}>Journey to Muktinath</h3>
            <p style={{ color: form.theme.primary, opacity: 0.75, margin: '4px 0 12px' }}>
              A sample heading and button using your picked colors.
            </p>
            <button
              type="button"
              className={styles.previewBtn}
              style={{ background: form.theme.secondary, color: '#fff' }}
            >
              Sample Button
            </button>
            <span className={styles.previewGold} style={{ background: form.theme.accent }} />
          </div>
        </section>

        <section className={formStyles.section}>
          <h2 className={formStyles.sectionTitle}>Hero</h2>
          <div className={formStyles.grid}>
            <Field label="Hero Image" className={formStyles.full} hint="Upload a file, or paste/edit an image URL directly.">
              <MediaUploadField
                value={form.hero.image}
                onChange={(v) => setField('hero', 'image', v)}
                uploadFn={uploadImage}
                accept="image/jpeg,image/png,image/webp,image/gif"
                preview="image"
              />
            </Field>
            <Field label="Eyebrow">
              <Input value={form.hero.eyebrow} onChange={(e) => setField('hero', 'eyebrow', e.target.value)} />
            </Field>
            <Field label="Heading" className={formStyles.full}>
              <Textarea rows={2} value={form.hero.heading} onChange={(e) => setField('hero', 'heading', e.target.value)} />
            </Field>
            <Field label="Subheading" className={formStyles.full}>
              <Textarea rows={3} value={form.hero.subheading} onChange={(e) => setField('hero', 'subheading', e.target.value)} />
            </Field>
          </div>
        </section>

        <section className={formStyles.section}>
          <h2 className={formStyles.sectionTitle}>Contact</h2>
          <div className={formStyles.grid}>
            <Field label="Email">
              <Input type="email" value={form.contact.email} onChange={(e) => setField('contact', 'email', e.target.value)} />
            </Field>
            <Field label="Phone">
              <Input value={form.contact.phone} onChange={(e) => setField('contact', 'phone', e.target.value)} />
            </Field>
            <Field label="Address" className={formStyles.full}>
              <Input value={form.contact.address} onChange={(e) => setField('contact', 'address', e.target.value)} />
            </Field>
            <Field label="Hours" className={formStyles.full}>
              <Input value={form.contact.hours} onChange={(e) => setField('contact', 'hours', e.target.value)} />
            </Field>
          </div>
        </section>

        <section className={formStyles.section}>
          <h2 className={formStyles.sectionTitle}>Social</h2>
          <div className={formStyles.grid}>
            <Field label="Facebook URL">
              <Input value={form.social.facebook} onChange={(e) => setField('social', 'facebook', e.target.value)} />
            </Field>
            <Field label="Instagram URL">
              <Input value={form.social.instagram} onChange={(e) => setField('social', 'instagram', e.target.value)} />
            </Field>
            <Field label="YouTube URL">
              <Input value={form.social.youtube} onChange={(e) => setField('social', 'youtube', e.target.value)} />
            </Field>
          </div>
        </section>

        <div className={formStyles.actionsBar}>
          <Button type="submit" icon={Save} disabled={saving}>
            {saving ? 'Saving…' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
