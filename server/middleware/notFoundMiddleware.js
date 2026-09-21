/**
 * Catches any request that didn't match a route and forwards a 404
 * to the centralized error handler.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default notFound;
