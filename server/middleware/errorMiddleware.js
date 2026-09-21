/**
 * Centralized error handler. Normalizes Mongoose errors (bad ObjectId,
 * validation failures, duplicate keys) into clean JSON responses instead
 * of leaking stack traces to the client.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  let message = err.message || 'Server error';

  // Malformed ObjectId (e.g. GET /api/packages/not-a-valid-id)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose schema validation failure
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Multer upload errors (file too large, wrong field name, etc.)
  if (err.name === 'MulterError') {
    statusCode = 400;
    message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File is too large.'
        : `Upload failed: ${err.message}`;
  }

  // Duplicate unique key (e.g. email or slug already exists)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} already exists` : 'Duplicate field value';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
