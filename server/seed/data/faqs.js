const faqs = [
  // Booking
  { question: 'How far in advance should I book a Muktinath trip?', answer: 'We recommend booking at least 2-3 weeks ahead, especially during peak season (March-June, September-November) when flights and jeeps fill up quickly. For Upper Mustang itineraries, book 4+ weeks ahead to allow time for the Restricted Area Permit.', category: 'booking', order: 1, isActive: true },
  { question: 'Can I book a package for just myself?', answer: 'Yes. Jeep and flight packages can be arranged for solo travellers, though per-person pricing is generally lower in a shared group. Helicopter charters can also be booked solo at the private-charter rate.', category: 'booking', order: 2, isActive: true },
  { question: 'How do I customize an existing package?', answer: 'Use the "Customize This Trip" option on any package page, or fill out our Customize Your Trip form. Our team will get back to you with an adjusted itinerary and quote, usually within 24 hours.', category: 'booking', order: 3, isActive: true },

  // Payment
  { question: 'What payment methods do you accept?', answer: 'We accept bank transfer, major international cards, and popular digital wallets for online payments. Full payment details are shared once your itinerary is confirmed.', category: 'payment', order: 1, isActive: true },
  { question: 'Do I need to pay the full amount upfront?', answer: 'No — a deposit secures your booking, with the balance due before departure. Exact deposit terms are confirmed at the time of booking and vary slightly by package.', category: 'payment', order: 2, isActive: true },
  { question: 'Are prices per person or per group?', answer: 'Listed prices are per person based on the group size shown for that package. Private/custom charters (like helicopter journeys) are priced per trip unless stated otherwise.', category: 'payment', order: 3, isActive: true },

  // Travel documents
  { question: 'Do foreign nationals need a permit to visit Muktinath?', answer: 'Yes — an ACAP (Annapurna Conservation Area Permit) is required for the Muktinath region. If your itinerary continues into Upper Mustang, a separate Restricted Area Permit (RAP) is also required.', category: 'travel-documents', order: 1, isActive: true },
  { question: 'Can your team arrange permits for me?', answer: 'Yes, permit arrangement is included in all our packages that require one. You\'ll just need to provide a valid passport copy and passport-sized photos in advance.', category: 'travel-documents', order: 2, isActive: true },
  { question: 'Do Indian nationals need a visa for Nepal?', answer: 'Indian nationals do not need a visa to enter Nepal, but should carry a valid passport or voter ID card. All other nationalities should check Nepal\'s visa-on-arrival eligibility before travel.', category: 'travel-documents', order: 3, isActive: true },

  // Muktinath travel
  { question: 'What is the best time of year to visit Muktinath?', answer: 'March-June and September-November offer the clearest skies and most reliable flight/jeep conditions. Upper Mustang, being in a rain-shadow, is also comfortably visitable through the monsoon (June-August).', category: 'muktinath-travel', order: 1, isActive: true },
  { question: 'How long does it take to reach Muktinath from Pokhara?', answer: 'By jeep, roughly 2 days with an overnight stop. By flight to Jomsom plus a short transfer, same-day arrival is possible. By helicopter, under an hour each way.', category: 'muktinath-travel', order: 2, isActive: true },
  { question: 'Is Muktinath open to visitors of all faiths?', answer: 'Yes. Muktinath is sacred to both Hindus and Buddhists and welcomes visitors of any background, provided modest dress and respectful conduct are observed within the temple complex.', category: 'muktinath-travel', order: 3, isActive: true },

  // Accommodation
  { question: 'What type of accommodation should I expect?', answer: 'Comfortable teahouses and guesthouses along the main route (Pokhara-Jomsom-Muktinath), typically twin-sharing with attached or shared bathrooms. Accommodation becomes more basic beyond Kagbeni in Upper Mustang.', category: 'accommodation', order: 1, isActive: true },
  { question: 'Can I request a single room?', answer: 'Single rooms can usually be arranged for an additional charge, subject to availability at each stop — let us know at the time of booking.', category: 'accommodation', order: 2, isActive: true },

  // Transportation
  { question: 'Are the jeep roads safe?', answer: 'Yes, though sections are unpaved and can be dusty or bumpy, particularly between Beni and Jomsom. Our drivers are experienced on this specific route and vehicles are regularly inspected.', category: 'transportation', order: 1, isActive: true },
  { question: 'What happens if my flight to Jomsom is delayed or cancelled?', answer: 'Mountain flights are weather-dependent and delays do happen, mostly in the early morning. We build buffer time into flight-based itineraries where possible, and will rearrange your schedule or offer a jeep alternative if needed.', category: 'transportation', order: 2, isActive: true },

  // Health & altitude
  { question: 'Is altitude sickness a concern at Muktinath\'s elevation?', answer: 'At 3,710m, mild symptoms (headache, light breathlessness) are possible but serious acute mountain sickness is uncommon for a short visit. Staying hydrated and pacing yourself is usually enough — our guides are trained to recognize warning signs.', category: 'health-altitude', order: 1, isActive: true },
  { question: 'Is this trip suitable for elderly travellers?', answer: 'Yes, especially the flight and helicopter routes, which minimize physical exertion. We recommend a doctor\'s check-in beforehand for travellers with pre-existing heart or respiratory conditions.', category: 'health-altitude', order: 2, isActive: true },

  // Cancellation
  { question: 'What is your cancellation policy?', answer: 'Cancellations made well in advance of departure receive a partial refund of the deposit; later cancellations are subject to reduced or no refund, as flights, jeeps and permits are booked on your behalf ahead of time. Full terms are shared at booking.', category: 'cancellation', order: 1, isActive: true },
  { question: 'Can I reschedule instead of cancelling?', answer: 'In most cases, yes — we\'ll do our best to shift your booking to new dates, subject to seasonal availability of flights, jeeps and permits.', category: 'cancellation', order: 2, isActive: true },
];

export default faqs;
