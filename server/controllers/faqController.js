import asyncHandler from '../utils/asyncHandler.js';
import Faq from '../models/Faq.js';

// @desc    List FAQs (optionally filtered by category)
// @route   GET /api/faqs
// @access  Public
export const getFaqs = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (req.query.category && req.query.category !== 'all') {
    filter.category = req.query.category;
  }

  const data = await Faq.find(filter).sort('category order');
  res.json({ success: true, count: data.length, data });
});

// @desc    Create an FAQ
// @route   POST /api/faqs
// @access  Private/Admin
export const createFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.create(req.body);
  res.status(201).json({ success: true, data: faq });
});

// @desc    Update an FAQ
// @route   PUT /api/faqs/:id
// @access  Private/Admin
export const updateFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);

  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }

  Object.assign(faq, req.body);
  await faq.save();

  res.json({ success: true, data: faq });
});

// @desc    Delete an FAQ
// @route   DELETE /api/faqs/:id
// @access  Private/Admin
export const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);

  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }

  await faq.deleteOne();
  res.json({ success: true, data: {} });
});
