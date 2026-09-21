import asyncHandler from '../utils/asyncHandler.js';
import validateCategory from '../utils/validateCategory.js';
import Video from '../models/Video.js';

// @desc    List videos (optionally filtered by category); public sees active only
// @route   GET /api/videos
// @access  Public / Private(admin, via ?all=true, sees inactive too)
export const getVideos = asyncHandler(async (req, res) => {
  const isAdminRequest = req.user?.role === 'admin' && req.query.all === 'true';
  const filter = isAdminRequest ? {} : { isActive: true };

  if (req.query.category && req.query.category !== 'all') {
    filter.category = req.query.category;
  }
  if (req.query.featured === 'true') {
    filter.isFeatured = true;
  }

  const data = await Video.find(filter).sort('-createdAt');
  res.json({ success: true, count: data.length, data });
});

// @desc    Add a video
// @route   POST /api/videos
// @access  Private/Admin
export const createVideo = asyncHandler(async (req, res) => {
  if (req.body.category) await validateCategory('gallery', req.body.category);
  const video = await Video.create(req.body);
  res.status(201).json({ success: true, data: video });
});

// @desc    Update a video's metadata
// @route   PUT /api/videos/:id
// @access  Private/Admin
export const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }

  if (req.body.category) await validateCategory('gallery', req.body.category);

  Object.assign(video, req.body);
  await video.save();

  res.json({ success: true, data: video });
});

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }

  await video.deleteOne();
  res.json({ success: true, data: {} });
});
