import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    // Validated against active Category(type: 'gallery') docs in the
    // controller rather than a hard schema enum — see models/Category.js.
    category: {
      type: String,
      required: true,
      trim: true,
    },
    location: { type: String },
    altText: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
