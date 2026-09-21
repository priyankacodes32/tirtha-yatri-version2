import mongoose from 'mongoose';

/**
 * Singleton document — there is only ever one SiteSettings row. Holds the
 * site-wide theme (propagated to the public site via CSS custom properties)
 * plus hero/contact/social content the admin can edit without a deploy.
 */
const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Tirtha Yatri' },
    tagline: { type: String, default: 'Journey to Muktinath. Discover the Soul of Mustang.' },
    theme: {
      primary: { type: String, default: '#123B5D' }, // Himalayan Deep Blue — 30%
      secondary: { type: String, default: '#E76F24' }, // Mustang Saffron — 10%, the accent/CTA color
      accent: { type: String, default: '#E9B44C' }, // Prayer Flag Gold — sparing highlight
      base: { type: String, default: '#F7F4EE' }, // Himalayan Ivory — 60%
    },
    hero: {
      image: { type: String, default: '' },
      eyebrow: { type: String, default: "Discover Nepal's Sacred Himalayas" },
      heading: { type: String, default: 'Journey to Muktinath.\nDiscover the Soul of Mustang.' },
      subheading: {
        type: String,
        default:
          "A pilgrimage through 108 sacred water spouts, a passage through ancient walled kingdoms, and a Himalayan landscape unlike anywhere else on earth.",
      },
    },
    contact: {
      email: { type: String, default: 'hello@tirthayatri.com' },
      phone: { type: String, default: '+977 980-0000000' },
      address: { type: String, default: 'Lakeside, Pokhara, Nepal' },
      hours: { type: String, default: 'Sun–Fri, 9:00 AM – 6:00 PM (NPT)' },
    },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;
