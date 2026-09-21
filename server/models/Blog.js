import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 280,
    },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    // Validated against active Category(type: 'blog') docs in the controller
    // rather than a hard schema enum — see models/Category.js.
    category: {
      type: String,
      required: true,
      trim: true,
    },
    author: { type: String, default: 'Tirtha Yatri Team' },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

blogSchema.pre('validate', async function generateSlug(next) {
  if (!this.isModified('title')) return next();

  const base = slugify(this.title, { lower: true, strict: true });
  let candidate = base;
  let suffix = 1;

  const Model = this.constructor;
  while (await Model.exists({ slug: candidate, _id: { $ne: this._id } })) {
    candidate = `${base}-${suffix++}`;
  }

  this.slug = candidate;
  next();
});

blogSchema.pre('save', function setPublishedAt(next) {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
