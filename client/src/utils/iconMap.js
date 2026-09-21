import {
  Compass,
  BadgePercent,
  CalendarCheck,
  Zap,
  SlidersHorizontal,
  Mountain,
  MapPin,
  MapPinned,
  Shield,
  Heart,
  Star,
  Clock,
  Users,
  Plane,
  Car,
  Bus,
  Wind,
  Flame,
  Leaf,
  Landmark,
  Home,
} from 'lucide-react';

/**
 * Named imports only (not a `* as` wildcard import) so bundlers can
 * tree-shake — lucide-react ships 1000+ icons and a wildcard import would
 * pull all of them into the bundle. This is the fixed set the admin
 * dashboard's icon picker offers for Feature/Category `icon` fields; keep
 * it in sync with admin/'s icon dropdown if that list changes.
 */
const ICONS = {
  Compass,
  BadgePercent,
  CalendarCheck,
  Zap,
  SlidersHorizontal,
  Mountain,
  MapPin,
  MapPinned,
  Shield,
  Heart,
  Star,
  Clock,
  Users,
  Plane,
  Car,
  Bus,
  Wind,
  Flame,
  Leaf,
  Landmark,
  Home,
};

/**
 * Resolves an admin-entered icon name (stored on Feature/Category docs)
 * to its component. Falls back to Mountain so a typo in the admin
 * dashboard can't crash the public site.
 */
export const getIcon = (name) => ICONS[name] || Mountain;
