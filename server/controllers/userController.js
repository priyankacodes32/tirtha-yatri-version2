import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

// @desc    List users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const data = await User.find().sort('-createdAt');
  res.json({ success: true, count: data.length, data });
});

// @desc    Get a single user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({ success: true, data: user });
});
