import express from 'express';
import {
  getDestinations,
  getFeaturedDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getDestinations);
router.get('/featured', getFeaturedDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/', protect, adminOnly, createDestination);
router.put('/:id', protect, adminOnly, updateDestination);
router.delete('/:id', protect, adminOnly, deleteDestination);

export default router;
