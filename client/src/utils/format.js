export const formatPrice = (amount, currency = 'NPR') => {
  if (amount === undefined || amount === null) return '';
  return `${currency} ${Number(amount).toLocaleString('en-IN')}`;
};

export const formatDate = (value, options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', options);
};

export const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.slice(1);

/** Turns 'lo-manthang' / 'travel-tips' style category slugs into readable labels. */
export const humanizeSlug = (slug = '') =>
  slug
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
