import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

/**
 * Verifies the Bearer JWT on the request, loads the user (minus password)
 * and attaches it to req.user. Responds 401 if missing/invalid/expired.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('Not authorized, user no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token invalid or expired');
  }
});

/**
 * Like `protect`, but never rejects the request. If a valid Bearer token is
 * present it attaches req.user; otherwise req.user stays undefined and the
 * request continues as an anonymous/public request. Used on routes that
 * return more data to authenticated admins (e.g. GET /api/reviews).
 */
export const protectOptional = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user) req.user = user;
    } catch (error) {
      // Invalid/expired token on an optional route — just proceed as anonymous.
    }
  }

  next();
});

export default protect;
