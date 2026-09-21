import mongoose from 'mongoose';
import slugify from 'slugify';

/**
 * Admin-managed taxonomy for destinations/packages/blogs/gallery. Replaces
 * the hard Mongoose `enum` constraints those models used to carry — a new
 * Category doc here immediately becomes a valid value for its `type`
 * (enforced in the relevant controllers via utils/validateCategory.js,
 * not at the schema level, so adding one never requires a deploy).
 */
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, index: true },
    type: {
      type: String,
      required: true,
      enum: ['destination', 'package', 'blog', 'gallery'],
    },
    description: { type: String },
    icon: { type: String, trim: true }, // optional lucide-react export name
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ type: 1, slug: 1 }, { unique: true });

categorySchema.pre('validate', async function generateSlug(next) {
  if (!this.isModified('name') && this.slug) return next();

  const base = slugify(this.name, { lower: true, strict: true });
  let candidate = base;
  let suffix = 1;

  const Model = this.constructor;
  while (await Model.exists({ type: this.type, slug: candidate, _id: { $ne: this._id } })) {
    candidate = `${base}-${suffix++}`;
  }

  this.slug = candidate;
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
