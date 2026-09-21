import mongoose from 'mongoose';
import slugify from 'slugify';

const itineraryDaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const tourPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220,
    },
    description: {
      type: String,
      required: true,
    },
    // Validated against active Category(type: 'package') docs in the controller
    // rather than a hard schema enum, so admins can add new categories at runtime.
    category: {
      type: String,
      required: true,
      trim: true,
    },
    travelMode: {
      type: String,
      required: true,
      enum: ['jeep', 'bus', 'flight', 'helicopter', 'trekking', 'combination'],
    },
    duration: {
      type: String,
      required: true, // e.g. "4 Days / 3 Nights"
    },
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    maxElevation: { type: String },
    bestSeason: { type: String },
    groupType: { type: String },
    originalPrice: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'NPR' },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    highlights: [{ type: String }],
    itinerary: [itineraryDaySchema],
    includes: [{ type: String }],
    excludes: [{ type: String }],
    accommodationInfo: { type: String },
    travelInformation: { type: String },
    importantNotes: { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

tourPackageSchema.pre('validate', async function generateSlug(next) {
  if (!this.isModified('title')) return next();

  const base = slugify(this.title, { lower: true, strict: true });
  let candidate = base;
  let suffix = 1;

  const Model = this.constructor;
  // Ensure uniqueness even when two packages share a title.
  while (await Model.exists({ slug: candidate, _id: { $ne: this._id } })) {
    candidate = `${base}-${suffix++}`;
  }

  this.slug = candidate;
  next();
});

tourPackageSchema.index({ title: 'text', shortDescription: 'text' });

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);

export default TourPackage;
