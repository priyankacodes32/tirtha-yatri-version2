import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext.jsx';
import { createEnquiry } from '../../api/enquiryApi.js';
import Button from '../common/Button.jsx';
import styles from './EnquiryModal.module.css';

const EMPTY_FORM = { fullName: '', email: '', phone: '', message: '', additionalRequirements: '' };

export default function EnquiryModal() {
  const { isOpen, prefill, closeEnquiry } = useEnquiryModal();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm({
        ...EMPTY_FORM,
        message: prefill?.package ? `I'm interested in "${prefill.package.title}".` : '',
      });
      setStatus('idle');
      setErrorMsg('');
    }
  }, [isOpen, prefill]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => e.key === 'Escape' && closeEnquiry();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeEnquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await createEnquiry({
        ...form,
        package: prefill?.package?._id || undefined,
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.response?.data?.message || 'Something went wrong — please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeEnquiry}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className={styles.close} aria-label="Close" onClick={closeEnquiry}>
              <X size={20} />
            </button>

            {status === 'success' ? (
              <div className={styles.successState}>
                <CheckCircle2 size={44} className={styles.successIcon} />
                <h3 id="enquiry-modal-title">Enquiry sent</h3>
                <p>Thanks — our team will get back to you shortly.</p>
                <Button variant="outline" onClick={closeEnquiry}>Close</Button>
              </div>
            ) : (
              <>
                <h3 id="enquiry-modal-title" className={styles.title}>
                  {prefill?.package ? `Enquire about ${prefill.package.title}` : 'Send an Enquiry'}
                </h3>
                <p className={styles.subtitle}>Tell us a little about your trip and we'll follow up shortly.</p>

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
                  <label>
                    Email
                    <input type="email" name="email" required value={form.email} onChange={handleChange} />
                  </label>
                  <label>
                    Message
                    <textarea name="message" rows={3} required value={form.message} onChange={handleChange} />
                  </label>
                  <label>
                    Additional Requirements <span className={styles.optional}>(optional)</span>
                    <textarea name="additionalRequirements" rows={2} value={form.additionalRequirements} onChange={handleChange} />
                  </label>

                  {status === 'error' && (
                    <p className={styles.errorMsg}><AlertTriangle size={15} /> {errorMsg}</p>
                  )}

                  <Button type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
