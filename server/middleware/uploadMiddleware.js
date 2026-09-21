import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_ROOT = path.join(__dirname, '..', 'uploads');

const IMAGE_DIR = path.join(UPLOADS_ROOT, 'images');
const VIDEO_DIR = path.join(UPLOADS_ROOT, 'videos');

for (const dir of [IMAGE_DIR, VIDEO_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime']);

const safeFilename = (originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${unique}${ext}`;
};

const storage = (dir) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => cb(null, safeFilename(file.originalname)),
  });

const fileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.has(file.mimetype)) {
    cb(null, true);
    return;
  }
  const error = new Error(`Unsupported file type: ${file.mimetype}`);
  error.statusCode = 400;
  cb(error);
};

// 8MB for images, 150MB for videos.
export const uploadImage = multer({
  storage: storage(IMAGE_DIR),
  fileFilter: fileFilter(IMAGE_TYPES),
  limits: { fileSize: 8 * 1024 * 1024 },
}).single('file');

export const uploadVideo = multer({
  storage: storage(VIDEO_DIR),
  fileFilter: fileFilter(VIDEO_TYPES),
  limits: { fileSize: 150 * 1024 * 1024 },
}).single('file');
