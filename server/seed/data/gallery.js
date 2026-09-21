import { img } from './images.js';

const gallery = [
  { title: 'Muktinath Mandir', image: img('muktinathMandir', 1400), category: 'muktinath', location: 'Muktinath', altText: 'Low-angle view of the Muktinath temple structure', isFeatured: true },
  { title: 'Prayer flags over the shrine', image: img('prayerFlagsMountainBackdrop', 1400), category: 'muktinath', location: 'Muktinath', altText: 'Prayer flags fluttering with snow-capped mountains behind Muktinath', isFeatured: true },
  { title: 'Bus on the Jomsom cliff road', image: img('busOnCliffRoadJomsom', 1400), category: 'jomsom', location: 'Jomsom', altText: 'A tourist bus driving down a mountain road next to a cliff in Jomsom', isFeatured: true },
  { title: 'Jomsom rooftops', image: img('buildingWithMountains', 1400), category: 'jomsom', location: 'Jomsom', altText: 'A building with Himalayan mountains rising behind it in Jomsom', isFeatured: false },
  { title: 'Apple-orchard village', image: img('housesOnMountainVillage', 1400), category: 'marpha', location: 'Marpha', altText: 'Stone houses on a hillside with mountains in daytime light', isFeatured: true },
  { title: 'Terraced hillside homes', image: img('housesOverlookingRange', 1400), category: 'marpha', location: 'Marpha', altText: 'Houses overlooking a wide mountain range near Marpha', isFeatured: false },
  { title: 'Kagbeni\'s old alleys', image: img('villageMountainRange', 1400), category: 'kagbeni', location: 'Kagbeni', altText: 'A walled village in the middle of a mountain range', isFeatured: true },
  { title: 'Terraced fields above the river', image: img('terracedVillageValley', 1400), category: 'kagbeni', location: 'Kagbeni', altText: 'Terraced fields in a mountain valley with a village', isFeatured: false },
  { title: 'The walled city of Lo Manthang', image: img('desertCanyonSnowyMountains', 1400), category: 'lo-manthang', location: 'Upper Mustang', altText: 'A deep canyon cutting through desert landscape with distant snowy mountains', isFeatured: true },
  { title: 'Trail into the high desert', image: img('trekkersClimbing', 1400), category: 'lo-manthang', location: 'Upper Mustang', altText: 'Trekkers climbing a mountain trail in the Mustang region', isFeatured: false },
  { title: 'Traditional dress at Tiji', image: img('horsesOnDustyMountainPath', 1400), category: 'culture', location: 'Lo Manthang', altText: 'People riding horses on a dusty mountain path, dressed for a festival gathering', isFeatured: true },
  { title: 'Prayer flags and monastery detail', image: img('goldTempleFlagsNamche', 1400), category: 'culture', location: 'Mustang region', altText: 'A Himalayan monastery roof with pennant flags', isFeatured: false },
  { title: 'Stupa and prayer flags', image: img('prayerFlagsStupaKathmandu', 1400), category: 'temples', location: 'Kathmandu', altText: 'Colorful Buddhist prayer flags strung around a stupa', isFeatured: false },
  { title: 'Kali Gandaki valley', image: img('riverThroughValley', 1400), category: 'landscapes', location: 'Kali Gandaki valley', altText: 'A river running through a valley flanked by mountains', isFeatured: true },
  { title: 'Dhumba Lake reflection', image: img('mountainLakeReflection', 1400), category: 'landscapes', location: 'Dhumba Lake', altText: 'Snow-covered mountains reflected in a still alpine lake', isFeatured: true },
  { title: 'First light on the peaks', image: img('snowPeakSunrise', 1400), category: 'mountains', location: 'Mustang region', altText: 'Snow-capped mountain peak illuminated by sunrise', isFeatured: false },
  { title: 'Jeep road at sunset', image: img('jeepDirtRoadSunset', 1400), category: 'mountains', location: 'Kali Gandaki valley', altText: 'A jeep on a dirt mountain road at sunset', isFeatured: false },
  { title: 'On the trail', image: img('backpackerHill', 1400), category: 'traveller-moments', location: 'Mustang region', altText: 'A traveller with a backpack walking up a hill trail', isFeatured: true },
  { title: 'A hidden valley village', image: img('villageOnMountainside', 1400), category: 'traveller-moments', location: 'Lubra Village', altText: 'A small village nestled on a mountainside', isFeatured: false },
];

export default gallery;
