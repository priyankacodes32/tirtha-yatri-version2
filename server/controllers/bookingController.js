import asyncHandler from '../utils/asyncHandler.js';
import Booking from '../models/Booking.js';
import TourPackage from '../models/TourPackage.js';

// @desc    Create a booking for the logged-in user
// @route   POST /api/bookings
// @access  Private
export const createBooking = asyncHandler(async (req, res) => {
  const { package: packageId, fullName, email, phone, travellers, travelDate } = req.body;

  if (!packageId || !fullName || !email || !phone || !travellers || !travelDate) {
    res.status(400);
    throw new Error('Package, fullName, email, phone, travellers and travelDate are required');
  }

  const pkg = await TourPackage.findById(packageId);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  const booking = await Booking.create({ ...req.body, user: req.user._id });
  res.status(201).json({ success: true, data: booking });
});

// @desc    List bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status && req.query.status !== 'all') {
    filter.bookingStatus = req.query.status;
  }

  const data = await Booking.find(filter)
    .populate('package', 'title slug coverImage')
    .populate('user', 'name email')
    .sort('-createdAt');

  res.json({ success: true, count: data.length, data });
});

// @desc    Get a single booking (owner or admin)
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('package', 'title slug coverImage')
    .populate('user', 'name email');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  const isOwner = booking.user._id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this booking');
  }

  res.json({ success: true, data: booking });
});

// @desc    Update a booking's status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  booking.bookingStatus = status;
  await booking.save();

  res.json({ success: true, data: booking });
});
