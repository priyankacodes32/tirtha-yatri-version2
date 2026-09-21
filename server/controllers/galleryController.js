import asyncHandler from '../utils/asyncHandler.js';
import validateCategory from '../utils/validateCategory.js';
import Gallery from '../models/Gallery.js';

// @desc    List gallery images (optionally filtered by category)
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category && req.query.category !== 'all') {
    filter.category = req.query.category;
  }
  if (req.query.featured === 'true') {
    filter.isFeatured = true;
  }

  const data = await Gallery.find(filter).sort('-createdAt');
  res.json({ success: true, count: data.length, data });
});

// @desc    Add a gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryImage = asyncHandler(async (req, res) => {
  await validateCategory('gallery', req.body.category);
  const image = await Gallery.create(req.body);
  res.status(201).json({ success: true, data: image });
});

// @desc    Update a gallery image's metadata
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    res.status(404);
    throw new Error('Gallery image not found');
  }

  if (req.body.category) await validateCategory('gallery', req.body.category);

  Object.assign(image, req.body);
  await image.save();

  res.json({ success: true, data: image });
});

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    res.status(404);
    throw new Error('Gallery image not found');
  }

  await image.deleteOne();
  res.json({ success: true, data: {} });
});
