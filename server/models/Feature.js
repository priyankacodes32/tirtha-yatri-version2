import mongoose from 'mongoose';

/**
 * A "Why Travel With Us" card. `icon` stores a lucide-react export name
 * (e.g. "Compass") — the client looks it up in a small icon map at render
 * time, so the admin can pick from a fixed icon list without shipping code.
 */
const featureSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Feature = mongoose.model('Feature', featureSchema);

export default Feature;
