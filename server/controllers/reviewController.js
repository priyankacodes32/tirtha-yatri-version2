import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/Review.js';

// @desc    List reviews — public sees only approved, admin sees everything
// @route   GET /api/reviews
// @access  Public / Private(admin, via ?all=true)
export const getReviews = asyncHandler(async (req, res) => {
  const isAdminRequest = req.user?.role === 'admin' && req.query.all === 'true';
  const filter = isAdminRequest ? {} : { status: 'approved' };

  if (req.query.status && isAdminRequest) {
    filter.status = req.query.status;
  }
  if (req.query.featured === 'true') {
    filter.isFeatured = true;
  }

  const data = await Review.find(filter).sort('-createdAt');
  res.json({ success: true, count: data.length, data });
});

// @desc    Submit a review (goes to "pending" for moderation)
// @route   POST /api/reviews
// @access  Public
export const createReview = asyncHandler(async (req, res) => {
  const { name, rating, tour, reviewText } = req.body;

  if (!name || !rating || !tour || !reviewText) {
    res.status(400);
    throw new Error('Name, rating, tour and review text are required');
  }

  const review = await Review.create({
    ...req.body,
    status: 'pending',
    isDemo: false,
  });

  res.status(201).json({ success: true, data: review });
});

// @desc    Update a review (moderate status, feature, edit content)
// @route   PUT /api/reviews/:id
// @access  Private/Admin
export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  Object.assign(review, req.body);
  await review.save();

  res.json({ success: true, data: review });
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  await review.deleteOne();
  res.json({ success: true, data: {} });
});
