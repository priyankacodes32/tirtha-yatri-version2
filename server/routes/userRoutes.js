import express from 'express';
import { getUsers, getUserById } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUserById);

export default router;
