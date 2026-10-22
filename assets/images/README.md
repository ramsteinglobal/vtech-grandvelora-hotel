# The Grand Velora — Image Asset Manifest & Replacement Guide

This document lists all photography assets used throughout **The Grand Velora** website.
To replace any image with bespoke client photography, place the new image file in `/assets/images/` and update the reference in `/js/images-config.js` or directly inside the corresponding HTML template.

---

## 1. Hero & Atmospheric Sections
| Asset Key | Suggested Dimensions | Subject / Mood | Default Source / URL |
| :--- | :--- | :--- | :--- |
| `hero_home` | 2400 × 1600 px | Palatial estate exterior at twilight, warm lantern reflections, water court | `https://images.unsplash.com/photo-1566073771259-6a8506099945` |
| `story_architecture` | 1400 × 1800 px | Arched colonnade, warm amber stone, dramatic shadow play | `https://images.unsplash.com/photo-1582719508461-905c673771fd` |
| `cta_banner` | 2400 × 1200 px | Twilight reflection terrace, candlelit courtyard overlooking hills | `https://images.unsplash.com/photo-1613490493576-7fde63acd811` |

---

## 2. Rooms & Suites
| Room Slug | Suggested Dimensions | Subject / Mood | Default Source / URL |
| :--- | :--- | :--- | :--- |
| `deluxe-room` | 1600 × 1060 px | King bed, teak woodwork, soft bedside alabaster lamps | `https://images.unsplash.com/photo-1590490360182-c33d57733427` |
| `premier-room` | 1600 × 1060 px | Expansive room with private garden terrace & marble alcove | `https://images.unsplash.com/photo-1618773928121-c32242e63f39` |
| `velora-suite` | 1600 × 1060 px | Living salon, brass chandeliers, bespoke raw silk textiles | `https://images.unsplash.com/photo-1578683010236-d716f9a3f461` |
| `royal-suite` | 1600 × 1060 px | Carved heritage arches, deep soaking marble tub, courtyard view | `https://images.unsplash.com/photo-1591088398332-8a7791972843` |
| `presidential-suite` | 1600 × 1060 px | Two-story penthouse suite, private plunge pool, panoramic estate vista | `https://images.unsplash.com/photo-1631049307264-da0ec9d70304` |

---

## 3. Amenities & Dining
| Amenity Slug | Suggested Dimensions | Subject / Mood | Default Source / URL |
| :--- | :--- | :--- | :--- |
| `pool_azure` | 1800 × 1200 px | "The Azure Cistern" — Stepped sandstone pool, floating oil lamps | `https://images.unsplash.com/photo-1571896349842-33c89424de2d` |
| `spa_soma` | 1800 × 1200 px | "Soma Sanctuary" — Ayurvedic apothecary, brass bowls, warm steam | `https://images.unsplash.com/photo-1544161515-4ab6ce6db874` |
| `dining_aura` | 1800 × 1200 px | "Aura Restaurant" — Intimate candlelit tables, vintage cellar, crystal | `https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c` |
| `events_mirrored`| 1800 × 1200 px | "Mirrored Pavilion" — Grand gala courtyard, chandeliers, evening banqueting | `https://images.unsplash.com/photo-1519167758481-83f550bb49b3` |

---

## 4. Heritage & Gallery (About Page)
| Key | Dimensions | Description | Default Source / URL |
| :--- | :--- | :--- | :--- |
| `gallery_1` | 1200 × 800 px | Handcrafted brass & copper tea ritual service | `https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd` |
| `gallery_2` | 800 × 1200 px | Twilight stone terrace with lantern reflection | `https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7` |
| `gallery_3` | 1200 × 900 px | Colonnade loungers facing private heritage courtyard | `https://images.unsplash.com/photo-1520250497591-112f2f40a3f4` |
| `gallery_4` | 900 × 1200 px | Restored 1960s library lounge with stone hearth | `https://images.unsplash.com/photo-1507038772120-7fff76f79d74` |
| `gallery_5` | 1200 × 800 px | Private aromatic garden alcove & fountain | `https://images.unsplash.com/photo-1540541338287-41700207dee6` |
| `gallery_6` | 1200 × 800 px | Aerial panorama of estate grounds at sunrise | `https://images.unsplash.com/photo-1542314831-068cd1dbfeeb` |

---

## Replacement Instructions for V-Tech Clients
1. Save your high-resolution photographs into `assets/images/` using meaningful names (e.g., `hero-estate.webp`).
2. Update the corresponding URL in `js/images-config.js` or directly replace the `src` attribute in HTML.
3. Keep image aspect ratios consistent for optimal alignment.
4. Ensure dark fallback backgrounds remain set via CSS (`--charcoal` or `--umber`) to guarantee zero layout shift while loading.
