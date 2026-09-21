import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', protect, adminOnly, getEnquiries);
router.put('/:id/status', protect, adminOnly, updateEnquiryStatus);
router.delete('/:id', protect, adminOnly, deleteEnquiry);

export default router;
