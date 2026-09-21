/**
 * Minimal Markdown -> React renderer for blog article content.
 *
 * Deliberately NOT a full CommonMark implementation and NOT a dependency —
 * the admin blog form only promises a small, specific syntax (see its
 * hint text), and this renderer covers exactly that:
 *   # / ## / ###   headings
 *   blank-line-separated paragraphs
 *   - item          unordered list
 *   1. item         ordered list
 *   > quote         blockquote
 *   ![alt](url "caption")   image, caption optional
 *   [text](url)     inline link
 *   **bold** / *italic*
 *
 * Renders to real React elements (never dangerouslySetInnerHTML), so
 * there's no HTML-injection surface from admin-entered content.
 */

const INLINE_RE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

function parseInline(text) {
  const nodes = [];
  let lastIndex = 0;
  let key = 0;
  let match;

  INLINE_RE.lastIndex = 0;
  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <a key={key++} href={match[2]} target="_blank" rel="noreferrer">
          {match[1]}
        </a>
      );
    } else if (match[3] !== undefined) {
      nodes.push(<strong key={key++}>{match[3]}</strong>);
    } else if (match[4] !== undefined) {
      nodes.push(<em key={key++}>{match[4]}</em>);
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
}

const IMAGE_RE = /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/;
const ORDERED_RE = /^\d+\.\s+(.*)$/;

/**
 * Parses markdown into an array of { type, ...} block descriptors, then
 * a second pass renders those to React elements. Also returns the
 * extracted headings (for a table of contents).
 */
export function parseBlog(content = '') {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  const headings = [];
  let i = 0;

  const pushParagraph = (buffer) => {
    if (buffer.length) blocks.push({ type: 'p', text: buffer.join(' ') });
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(line);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = `heading-${headings.length}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      headings.push({ id, text, level });
      blocks.push({ type: 'heading', level, text, id });
      i++;
      continue;
    }

    const imageMatch = IMAGE_RE.exec(line.trim());
    if (imageMatch) {
      blocks.push({ type: 'image', alt: imageMatch[1], src: imageMatch[2], caption: imageMatch[3] });
      i++;
      continue;
    }

    if (line.trim().startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') });
      continue;
    }

    if (line.trim().startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (ORDERED_RE.test(line.trim())) {
      const items = [];
      while (i < lines.length && ORDERED_RE.test(lines[i].trim())) {
        items.push(ORDERED_RE.exec(lines[i].trim())[1]);
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraph: gather consecutive non-blank, non-block-starting lines.
    const buffer = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !IMAGE_RE.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('> ') &&
      !lines[i].trim().startsWith('- ') &&
      !ORDERED_RE.test(lines[i].trim())
    ) {
      buffer.push(lines[i].trim());
      i++;
    }
    pushParagraph(buffer);
  }

  return { blocks, headings };
}

/** Renders parsed blocks to React elements. */
export function renderBlocks(blocks) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'heading': {
        const Tag = `h${Math.min(block.level + 1, 4)}`; // article h1 is the page title, so start at h2
        return (
          <Tag key={i} id={block.id}>
            {parseInline(block.text)}
          </Tag>
        );
      }
      case 'p':
        return <p key={i}>{parseInline(block.text)}</p>;
      case 'quote':
        return <blockquote key={i}>{parseInline(block.text)}</blockquote>;
      case 'ul':
        return (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{parseInline(item)}</li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{parseInline(item)}</li>
            ))}
          </ol>
        );
      case 'image':
        return (
          <figure key={i}>
            <img src={block.src} alt={block.alt} loading="lazy" />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        );
      default:
        return null;
    }
  });
}
