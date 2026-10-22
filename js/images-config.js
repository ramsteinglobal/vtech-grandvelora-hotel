/**
 * The Grand Velora — Central Photography Configuration
 * Curated high-resolution imagery for luxury hospitality.
 * To customize with client photography, replace URLs below.
 */

const IMAGES = {
  hero: {
    home: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
    rooms: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=85',
    amenities: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=85',
    booking: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=85',
    about: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85',
    contact: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=85',
  },
  rooms: {
    deluxe: {
      title: 'Deluxe Room',
      slug: 'deluxe-room',
      category: 'rooms',
      sqft: '520 sq ft',
      bed: 'King Bed',
      guests: '2 Guests',
      price: '₹12,500',
      priceNumber: 12500,
      description: 'An intimate sanctuary framed in oiled teakwood, custom brass reading lamps, and a private courtyard view.',
      amenities: ['Private Veranda', 'Rain Shower', 'Artisanal Bar'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85'
    },
    premier: {
      title: 'Premier Room',
      slug: 'premier-room',
      category: 'rooms',
      sqft: '680 sq ft',
      bed: 'King Bed',
      guests: '2 Guests',
      price: '₹16,000',
      priceNumber: 16000,
      description: 'Generously proportioned with an arched window alcove, deep freestanding soaking tub, and garden vistas.',
      amenities: ['Soaking Tub', 'Garden Terrace', 'Pillow Menu'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85'
    },
    veloraSuite: {
      title: 'Velora Suite',
      slug: 'velora-suite',
      category: 'suites',
      sqft: '980 sq ft',
      bed: 'King Bed',
      guests: '3 Guests',
      price: '₹24,000',
      priceNumber: 24000,
      description: 'A distinguished residence featuring an independent salon, hand-loomed raw silk wall coverings, and dedicated butler pantry.',
      amenities: ['Living Salon', 'Butler Service', 'Walk-in Dressing'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85'
    },
    royalSuite: {
      title: 'Royal Suite',
      slug: 'royal-suite',
      category: 'suites',
      sqft: '1,450 sq ft',
      bed: 'Palatial King',
      guests: '4 Guests',
      price: '₹38,000',
      priceNumber: 38000,
      description: 'Heritage architecture brought to life: double-height hand-plastered ceilings, antique fireplace, and private plunge pool.',
      amenities: ['Private Plunge Pool', 'Dining Room', 'Heritage Balcony'],
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85'
    },
    presidentialSuite: {
      title: 'Presidential Suite',
      slug: 'presidential-suite',
      category: 'suites',
      sqft: '2,400 sq ft',
      bed: 'Master & Guest King',
      guests: '5 Guests',
      price: '₹65,000',
      priceNumber: 65000,
      description: 'The estate’s crowning residence. Two-story duplex with grand reception salon, private terrace garden, and 360° estate panorama.',
      amenities: ['Dual Terraces', 'Chef Prep Kitchen', 'Private Spa Room'],
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85'
    }
  },
  amenities: {
    pool: {
      title: 'The Azure Cistern',
      tagline: 'Quiet reflection beneath stone archways',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=85'
    },
    spa: {
      title: 'Soma Sanctuary',
      tagline: 'Ancient Ayurvedic therapies & botanical oils',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=85'
    },
    dining: {
      title: 'Aura Fine Dining',
      tagline: 'Heritage recipes elevated with modern subtlety',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85'
    },
    events: {
      title: 'The Mirrored Pavilion',
      tagline: 'Intimate galas and timeless private celebrations',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85'
    }
  },
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85',
      caption: 'Afternoon saffron infusion in hand-hammered brass',
      aspect: 'landscape'
    },
    {
      src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=85',
      caption: 'The water court illuminated for twilight raga',
      aspect: 'portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
      caption: 'Veranda reading nooks facing the central gardens',
      aspect: 'landscape'
    },
    {
      src: 'https://images.unsplash.com/photo-1507038772120-7fff76f79d74?auto=format&fit=crop&w=900&q=85',
      caption: 'The 1962 Library lounge and heritage fireplace',
      aspect: 'portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
      caption: 'Secluded jasmine courtyard pavilion at dusk',
      aspect: 'landscape'
    },
    {
      src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
      caption: 'Morning mist settling over the estate grounds',
      aspect: 'landscape'
    }
  ]
};

if (typeof window !== 'undefined') {
  window.VELORA_IMAGES = IMAGES;
}
