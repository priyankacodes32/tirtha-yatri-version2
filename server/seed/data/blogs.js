import { img } from './images.js';

/**
 * Demo Mustang blog content for Tirtha Yatri — original writing, not
 * copied from any reference site. `content` is lightweight Markdown
 * (headings, paragraphs, lists, blockquotes, images with optional
 * captions, links, bold/italic) rendered client-side by
 * client/src/utils/markdown.jsx — no CMS/editor dependency needed.
 */
const blogs = [
  {
    title: "The Magic of Mustang: A Journey Through Nepal's Hidden Himalayan Kingdom",
    excerpt:
      "Discover the dramatic landscapes, ancient villages and unique culture that make Mustang one of Nepal's most extraordinary destinations.",
    category: 'mustang',
    coverImage: img('desertCanyonSnowyMountains', 1600),
    tags: ['mustang', 'himalaya', 'upper-mustang', 'travel-inspiration'],
    isFeatured: true,
    published: true,
    publishedAt: new Date('2026-06-25'), // kept newest so it naturally lands as the flagship/hero featured story
    content: `Mustang feels different from almost anywhere else in Nepal. The landscape changes dramatically as the green hills of the lower valley give way to dry cliffs, winding mountain roads and wide Himalayan valleys carved by wind rather than rain. It is one region, but it holds two very different worlds — Lower Mustang's river villages and orchards, and Upper Mustang's high desert plateau, once the independent Kingdom of Lo.

### Why Visit Mustang?

Most of Nepal is defined by monsoon-green hillsides and dense forest. Mustang is the exception. Sitting in the rain-shadow of the Annapurna and Dhaulagiri massifs, it barely sees rain even in the wettest months, which is part of why its canyons, cliffs and mud-brick villages have stayed so strikingly preserved. It's a place for travellers who want mountains without crowds, and culture that feels genuinely lived-in rather than staged for visitors.

### Places to Explore

A first trip through the region usually touches these places, each with its own character:

- **Jomsom** — the windswept administrative hub and gateway to the whole region
- **Marpha** — a spotless stone village known for its apple orchards
- **Kagbeni** — a medieval walled town guarding the entrance to Upper Mustang
- **Muktinath** — the sacred temple and pilgrimage site above the valley
- **Lo Manthang** — the ancient walled capital of the former Kingdom of Lo

### The Journey

Getting through Mustang is as much a part of the experience as arriving anywhere. The road follows the Kali Gandaki, one of the world's deepest gorges, past terraced fields, chortens and prayer flags strung across the wind. Depending on how far you go, the trip can be a short overland hop from Jomsom or a multi-day push deep into the restricted zone of Upper Mustang.

> "The valley doesn't just lead to Mustang — travelling through it is already Mustang."

### Travel Tips

A few practical notes for anyone planning a first visit: pack layers, since temperatures swing hard between sun and shade; expect afternoon winds strong enough to ground flights, so mornings are best for travel; and if you're heading beyond Kagbeni, budget time for permits, since Upper Mustang is a restricted area requiring a licensed guide.

### Final Thoughts

Mustang rewards patience. It isn't a place you rush through for a single photo — it's a landscape and a culture that unfold slowly, the further you're willing to travel into it.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: 'Muktinath Travel Guide: Everything You Need to Know Before You Go',
    excerpt:
      'A simple guide covering the sacred temple, nearby attractions, transportation and essential things to know before your journey.',
    category: 'muktinath',
    coverImage: img('muktinathMandir', 1600),
    tags: ['muktinath', 'pilgrimage', 'travel-guide'],
    isFeatured: true,
    published: true,
    publishedAt: new Date('2026-02-03'),
    content: `Muktinath is one of the most important pilgrimage sites in the Himalayas — sacred to Hindus as a Vishnu shrine and to Buddhists as Chumig Gyatsa. Sitting at 3,710 metres, it draws travellers for both its spiritual significance and its setting, framed by the Thorong La pass and the wider Mustang valley.

### Getting There

Most journeys to Muktinath start from Pokhara. From there, travellers typically fly or drive to Jomsom, then continue by jeep or on foot to Ranipauwa, the small settlement just below the temple. The full overland route follows the Kali Gandaki gorge and takes in Kagbeni along the way.

![Prayer flags at Muktinath](${img('prayerFlagsMountainBackdrop', 1200)} "Prayer flags near the temple complex")

### What to See at the Temple

The main draw is the ring of **108 bull-head water spouts**, where pilgrims bathe in glacial spring water believed to cleanse sins. A short walk away, the Jwala Mai shrine houses a natural gas flame that burns beside — and at times over — flowing spring water, a detail central to why the site holds meaning for both Hindu and Buddhist traditions.

### Nearby Attractions

- Jwala Mai Temple, just below the main shrine
- Narsingh Gompa, for wider valley views
- Kagbeni's old town, a short jeep ride away

### Things to Know Before You Go

Nights at this elevation are cold even in warmer months, so bring proper layers. The water at the spouts is genuinely icy year-round — bring a towel and a change of clothes if you plan to bathe. And keep in mind this is an active place of worship: modest dress and quiet, respectful behaviour go a long way.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: '7 Places You Should Not Miss in Mustang',
    excerpt:
      'From Marpha and Jomsom to Kagbeni and Lo Manthang, discover some of the most memorable places across Mustang.',
    category: 'mustang',
    coverImage: img('villageMountainRange', 1600),
    tags: ['mustang', 'places-to-visit'],
    isFeatured: true,
    published: true,
    publishedAt: new Date('2026-02-20'),
    content: `Mustang packs an unusual amount of variety into a fairly narrow valley. Here are seven places worth building a route around.

1. **Jomsom** — the region's gateway town, set in a dramatic wind corridor between two eight-thousanders.
2. **Marpha** — stone houses, whitewashed courtyards and some of Nepal's best-known apple orchards.
3. **Kagbeni** — a walled medieval village marking the entrance to Upper Mustang.
4. **Muktinath** — the sacred temple complex and one of the region's most-visited sites.
5. **Dhumba Lake** — a small alpine lake with a striking reflection of the Nilgiri massif.
6. **Lo Manthang** — the former royal capital of the Kingdom of Lo, still enclosed by its old walls.
7. **Chhoser Caves** — centuries-old cliffside cave dwellings near Lo Manthang.

Most travellers won't fit every stop into a single trip — Lo Manthang and the caves require a restricted-area permit and extra travel days — but even a short Jomsom-Kagbeni-Muktinath loop covers a genuinely striking cross-section of the valley.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: 'How to Reach Mustang from Pokhara',
    excerpt: 'Explore the different ways to travel from Pokhara to Mustang, including road and flight options.',
    category: 'travel-guide',
    coverImage: img('jeepDirtRoadMountains', 1600),
    tags: ['travel-guide', 'transportation', 'pokhara'],
    published: true,
    publishedAt: new Date('2026-03-05'),
    content: `Pokhara is the usual starting point for a Mustang trip, and there are a few different ways to make the journey — each with its own trade-offs in time, cost and scenery.

**By jeep** is the most immersive option: a full day or two on the road via Beni and Tatopani, following the Kali Gandaki upstream. It's the most affordable route and the best way to actually see the valley change from green hillside to high desert, though the road is unpaved in stretches.

**By flight** to Jomsom cuts the journey down to about 20 minutes in the air, landing you close to Muktinath with time to spare. Flights are weather-dependent and typically only operate in the early morning before afternoon winds pick up.

**By helicopter** is the fastest option, capable of a same-day return from Pokhara — a practical choice for travellers short on time or less able to manage a long overland journey.

Whichever way you choose, expect the trip to feel like a genuine transition — the scenery shifts noticeably the closer you get to Jomsom.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: 'Best Time to Visit Mustang: A Month-by-Month Guide',
    excerpt:
      "Understand Mustang's seasons and discover when the landscapes, weather and travel conditions may be best suited to your journey.",
    category: 'travel-tips',
    coverImage: img('snowPeakSunrise', 1600),
    tags: ['travel-tips', 'best-time-to-visit', 'weather'],
    published: true,
    publishedAt: new Date('2026-03-18'),
    content: `Mustang's rain-shadow location makes its seasons a little different from the rest of Nepal.

**March–June** brings clearer skies and milder daytime temperatures, making it one of the more comfortable windows for both the lower valley and Upper Mustang.

**June–September** is monsoon season across most of Nepal, but Mustang stays relatively dry thanks to the mountains blocking the rain — this is also when the Tiji Festival typically takes place in Lo Manthang.

**September–November** is generally considered peak season, with settled weather and good visibility across the valley.

**December–February** turns cold, especially at higher elevations like Muktinath, and some routes become harder to manage — worth planning around carefully if you're travelling in winter.

There's no single "best" month — it depends on whether you're prioritising festival season, warmer trekking conditions, or just the clearest mountain views.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: 'Muktinath by Jeep: What the Journey Is Really Like',
    excerpt:
      'A road journey through the Kali Gandaki valley, mountain villages and dramatic Himalayan landscapes on the way to Muktinath.',
    category: 'muktinath',
    coverImage: img('jeepDirtRoadSunset', 1600),
    tags: ['muktinath', 'jeep', 'kali-gandaki'],
    published: true,
    publishedAt: new Date('2026-04-02'),
    content: `Flying into Jomsom gets you to Muktinath fast. Taking the jeep gets you there slowly, dustily, and — for a lot of travellers — more memorably.

### Leaving Pokhara

The first stretch out of Pokhara is unremarkable: paved road, roadside towns, gradually climbing terrain. The shift starts somewhere past Beni, where the valley narrows and the Kali Gandaki comes into view for the first time, running fast and grey with glacial silt.

### Into the Gorge

By the time the road reaches Tatopani and climbs toward Ghasa, the scenery has changed completely. Forested slopes give way to bare rock. The gorge itself is one of the deepest in the world, and the road clings to its side in long switchbacks, opening onto sudden views of Dhaulagiri and Nilgiri on either side.

![Jeep on the mountain road at sunset](${img('busOnCliffRoadJomsom', 1200)} "The road narrows considerably past Jomsom")

### Jomsom and the Final Stretch

Jomsom itself is a welcome stop — flat ground, food, a chance to stretch — before the final push toward Ranipauwa and the walk up to the temple. This last section is where the wind really makes itself known; afternoons in this stretch of valley are notoriously gusty, which is part of why most travel here happens in the morning.

### Was It Worth It?

For anyone who wants the destination without the detour, flying is faster and easier. But the jeep route turns a pilgrimage into a proper journey — one where the landscape does as much of the storytelling as the temple itself.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: 'Inside the Ancient Streets of Kagbeni',
    excerpt:
      'Walk through the narrow streets of Kagbeni and discover the history, architecture and atmosphere of this remarkable Mustang village.',
    category: 'culture',
    coverImage: img('terracedVillageValley', 1600),
    tags: ['culture', 'kagbeni', 'village-life'],
    published: true,
    publishedAt: new Date('2026-04-20'),
    content: `Kagbeni sits at the exact point where the lower Mustang valley ends and the restricted region of Upper Mustang begins — a checkpoint village that has clearly been a crossroads for a very long time.

Its narrow alleys are close enough to touch both walls at once in places, built that way to block the valley's fierce winds. Whitewashed chortens mark the entrances to the old town, and a red-ochre gompa dating back centuries still anchors the settlement's skyline.

Walking through Kagbeni doesn't take long, but it rewards slowing down — courtyards open unexpectedly off the main lanes, prayer wheels line certain corners, and the crumbling remains of an old fort wall hint at the village's role guarding the route north.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: "A First-Timer's Guide to Upper Mustang",
    excerpt:
      'What to expect from Upper Mustang, from its extraordinary landscapes and Tibetan-influenced culture to planning your journey.',
    category: 'travel-guide',
    coverImage: img('trekkersClimbing', 1600),
    tags: ['travel-guide', 'upper-mustang', 'lo-manthang'],
    published: true,
    publishedAt: new Date('2026-05-10'),
    content: `Upper Mustang is often described as Nepal's "last forbidden kingdom" — it was closed to foreign visitors until 1992, and still requires a Restricted Area Permit and a licensed guide to enter.

What you'll find beyond Kagbeni is a landscape unlike the rest of Nepal: eroded canyons in red and ochre, cave dwellings cut into cliff faces, and a culture more closely tied to Tibetan Buddhism than to the villages further south. The former capital, Lo Manthang, still sits behind its old mud-brick walls, with a royal palace and several centuries-old monasteries inside.

Because of the permit requirement, Upper Mustang isn't somewhere to add on casually — it needs a few extra days built into your itinerary, and a guide who can navigate both the terrain and the paperwork. For travellers with the time, it's a genuinely different experience from the rest of a Mustang trip.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: 'What to Pack for a Mustang Trip',
    excerpt: 'A practical packing guide for changing mountain weather, long road journeys and high-altitude destinations.',
    category: 'travel-tips',
    coverImage: img('backpackerHill', 1600),
    tags: ['travel-tips', 'packing'],
    published: true,
    publishedAt: new Date('2026-05-28'),
    content: `Mustang's weather can shift fast — bright sun one hour, biting wind the next — so packing smart matters more here than in most of Nepal.

- **Layers** — a warm mid-layer plus a windproof outer shell handles most conditions
- **Sun protection** — strong UV exposure at altitude, even on cloudy days
- **A scarf or buff** — genuinely useful against the valley's dust and wind
- **Sturdy, broken-in footwear** — for uneven ground and occasional short walks
- **A basic first-aid kit** — plus any personal medication
- **Cash** — card payments are unreliable outside the bigger towns

Pack lighter than you think you need to, especially if any part of your route involves a mountain flight — baggage allowances on those routes tend to be tight.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
  {
    title: '3 Days in Mustang: A Simple Travel Itinerary',
    excerpt:
      "A simple three-day route for travelers who want to experience some of Mustang's most beautiful landscapes and cultural highlights.",
    category: 'itinerary',
    coverImage: img('horsesOnDustyMountainPath', 1600),
    tags: ['itinerary', 'trip-planning'],
    published: true,
    publishedAt: new Date('2026-06-12'),
    content: `For travellers without time for a deep Upper Mustang expedition, this three-day route covers a solid cross-section of the region.

**Day 1 — Pokhara to Jomsom to Kagbeni.** Fly or drive to Jomsom, then continue by jeep to Kagbeni. Spend the afternoon exploring the old town before settling in for the night.

**Day 2 — Kagbeni to Muktinath and back.** A full day dedicated to Muktinath — the walk or jeep ride up to Ranipauwa, time at the temple complex, and a return to Jomsom or Kagbeni for the night.

**Day 3 — Return to Pokhara.** Fly or drive back, with a stop in Marpha if time and the schedule allow — it's a easy detour and a good place to end the trip.

It's a compact route, but it touches the region's gateway town, its most sacred site, and one of its most photogenic villages — a reasonable introduction for a first, shorter visit.

*This article is sample content published for demonstration purposes as part of building this website.*`,
  },
];

export default blogs;
