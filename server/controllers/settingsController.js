import asyncHandler from '../utils/asyncHandler.js';
import SiteSettings from '../models/SiteSettings.js';

/**
 * SiteSettings is a singleton — this always returns (and creates, if
 * missing) the one document, rather than exposing list/create/delete.
 */
const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return settings;
};

// @desc    Get site settings (theme, hero, contact, social)
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.json({ success: true, data: settings });
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  // Deep-merge nested objects (theme/hero/contact/social) so a partial
  // update (e.g. just theme.secondary) doesn't wipe out sibling fields.
  for (const key of ['theme', 'hero', 'contact', 'social']) {
    if (req.body[key]) {
      settings[key] = { ...settings[key].toObject(), ...req.body[key] };
    }
  }
  if (req.body.siteName !== undefined) settings.siteName = req.body.siteName;
  if (req.body.tagline !== undefined) settings.tagline = req.body.tagline;

  await settings.save();
  res.json({ success: true, data: settings });
});
