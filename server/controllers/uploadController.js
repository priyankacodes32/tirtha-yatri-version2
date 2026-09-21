import asyncHandler from '../utils/asyncHandler.js';

const buildPublicUrl = (req, subfolder, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/${subfolder}/${filename}`;

// @desc    Upload an image file, returns its public URL
// @route   POST /api/uploads/image  (multipart/form-data, field name "file")
// @access  Private/Admin
export const uploadImageFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded — attach it under the "file" field.');
  }

  res.status(201).json({
    success: true,
    data: { url: buildPublicUrl(req, 'images', req.file.filename) },
  });
});

// @desc    Upload a video file, returns its public URL
// @route   POST /api/uploads/video  (multipart/form-data, field name "file")
// @access  Private/Admin
export const uploadVideoFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded — attach it under the "file" field.');
  }

  res.status(201).json({
    success: true,
    data: { url: buildPublicUrl(req, 'videos', req.file.filename) },
  });
});
