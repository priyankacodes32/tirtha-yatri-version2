import asyncHandler from '../utils/asyncHandler.js';
import ApiFeatures from '../utils/apiFeatures.js';
import validateCategory from '../utils/validateCategory.js';
import Destination from '../models/Destination.js';

// @desc    List destinations (filter/search/paginate)
// @route   GET /api/destinations
// @access  Public
export const getDestinations = asyncHandler(async (req, res) => {
  const baseFilter = req.query.includeInactive === 'true' ? {} : { isActive: true };
  const baseQuery = Destination.find(baseFilter);

  const features = new ApiFeatures(baseQuery, req.query, baseFilter)
    .filter(['category'])
    .search(['name', 'shortDescription'])
    .sort('-createdAt')
    .paginate();

  const [data, count] = await Promise.all([
    features.query,
    features.countDocuments(Destination),
  ]);

  res.json({
    success: true,
    count,
    page: features.page,
    pages: Math.ceil(count / features.limit) || 1,
    data,
  });
});

// @desc    Get featured destinations
// @route   GET /api/destinations/featured
// @access  Public
export const getFeaturedDestinations = asyncHandler(async (req, res) => {
  const data = await Destination.find({ isFeatured: true, isActive: true }).sort('-createdAt').limit(10);
  res.json({ success: true, count: data.length, data });
});

// @desc    Get a single destination by slug
// @route   GET /api/destinations/:slug
// @access  Public
export const getDestinationBySlug = asyncHandler(async (req, res) => {
  const destination = await Destination.findOne({ slug: req.params.slug });

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  res.json({ success: true, data: destination });
});

// @desc    Create a destination
// @route   POST /api/destinations
// @access  Private/Admin
export const createDestination = asyncHandler(async (req, res) => {
  await validateCategory('destination', req.body.category);
  const destination = await Destination.create(req.body);
  res.status(201).json({ success: true, data: destination });
});

// @desc    Update a destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
export const updateDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  if (req.body.category) await validateCategory('destination', req.body.category);

  Object.assign(destination, req.body);
  await destination.save();

  res.json({ success: true, data: destination });
});

// @desc    Delete a destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
export const deleteDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  await destination.deleteOne();
  res.json({ success: true, data: {} });
});
