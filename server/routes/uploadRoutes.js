import express from 'express';
import { uploadImageFile, uploadVideoFile } from '../controllers/uploadController.js';
import { uploadImage, uploadVideo } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/image', protect, adminOnly, uploadImage, uploadImageFile);
router.post('/video', protect, adminOnly, uploadVideo, uploadVideoFile);

export default router;
