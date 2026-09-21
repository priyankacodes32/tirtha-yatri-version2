import express from 'express';
import {
  getPackages,
  getFeaturedPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/featured', getFeaturedPackages);
router.get('/:slug', getPackageBySlug);
router.post('/', protect, adminOnly, createPackage);
router.put('/:id', protect, adminOnly, updatePackage);
router.delete('/:id', protect, adminOnly, deletePackage);

export default router;
