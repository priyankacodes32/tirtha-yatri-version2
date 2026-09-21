import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);

export default router;
