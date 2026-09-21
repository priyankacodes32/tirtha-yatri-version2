import express from 'express';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../controllers/faqController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getFaqs);
router.post('/', protect, adminOnly, createFaq);
router.put('/:id', protect, adminOnly, updateFaq);
router.delete('/:id', protect, adminOnly, deleteFaq);

export default router;
