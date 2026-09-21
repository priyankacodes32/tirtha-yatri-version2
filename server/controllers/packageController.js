import asyncHandler from '../utils/asyncHandler.js';
import ApiFeatures from '../utils/apiFeatures.js';
import validateCategory from '../utils/validateCategory.js';
import TourPackage from '../models/TourPackage.js';

// @desc    List tour packages (filter/search/sort/paginate)
// @route   GET /api/packages
// @access  Public
export const getPackages = asyncHandler(async (req, res) => {
  const baseFilter = req.query.includeInactive === 'true' ? {} : { isActive: true };
  const baseQuery = TourPackage.find(baseFilter);

  const features = new ApiFeatures(baseQuery, req.query, baseFilter)
    .filter(['category', 'travelMode'])
    .search(['title', 'shortDescription'])
    .priceRange('discountedPrice')
    .sort('-createdAt')
    .paginate();

  const [data, count] = await Promise.all([
    features.query,
    features.countDocuments(TourPackage),
  ]);

  res.json({
    success: true,
    count,
    page: features.page,
    pages: Math.ceil(count / features.limit) || 1,
    data,
  });
});

// @desc    Get featured packages
// @route   GET /api/packages/featured
// @access  Public
export const getFeaturedPackages = asyncHandler(async (req, res) => {
  const data = await TourPackage.find({ isFeatured: true, isActive: true }).sort('-createdAt').limit(8);
  res.json({ success: true, count: data.length, data });
});

// @desc    Get a single package by slug
// @route   GET /api/packages/:slug
// @access  Public
export const getPackageBySlug = asyncHandler(async (req, res) => {
  const pkg = await TourPackage.findOne({ slug: req.params.slug });

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  res.json({ success: true, data: pkg });
});

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
export const createPackage = asyncHandler(async (req, res) => {
  await validateCategory('package', req.body.category);
  const pkg = await TourPackage.create(req.body);
  res.status(201).json({ success: true, data: pkg });
});

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
export const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await TourPackage.findById(req.params.id);

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  if (req.body.category) await validateCategory('package', req.body.category);

  Object.assign(pkg, req.body);
  await pkg.save();

  res.json({ success: true, data: pkg });
});

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
export const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await TourPackage.findById(req.params.id);

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  await pkg.deleteOne();
  res.json({ success: true, data: {} });
});
