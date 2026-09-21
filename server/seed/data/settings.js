import { img } from './images.js';

/**
 * The single SiteSettings document. Theme colors match the 60/30/10
 * Himalaya palette the client's tokens.css ships as static defaults —
 * seeding the same values means nothing visually changes until an admin
 * actually edits them.
 */
const settings = {
  siteName: 'Tirtha Yatri',
  tagline: 'Journey to Muktinath. Discover the Soul of Mustang.',
  theme: {
    primary: '#123B5D', // Himalayan Deep Blue — 30%
    secondary: '#E76F24', // Mustang Saffron — 10% accent/CTA
    accent: '#E9B44C', // Prayer Flag Gold
    base: '#F7F4EE', // Himalayan Ivory — 60%
  },
  hero: {
    image: img('muktinathShrineFlags', 2200),
    eyebrow: "Discover Nepal's Sacred Himalayas",
    heading: 'Journey to Muktinath.\nDiscover the Soul of Mustang.',
    subheading:
      "A pilgrimage through 108 sacred water spouts, a passage through ancient walled kingdoms, and a Himalayan landscape unlike anywhere else on earth — planned by people who know this valley well.",
  },
  contact: {
    email: 'hello@tirthayatri.com',
    phone: '+977 980-0000000',
    address: 'Lakeside, Pokhara, Nepal',
    hours: 'Sun–Fri, 9:00 AM – 6:00 PM (NPT)',
  },
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },
};

export default settings;
