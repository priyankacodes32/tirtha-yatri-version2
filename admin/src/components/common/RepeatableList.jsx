import { Plus, Trash2 } from 'lucide-react';
import { Input } from './Input.jsx';
import Button from './Button.jsx';
import styles from './RepeatableList.module.css';

/**
 * Repeatable single-string rows, for array-of-string fields like
 * highlights / includes / excludes / gallery URLs.
 */
export default function RepeatableList({ items, onChange, placeholder = 'Value', addLabel = 'Add row' }) {
  const update = (i, value) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, '']);

  return (
    <div className={styles.wrap}>
      {items.map((val, i) => (
        <div className={styles.row} key={i}>
          <Input value={val} placeholder={placeholder} onChange={(e) => update(i, e.target.value)} />
          <button type="button" className={styles.removeBtn} onClick={() => remove(i)} aria-label="Remove row">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" icon={Plus} onClick={add}>
        {addLabel}
      </Button>
    </div>
  );
}
