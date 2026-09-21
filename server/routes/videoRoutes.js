import express from 'express';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../controllers/videoController.js';
import { protect, protectOptional } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protectOptional, getVideos);
router.post('/', protect, adminOnly, createVideo);
router.put('/:id', protect, adminOnly, updateVideo);
router.delete('/:id', protect, adminOnly, deleteVideo);

export default router;
