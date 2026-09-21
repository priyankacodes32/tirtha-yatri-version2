import mongoose from 'mongoose';
import slugify from 'slugify';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    // Validated against active Category(type: 'destination') docs in the
    // controller rather than a hard schema enum — see models/Category.js.
    category: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 220,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    altitude: { type: String },
    bestTimeToVisit: { type: String },
    howToReach: { type: String },
    thingsToDo: [{ type: String }],
    nearbyAttractions: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

destinationSchema.pre('validate', async function generateSlug(next) {
  if (!this.isModified('name')) return next();

  const base = slugify(this.name, { lower: true, strict: true });
  let candidate = base;
  let suffix = 1;

  const Model = this.constructor;
  while (await Model.exists({ slug: candidate, _id: { $ne: this._id } })) {
    candidate = `${base}-${suffix++}`;
  }

  this.slug = candidate;
  next();
});

destinationSchema.index({ name: 'text', shortDescription: 'text' });

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
