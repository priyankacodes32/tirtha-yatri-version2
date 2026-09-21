import jwt from 'jsonwebtoken';

/**
 * Signs a JWT carrying the user's id and role.
 */
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

export default generateToken;
