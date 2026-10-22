# The Grand Velora — Luxury Heritage Hotel & Sanctuary
### A Demo Client Showcase by V-Tech Web Studio

> **Notice:** This is an art-directed luxury hotel demonstration website developed by **V-Tech** to showcase boutique web craftsmanship, custom page transitions, and editorial digital experiences for high-end hospitality clients. This is not a real commercial hotel.

---

## 1. Quick Start & Running Locally

The Grand Velora is engineered with **zero build steps** and **zero framework overhead**. It runs directly in modern browsers or via any local static server.

### Option A: Local Python Server (Recommended)
```bash
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

### Option B: Node.js Serve / Live Server
```bash
npx serve .
# or
npx live-server
```

### Option C: Direct File Opening
You can double-click `index.html` to open it directly in Google Chrome, Safari, Firefox, or Microsoft Edge.

---

## 2. Tech Stack & Architecture

- **Core**: Semantic HTML5, CSS3 Custom Properties (CSS variables), Vanilla JavaScript (ES Modules).
- **Smooth Momentum Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) (v1.1.18 via CDN) synchronized with GSAP ScrollTrigger via `gsap.ticker`.
- **Motion & Scroll Triggers**: GSAP 3 + ScrollTrigger (v3.12.5 via CDN).
- **Typography**: Google Fonts:
  - *Cormorant Garamond*: Display headings, pull-quotes, and roman numerals.
  - *Playfair Display*: Suite pricing and historical dates.
  - *Jost*: Micro-labels, eyebrows, forms, and editorial body text.
- **Glassmorphism**: Hardware-accelerated CSS with `backdrop-filter: blur(18px) saturate(140%)`, subtle inner bevel highlights, and solid-color fallback for legacy environments.
- **Atmospheric Layer**: SVG fractally generated film-grain overlay (4.5% opacity) applied across the viewport with zero image download overhead.

---

## 3. Site Architecture & Multi-Page Navigation

All internal links navigate between dedicated HTML documents with seamless exit/enter brand transitions:

1. **`index.html`**: Cinematic 100vh hero with Ken-Burns zoom, glass quick booking bar, asymmetrical heritage narrative, featured room showcases, numbers count-up strip, calm testimonial slider, and full-width CTA.
2. **`rooms.html`**: 5 luxury residence cards (Deluxe Room, Premier Room, Velora Suite, Royal Suite, Presidential Suite) with interactive FLIP filter chips (All, Rooms, Suites).
3. **`amenities.html`**: 4 alternating editorial showcases (The Azure Cistern Pool, Soma Ayurvedic Sanctuary, Aura Fine Dining & Cellar, The Mirrored Pavilion) and custom SVG inline service tags.
4. **`booking.html`**: Split reservation layout with custom date inputs, adult/child steppers, URL parameter pre-filling (`?room=`, `?type=`), inline error handling, and animated SVG checkmark success state.
5. **`about.html`**: 60-year estate history, 4-node chronological timeline (1962–Present), and responsive masonry photography gallery with keyboard-accessible Lightbox.
6. **`contact.html`**: Direct concierge desk channels, contact enquiry form with instant feedback, arrival guide, and stylized dark vector map with coordinates.

---

## 4. Customizing for Client Production

### A. Changing the V-Tech Agency Attribution URL
The agency attribution link is defined in a single exported constant:
Open `js/main.js` and edit:
```javascript
export const VTECH_URL = 'https://v-tech.example'; // Replace with your agency domain
```

### B. Updating Contact Details (Phone & Email)
All contact placeholders across the 6 pages use:
- **Email**: `vaibhav.isti@gmail.com`
- **Phone**: `9555882573` (with `tel:9555882573`)
Search and replace these two strings across the HTML files when deploying for a new client.

### C. Replacing Photography
All photography paths and metadata are organized centrally in `js/images-config.js` and documented in `assets/images/README.md`.
1. Place client photography in `assets/images/`.
2. Update URLs or filenames inside `js/images-config.js` or directly inside the `<img>` tags.
3. Every image includes dark placeholder backgrounds (`--charcoal` or `--umber`) to eliminate Cumulative Layout Shift (CLS).

### D. Connecting the Booking Form to a Live Backend / Email Service
The booking engine in `js/booking.js` includes a clean integration point:
```javascript
/* ==========================================================================
   INTEGRATION HOOK FOR V-TECH CLIENT PRODUCTION
   ========================================================================== */
// Example using Formspree:
// fetch('https://formspree.io/f/YOUR_FORM_ID', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(formDataSummary)
// });

// Example using EmailJS:
// emailjs.send('service_id', 'template_id', formDataSummary);
```

### E. Color Palette Adjustments
All colors are centralized in `css/base.css`:
```css
:root {
  --ink: #0E0B08;         /* Base canvas */
  --charcoal: #1A1612;    /* Card surfaces */
  --umber: #2A2118;       /* Subtle elevation */
  --gold: #C9A25B;        /* Primary imperial accent */
  --gold-light: #E3C88F;  /* Luster highlight */
  --champagne: #F1E6D0;   /* Cream secondary */
  --ivory: #FAF6EE;       /* Crisp typography */
  --muted: #9A8F7E;       /* Meta & subtitles */
}
```

---

## 5. Accessibility & Performance
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`. Instant transitions, animated transitions disabled, smooth scroll bypassed.
- **Semantic HTML**: Proper landmark hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), visible `:focus-visible` gold indicators, and `.skip-link`.
- **Keyboard Navigation**: Lightbox modal fully navigable via `Escape`, `ArrowLeft`, and `ArrowRight`. Mobile menu traps and restores focus.
- **Cache Resilience**: `pageshow` listener guards against stuck overlays during back/forward browser cache navigation (`event.persisted`).

---

&copy; 2026 The Grand Velora. Crafted by **V-Tech**.
