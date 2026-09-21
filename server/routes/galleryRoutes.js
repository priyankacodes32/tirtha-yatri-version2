import express from 'express';
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', protect, adminOnly, createGalleryImage);
router.put('/:id', protect, adminOnly, updateGalleryImage);
router.delete('/:id', protect, adminOnly, deleteGalleryImage);

export default router;
