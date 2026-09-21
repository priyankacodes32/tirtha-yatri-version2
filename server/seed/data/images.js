/**
 * Curated Himalaya/Nepal-themed photos, sourced directly from Unsplash's
 * CDN (images.unsplash.com) under the Unsplash License (free to use, no
 * attribution required). Kept as plain URL strings so the admin dashboard
 * can swap any of them later without touching code.
 *
 * Confidence notes (checked against each photo's own Unsplash caption/geo
 * data before use — Unsplash simply doesn't have deep tagged coverage of
 * every named Mustang village, so a few are the best visually-honest match
 * rather than a confirmed exact geotag; the two marked CONFIRMED are exact):
 *   - muktinathMandir      CONFIRMED — "Muktinath Mandir in Nepal"
 *   - busOnCliffRoadJomsom CONFIRMED — shot in Jomsom, Nepal
 *   - villageMountainRange, housesOverlookingRange, trekkersClimbing —
 *     captioned/geotagged Nepal (Listikot / Annapurna-Narchyang)
 *   - the rest are strong visual matches for the described terrain
 *     (high-desert canyon, terraced valley village, glacial lake, etc.)
 *     without a specific place geotag attached on Unsplash.
 */
const BASE = {
  muktinathMandir: 'https://images.unsplash.com/photo-1540961286473-8ad1368dc1bd',
  muktinathShrineFlags: 'https://images.unsplash.com/photo-1623356788377-3313cc497e4b',
  muktinathFlagsMountain: 'https://images.unsplash.com/photo-1710344473352-01e7934f7b45',
  busOnCliffRoadJomsom: 'https://images.unsplash.com/photo-1678573131267-e4a9cc18602b',
  villageMountainRange: 'https://images.unsplash.com/photo-1678628103733-e1a76d096a1a',
  housesOverlookingRange: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d',
  buildingWithMountains: 'https://images.unsplash.com/photo-1668966780008-b7dae98f61f3',
  housesOnMountainVillage: 'https://images.unsplash.com/photo-1485351095706-2fde377e91c1',
  trekkersClimbing: 'https://images.unsplash.com/photo-1678086029785-b2b1599c7d41',
  desertCanyonSnowyMountains: 'https://images.unsplash.com/photo-1785685194554-a3005f93cc4b',
  snowPeakSunrise: 'https://images.unsplash.com/photo-1767173760312-d6fa1304c3a3',
  mountainLakeReflection: 'https://images.unsplash.com/photo-1761675688044-0eb981b90481',
  terracedVillageValley: 'https://images.unsplash.com/photo-1773428050189-b0641c4a0313',
  horsesOnDustyMountainPath: 'https://images.unsplash.com/photo-1768160686725-041f271eab72',
  riverThroughValley: 'https://images.unsplash.com/photo-1668966780199-0c36f7977427',
  villageOnMountainside: 'https://images.unsplash.com/photo-1718179634911-8551f8b0cccf',
  prayerFlagsMountainBackdrop: 'https://images.unsplash.com/photo-1753952969735-9be9feb9a217',
  prayerFlagsStupaKathmandu: 'https://images.unsplash.com/photo-1776620544426-5298d9dfaf5f',
  goldTempleFlagsNamche: 'https://images.unsplash.com/photo-1573238749554-3fc79bad86d7',
  jeepDirtRoadMountains: 'https://images.unsplash.com/photo-1743844914456-ea126cf447ca',
  jeepDirtRoadSunset: 'https://images.unsplash.com/photo-1636138103626-8057cad9c335',
  backpackerHill: 'https://images.unsplash.com/photo-1692452376160-14194abefba8',
};

/**
 * Returns a sized/optimized variant of a base Unsplash photo.
 * @param {keyof typeof BASE} key
 * @param {number} width
 */
export const img = (key, width = 1600) =>
  `${BASE[key]}?fm=jpg&q=80&w=${width}&auto=format&fit=crop`;

export default BASE;
