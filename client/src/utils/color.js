/**
 * Minimal hex color math — no dependency needed for the handful of
 * derived shades the theme system computes (hover/dark variants) from
 * the admin's base colors.
 */
const clamp = (n) => Math.min(255, Math.max(0, n));

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b].map((v) => clamp(Math.round(v)).toString(16).padStart(2, '0')).join('')}`;

/** Darkens a hex color by `amount` (0-1). */
export const darken = (hex, amount = 0.15) => {
  try {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex({ r: r * (1 - amount), g: g * (1 - amount), b: b * (1 - amount) });
  } catch {
    return hex;
  }
};

/** Lightens a hex color by `amount` (0-1), moving it toward white. */
export const lighten = (hex, amount = 0.15) => {
  try {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex({ r: r + (255 - r) * amount, g: g + (255 - g) * amount, b: b + (255 - b) * amount });
  } catch {
    return hex;
  }
};
