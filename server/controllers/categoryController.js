import asyncHandler from '../utils/asyncHandler.js';
import Category from '../models/Category.js';

const VALID_TYPES = ['destination', 'package', 'blog', 'gallery'];

// @desc    List categories, optionally filtered by type
// @route   GET /api/categories?type=destination
// @access  Public (active only) / Private(admin, via ?all=true, sees inactive too)
export const getCategories = asyncHandler(async (req, res) => {
  const isAdminRequest = req.user?.role === 'admin' && req.query.all === 'true';
  const filter = isAdminRequest ? {} : { isActive: true };

  if (req.query.type) {
    if (!VALID_TYPES.includes(req.query.type)) {
      res.status(400);
      throw new Error(`type must be one of: ${VALID_TYPES.join(', ')}`);
    }
    filter.type = req.query.type;
  }

  const data = await Category.find(filter).sort('type order name');
  res.json({ success: true, count: data.length, data });
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  Object.assign(category, req.body);
  await category.save();

  res.json({ success: true, data: category });
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  await category.deleteOne();
  res.json({ success: true, data: {} });
});
