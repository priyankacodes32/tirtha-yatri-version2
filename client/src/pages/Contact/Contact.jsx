import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition.jsx';
import Button from '../../components/common/Button.jsx';
import { createEnquiry } from '../../api/enquiryApi.js';
import { useTheme } from '../../context/ThemeContext.jsx';
import styles from './Contact.module.css';

const EMPTY = { fullName: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { settings } = useTheme();
  const contact = settings?.contact || {};

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await createEnquiry({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        message: `Subject: ${form.subject}\n\n${form.message}`,
      });
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.response?.data?.message || 'Something went wrong — please try again.');
    }
  };

  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Contact Us</span>
          <h1>Let's Plan Your Journey</h1>
          <p>Questions about routes, permits or timing? Reach out — a real person will get back to you.</p>
        </div>
      </section>

      <section className={`container ${styles.layout}`}>
        <div className={styles.formCard}>
          {status === 'success' ? (
            <div className={styles.successState}>
              <CheckCircle2 size={44} className={styles.successIcon} />
              <h3>Message sent</h3>
              <p>Thanks for reaching out — we'll be in touch shortly.</p>
              <Button variant="outline" onClick={() => setStatus('idle')}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <label>
                  Full Name
                  <input name="fullName" required value={form.fullName} onChange={handleChange} />
                </label>
                <label>
                  Phone
                  <input name="phone" required value={form.phone} onChange={handleChange} />
                </label>
              </div>
              <div className={styles.row}>
                <label>
                  Email
                  <input type="email" name="email" required value={form.email} onChange={handleChange} />
                </label>
                <label>
                  Subject
                  <input name="subject" required value={form.subject} onChange={handleChange} />
                </label>
              </div>
              <label>
                Message
                <textarea name="message" rows={5} required value={form.message} onChange={handleChange} />
              </label>

              {status === 'error' && (
                <p className={styles.errorMsg}><AlertTriangle size={15} /> {errorMsg}</p>
              )}

              <Button type="submit" size="lg" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.infoCard}>
            {contact.email && (
              <div className={styles.infoRow}><Mail size={18} /> <a href={`mailto:${contact.email}`}>{contact.email}</a></div>
            )}
            {contact.phone && (
              <div className={styles.infoRow}><Phone size={18} /> <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a></div>
            )}
            {contact.address && (
              <div className={styles.infoRow}><MapPin size={18} /> <span>{contact.address}</span></div>
            )}
            {contact.hours && (
              <div className={styles.infoRow}><Clock size={18} /> <span>{contact.hours}</span></div>
            )}
          </div>

          <div className={styles.mapCard}>
            <iframe
              title="Pokhara, Nepal map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=83.90%2C28.15%2C83.99%2C28.24&layer=mapnik&marker=28.2096%2C83.9856"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
