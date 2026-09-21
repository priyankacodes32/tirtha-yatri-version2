import dotenv from 'dotenv';
import connectDB from '../config/db.js';

import User from '../models/User.js';
import TourPackage from '../models/TourPackage.js';
import Destination from '../models/Destination.js';
import Review from '../models/Review.js';
import Gallery from '../models/Gallery.js';
import Video from '../models/Video.js';
import Blog from '../models/Blog.js';
import Faq from '../models/Faq.js';
import Enquiry from '../models/Enquiry.js';
import Booking from '../models/Booking.js';
import Category from '../models/Category.js';
import Feature from '../models/Feature.js';
import SiteSettings from '../models/SiteSettings.js';

import users from './data/users.js';
import packages from './data/packages.js';
import destinations from './data/destinations.js';
import reviews from './data/reviews.js';
import gallery from './data/gallery.js';
import blogs from './data/blogs.js';
import faqs from './data/faqs.js';
import categories from './data/categories.js';
import features from './data/features.js';
import settings from './data/settings.js';

dotenv.config();

const models = [
  User,
  TourPackage,
  Destination,
  Review,
  Gallery,
  Video,
  Blog,
  Faq,
  Enquiry,
  Booking,
  Category,
  Feature,
  SiteSettings,
];

const clearCollections = async () => {
  for (const Model of models) {
    await Model.deleteMany();
  }
};

const destroyData = async () => {
  await connectDB();
  await clearCollections();
  console.log('All collections cleared.');
  process.exit(0);
};

const importData = async () => {
  await connectDB();
  await clearCollections();

  // Categories first — packages/destinations/blogs/gallery below reference
  // these values (validated at the API layer, not enforced by seed order,
  // but this keeps the data logically consistent from the start).
  await Category.create(categories);
  await Feature.create(features);
  await SiteSettings.create(settings);

  // Model.create() with an array saves each document individually, so
  // per-document hooks (password hashing, slug generation) all run correctly.
  await User.create(users);
  await TourPackage.create(packages);
  await Destination.create(destinations);
  await Review.create(reviews);
  await Gallery.create(gallery);
  await Blog.create(blogs);
  await Faq.create(faqs);
  // Enquiry/Booking start empty — they're populated by real site usage.

  console.log('Seed data imported successfully:');
  console.log(`  Users:        ${users.length}`);
  console.log(`  Packages:     ${packages.length}`);
  console.log(`  Destinations: ${destinations.length}`);
  console.log(`  Reviews:      ${reviews.length} (all flagged isDemo: true)`);
  console.log(`  Gallery:      ${gallery.length}`);
  console.log(`  Blogs:        ${blogs.length}`);
  console.log(`  FAQs:         ${faqs.length}`);
  console.log(`  Categories:   ${categories.length}`);
  console.log(`  Features:     ${features.length}`);
  console.log(`  Site settings: 1 (theme, hero, contact, social)`);
  console.log('');
  console.log('Demo admin login:');
  console.log(`  email:    ${users[0].email}`);
  console.log(`  password: ${users[0].password}`);

  process.exit(0);
};

const run = async () => {
  try {
    if (process.argv.includes('-d')) {
      await destroyData();
    } else {
      await importData();
    }
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

run();
