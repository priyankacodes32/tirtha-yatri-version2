import Category from '../models/Category.js';

/**
 * Confirms `value` is an active Category of the given `type` before a
 * package/destination/blog/gallery doc is created or updated. Throws a
 * plain Error with a 400-friendly message on failure — callers should
 * res.status(400) before calling this, or let errorMiddleware format it.
 */
const validateCategory = async (type, value) => {
  if (!value) return; // let the model's own `required` validator handle emptiness

  const exists = await Category.exists({ type, slug: value, isActive: true });
  if (!exists) {
    const error = new Error(
      `"${value}" is not a valid ${type} category. Add it under Categories in the admin dashboard first, or choose an existing one.`
    );
    error.statusCode = 400;
    throw error;
  }
};

export default validateCategory;
