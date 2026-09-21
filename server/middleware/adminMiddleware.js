/**
 * Restricts a route to admins. Must run after `protect` so req.user exists.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403);
  throw new Error('Not authorized as an admin');
};

export default adminOnly;
