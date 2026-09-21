import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/db.js';
import notFound from './middleware/notFoundMiddleware.js';
import errorHandler from './middleware/errorMiddleware.js';
import { UPLOADS_ROOT } from './middleware/uploadMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import featureRoutes from './routes/featureRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Allow the public site and admin dashboard (and local dev tools) to call the API.
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serves admin-uploaded images/videos (server/uploads/) at /uploads/*.
app.use('/uploads', express.static(UPLOADS_ROOT));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Tirtha Yatri API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/uploads', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

start();

export default app;
