/**
 * Seed users. The admin account's credentials come from the environment
 * (with sane fallbacks for local dev) so nothing sensitive is hardcoded.
 * Passwords are hashed by the User model's pre-save hook.
 */
const users = [
  {
    name: 'Tirtha Yatri Admin',
    email: process.env.SEED_ADMIN_EMAIL || 'admin@tirthayatri.com',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin@123',
    role: 'admin',
    phone: '+977-9800000000',
  },
  {
    name: 'Demo Traveller',
    email: 'traveller@tirthayatri.com',
    password: 'Traveller@123',
    role: 'user',
    phone: '+977-9811111111',
  },
];

export default users;
