import asyncHandler from '../utils/asyncHandler.js';
import Feature from '../models/Feature.js';

// @desc    List features — public sees active only, admin sees all via ?all=true
// @route   GET /api/features
// @access  Public / Private(admin)
export const getFeatures = asyncHandler(async (req, res) => {
  const isAdminRequest = req.user?.role === 'admin' && req.query.all === 'true';
  const filter = isAdminRequest ? {} : { isActive: true };

  const data = await Feature.find(filter).sort('order');
  res.json({ success: true, count: data.length, data });
});

// @desc    Create a feature card
// @route   POST /api/features
// @access  Private/Admin
export const createFeature = asyncHandler(async (req, res) => {
  const feature = await Feature.create(req.body);
  res.status(201).json({ success: true, data: feature });
});

// @desc    Update a feature card
// @route   PUT /api/features/:id
// @access  Private/Admin
export const updateFeature = asyncHandler(async (req, res) => {
  const feature = await Feature.findById(req.params.id);

  if (!feature) {
    res.status(404);
    throw new Error('Feature not found');
  }

  Object.assign(feature, req.body);
  await feature.save();

  res.json({ success: true, data: feature });
});

// @desc    Delete a feature card
// @route   DELETE /api/features/:id
// @access  Private/Admin
export const deleteFeature = asyncHandler(async (req, res) => {
  const feature = await Feature.findById(req.params.id);

  if (!feature) {
    res.status(404);
    throw new Error('Feature not found');
  }

  await feature.deleteOne();
  res.json({ success: true, data: {} });
});
