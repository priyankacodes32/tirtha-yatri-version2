/**
 * DEMO / SAMPLE reviews for development purposes only. Every entry is
 * flagged isDemo: true so it's never mistaken for a genuine traveller
 * submission — swap these out for real reviews before going live.
 * Avatars are generated initials (ui-avatars.com), not photos of real people.
 */
const avatar = (name, bg) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=128`;

const reviews = [
  {
    name: 'Ramesh Sharma',
    location: 'Kathmandu, Nepal',
    avatar: avatar('Ramesh Sharma', '123B5D'),
    rating: 5,
    tour: 'Muktinath Pilgrimage Journey',
    reviewText:
      'The extra time built in for puja at the temple made all the difference. Our guide explained the significance of both the Hindu and Buddhist traditions there, which I hadn\'t expected. Everything was well organized from Kathmandu.',
    travelDate: new Date('2025-10-12'),
    status: 'approved',
    isFeatured: true,
    isDemo: true,
  },
  {
    name: 'Priya Nair',
    location: 'Bengaluru, India',
    avatar: avatar('Priya Nair', 'E76F24'),
    rating: 5,
    tour: 'Muktinath Helicopter Day Journey',
    reviewText:
      'My parents couldn\'t manage a long drive, so the helicopter option was perfect. We were at the temple by mid-morning and back in Pokhara in time for dinner. Worth every rupee for the time it saved.',
    travelDate: new Date('2025-11-02'),
    status: 'approved',
    isFeatured: true,
    isDemo: true,
  },
  {
    name: 'David Fischer',
    location: 'Munich, Germany',
    avatar: avatar('David Fischer', '274C5E'),
    rating: 4,
    tour: 'Muktinath & Mustang Explorer',
    reviewText:
      'Lo Manthang was the highlight — genuinely felt like a different century. The road is rough beyond Kagbeni so go in with the right expectations, but the scenery makes up for every bump.',
    travelDate: new Date('2025-08-20'),
    status: 'approved',
    isFeatured: true,
    isDemo: true,
  },
  {
    name: 'Anjali Gurung',
    location: 'Pokhara, Nepal',
    avatar: avatar('Anjali Gurung', 'E9B44C'),
    rating: 5,
    tour: 'Pokhara to Muktinath by Jeep',
    reviewText:
      'Loved stopping in Marpha for apple brandy on the way back. The jeep driver knew the road well and the whole trip felt safe even on the rougher stretches near Ghasa.',
    travelDate: new Date('2025-09-15'),
    status: 'approved',
    isFeatured: false,
    isDemo: true,
  },
  {
    name: 'Michael Chen',
    location: 'Singapore',
    avatar: avatar('Michael Chen', '123B5D'),
    rating: 4,
    tour: 'Muktinath by Flight — Jomsom Express',
    reviewText:
      'Flying in saved us two full days of driving. Our morning flight got delayed by about an hour for weather, so build in some buffer if you have a tight connection afterward.',
    travelDate: new Date('2025-05-18'),
    status: 'approved',
    isFeatured: false,
    isDemo: true,
  },
  {
    name: 'Sita Thapa',
    location: 'Butwal, Nepal',
    avatar: avatar('Sita Thapa', 'E76F24'),
    rating: 5,
    tour: 'Kathmandu to Muktinath Express',
    reviewText:
      'A long weekend was all I had and this itinerary fit it perfectly. Comfortable pace, no rushing, and the guide was patient with my elderly mother throughout.',
    travelDate: new Date('2026-03-02'),
    status: 'approved',
    isFeatured: false,
    isDemo: true,
  },
  {
    name: 'James Whitfield',
    location: 'Manchester, UK',
    avatar: avatar('James Whitfield', '274C5E'),
    rating: 3,
    tour: 'Muktinath & Mustang Explorer',
    reviewText:
      'Beautiful trip overall. Accommodation past Kagbeni was more basic than I expected — worth flagging clearly for anyone used to city comforts.',
    travelDate: new Date('2025-07-09'),
    status: 'pending',
    isFeatured: false,
    isDemo: true,
  },
  {
    name: 'Nabin Rai',
    location: 'Biratnagar, Nepal',
    avatar: avatar('Nabin Rai', 'E9B44C'),
    rating: 5,
    tour: 'Muktinath Pilgrimage Journey',
    reviewText:
      'Second time doing this trip with Tirtha Yatri, this time with my whole family. Booking and enquiry process was quick both times.',
    travelDate: new Date('2026-01-22'),
    status: 'pending',
    isFeatured: false,
    isDemo: true,
  },
];

export default reviews;
