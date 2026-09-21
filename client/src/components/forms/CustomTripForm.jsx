import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import Button from '../common/Button.jsx';
import { createEnquiry } from '../../api/enquiryApi.js';
import styles from './CustomTripForm.module.css';

const DESTINATIONS = ['Muktinath', 'Lower Mustang', 'Upper Mustang', 'Custom'];
const PREFERENCES = ['Jeep', 'Bus', 'Flight', 'Helicopter', 'Trekking', 'Combination'];
const BUDGETS = ['Under NPR 30,000', 'NPR 30,000 – 60,000', 'NPR 60,000 – 1,00,000', 'Above NPR 1,00,000'];

const STEPS = ['Destination', 'Preferences', 'Dates & Duration', 'Travellers', 'Budget', 'Details'];

const INITIAL = {
  destination: '',
  preference: '',
  travelDate: '',
  duration: '',
  travellers: '',
  budget: '',
  specialRequirements: '',
  fullName: '',
  email: '',
  phone: '',
};

export default function CustomTripForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field) => (value) => setData((prev) => ({ ...prev, [field]: value }));
  const onInput = (field) => (e) => set(field)(e.target.value);

  const canProceed = () => {
    switch (step) {
      case 0: return !!data.destination;
      case 1: return !!data.preference;
      case 2: return !!data.travelDate && !!data.duration;
      case 3: return !!data.travellers;
      case 4: return !!data.budget;
      default: return true;
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.email || !data.phone) return;

    setStatus('submitting');
    setErrorMsg('');

    const message = [
      `Destination: ${data.destination}`,
      `Preference: ${data.preference}`,
      `Preferred date: ${data.travelDate}`,
      `Duration: ${data.duration}`,
      `Travellers: ${data.travellers}`,
      `Budget: ${data.budget}`,
    ].join('\n');

    try {
      await createEnquiry({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message,
        additionalRequirements: data.specialRequirements,
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.response?.data?.message || 'Something went wrong — please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successState}>
        <CheckCircle2 size={52} className={styles.successIcon} />
        <h3>Your custom trip request is in</h3>
        <p>Our travel experts will reach out with a tailored itinerary shortly.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <ol className={styles.progress}>
        {STEPS.map((label, i) => (
          <li key={label} className={i <= step ? styles.progressDone : ''}>
            <span className={styles.progressDot}>{i < step ? <Check size={12} /> : i + 1}</span>
            <span className={styles.progressLabel}>{label}</span>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit} className={styles.form}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <StepChoices label="Where would you like to go?" options={DESTINATIONS} value={data.destination} onChange={set('destination')} />
            )}
            {step === 1 && (
              <StepChoices label="How would you like to travel?" options={PREFERENCES} value={data.preference} onChange={set('preference')} />
            )}
            {step === 2 && (
              <div className={styles.fieldGrid}>
                <label>
                  Preferred travel date
                  <input type="date" required value={data.travelDate} onChange={onInput('travelDate')} />
                </label>
                <label>
                  Duration
                  <input type="text" placeholder="e.g. 5 Days" required value={data.duration} onChange={onInput('duration')} />
                </label>
              </div>
            )}
            {step === 3 && (
              <label className={styles.singleField}>
                Number of travellers
                <input type="number" min="1" required value={data.travellers} onChange={onInput('travellers')} />
              </label>
            )}
            {step === 4 && (
              <StepChoices label="What's your approximate budget?" options={BUDGETS} value={data.budget} onChange={set('budget')} />
            )}
            {step === 5 && (
              <div className={styles.fieldGrid}>
                <label className={styles.spanAll}>
                  Special requirements <span className={styles.optional}>(optional)</span>
                  <textarea rows={3} value={data.specialRequirements} onChange={onInput('specialRequirements')} />
                </label>
                <label>
                  Full Name
                  <input required value={data.fullName} onChange={onInput('fullName')} />
                </label>
                <label>
                  Phone
                  <input required value={data.phone} onChange={onInput('phone')} />
                </label>
                <label className={styles.spanAll}>
                  Email
                  <input type="email" required value={data.email} onChange={onInput('email')} />
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {status === 'error' && (
          <p className={styles.errorMsg}><AlertTriangle size={15} /> {errorMsg}</p>
        )}

        <div className={styles.nav}>
          <Button type="button" variant="outline" onClick={back} disabled={step === 0} icon={ChevronLeft} iconPosition="left">
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next} disabled={!canProceed()} icon={ChevronRight}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : 'Submit Request'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepChoices({ label, options, value, onChange }) {
  return (
    <fieldset className={styles.choices}>
      <legend>{label}</legend>
      <div className={styles.choiceGrid}>
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            className={`${styles.choice} ${value === opt ? styles.choiceActive : ''}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
