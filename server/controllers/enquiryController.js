import asyncHandler from '../utils/asyncHandler.js';
import Enquiry from '../models/Enquiry.js';

// @desc    Submit an enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = asyncHandler(async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    res.status(400);
    throw new Error('Full name, email, phone and message are required');
  }

  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({ success: true, data: enquiry });
});

// @desc    List enquiries (filter by status, search by name/email)
// @route   GET /api/enquiries
// @access  Private/Admin
export const getEnquiries = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status && req.query.status !== 'all') {
    filter.status = req.query.status;
  }
  if (req.query.search) {
    const regex = new RegExp(req.query.search.trim(), 'i');
    filter.$or = [{ fullName: regex }, { email: regex }, { phone: regex }];
  }

  const data = await Enquiry.find(filter).populate('package', 'title slug').sort('-createdAt');
  res.json({ success: true, count: data.length, data });
});

// @desc    Update an enquiry's status
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['new', 'contacted', 'in-progress', 'converted', 'closed'];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }

  enquiry.status = status;
  await enquiry.save();

  res.json({ success: true, data: enquiry });
});

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }

  await enquiry.deleteOne();
  res.json({ success: true, data: {} });
});
