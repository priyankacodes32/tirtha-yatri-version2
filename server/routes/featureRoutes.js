import express from 'express';
import { getFeatures, createFeature, updateFeature, deleteFeature } from '../controllers/featureController.js';
import { protect, protectOptional } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protectOptional, getFeatures);
router.post('/', protect, adminOnly, createFeature);
router.put('/:id', protect, adminOnly, updateFeature);
router.delete('/:id', protect, adminOnly, deleteFeature);

export default router;
