import { List } from 'lucide-react';
import styles from './TableOfContents.module.css';

/** Only worth showing on longer articles — short posts don't need it. */
export default function TableOfContents({ headings }) {
  if (!headings || headings.length < 3) return null;

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <h2 className={styles.title}>
        <List size={16} /> In This Article
      </h2>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={h.level >= 3 ? styles.sub : ''}>
            <a href={`#${h.id}`} onClick={(e) => scrollTo(e, h.id)}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
