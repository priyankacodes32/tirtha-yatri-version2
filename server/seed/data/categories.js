/**
 * Seeds the Category collection that TourPackage/Destination/Blog/Gallery
 * `category` fields are validated against (see utils/validateCategory.js).
 * Names are chosen so their auto-generated slug matches the category
 * values already used in packages.js/destinations.js/blogs.js/gallery.js —
 * keep them in sync if you rename one here.
 */
const categories = [
  // Destinations (Explore Mustang filter chips)
  { name: 'Spiritual', type: 'destination', icon: 'Flame', order: 1 },
  { name: 'Nature', type: 'destination', icon: 'Leaf', order: 2 },
  { name: 'Culture', type: 'destination', icon: 'Landmark', order: 3 },
  { name: 'Adventure', type: 'destination', icon: 'Mountain', order: 4 },
  { name: 'Villages', type: 'destination', icon: 'Home', order: 5 },

  // Tour packages
  { name: 'Jeep', type: 'package', icon: 'Car', order: 1 },
  { name: 'Bus', type: 'package', icon: 'Bus', order: 2 },
  { name: 'Flight', type: 'package', icon: 'Plane', order: 3 },
  { name: 'Helicopter', type: 'package', icon: 'Wind', order: 4 },
  { name: 'Short Tour', type: 'package', icon: 'Clock', order: 5 },
  { name: 'Pilgrimage', type: 'package', icon: 'Flame', order: 6 },
  { name: 'Custom', type: 'package', icon: 'SlidersHorizontal', order: 7 },

  // Blog
  { name: 'Mustang', type: 'blog', icon: 'Mountain', order: 1 },
  { name: 'Muktinath', type: 'blog', icon: 'Flame', order: 2 },
  { name: 'Travel Guide', type: 'blog', icon: 'MapPinned', order: 3 },
  { name: 'Travel Tips', type: 'blog', icon: 'Compass', order: 4 },
  { name: 'Culture', type: 'blog', icon: 'Landmark', order: 5 },
  { name: 'Adventure', type: 'blog', icon: 'Wind', order: 6 },
  { name: 'Itinerary', type: 'blog', icon: 'Clock', order: 7 },

  // Gallery
  { name: 'Muktinath', type: 'gallery', order: 1 },
  { name: 'Mountains', type: 'gallery', order: 2 },
  { name: 'Jomsom', type: 'gallery', order: 3 },
  { name: 'Marpha', type: 'gallery', order: 4 },
  { name: 'Kagbeni', type: 'gallery', order: 5 },
  { name: 'Lo Manthang', type: 'gallery', order: 6 },
  { name: 'Culture', type: 'gallery', order: 7 },
  { name: 'Temples', type: 'gallery', order: 8 },
  { name: 'Landscapes', type: 'gallery', order: 9 },
  { name: 'Traveller Moments', type: 'gallery', order: 10 },
];

export default categories;
