/**
 * THE GRAND VELORA — MAIN APPLICATION ENTRY POINT
 * Coordinates page lifecycle, hero quick booking bar, contact form,
 * and agency branding constants.
 */

// ==========================================================================
// V-TECH AGENCY CONFIGURATION
// To change the agency attribution URL across all pages, edit below:
const VTECH_URL = 'https://v-tech.example';
if (typeof window !== 'undefined') {
  window.VTECH_URL = VTECH_URL;
}

(function () {
  'use strict';

  // Apply V-Tech URL to all attribution links dynamically if needed
  document.querySelectorAll('.vtech-link').forEach((link) => {
    link.href = VTECH_URL;
  });

  // Artistic Console Welcome
  console.log(
    '%c THE GRAND VELORA %c Crafted by V-Tech Studio %c',
    'background: #1A1612; color: #C9A25B; font-family: serif; font-size: 14px; padding: 6px 12px; border: 1px solid #C9A25B;',
    'background: #0E0B08; color: #FAF6EE; font-size: 12px; padding: 6px 12px;',
    'background: transparent;'
  );

  // 1. Hero Quick Booking Bar (Home Page)
  const heroQuickBar = document.getElementById('hero-quick-booking-bar');
  if (heroQuickBar) {
    const heroCheckIn = document.getElementById('quick-checkin');
    const heroCheckOut = document.getElementById('quick-checkout');
    const heroGuests = document.getElementById('quick-guests');
    const heroSubmitBtn = document.getElementById('quick-submit-btn');

    // Populate default dates (tomorrow and day + 3)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 3);

    const fmt = (d) => d.toISOString().split('T')[0];

    if (heroCheckIn && heroCheckOut) {
      heroCheckIn.min = fmt(today);
      heroCheckOut.min = fmt(tomorrow);
      heroCheckIn.value = fmt(tomorrow);
      heroCheckOut.value = fmt(dayAfter);

      heroCheckIn.addEventListener('change', () => {
        const inDate = new Date(heroCheckIn.value);
        if (!isNaN(inDate.getTime())) {
          const nextDay = new Date(inDate);
          nextDay.setDate(nextDay.getDate() + 1);
          heroCheckOut.min = fmt(nextDay);
          if (new Date(heroCheckOut.value) <= inDate) {
            heroCheckOut.value = fmt(nextDay);
          }
        }
      });
    }

    heroSubmitBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const inVal = heroCheckIn ? heroCheckIn.value : '';
      const outVal = heroCheckOut ? heroCheckOut.value : '';
      const guestsVal = heroGuests ? heroGuests.value : '2';

      const targetUrl = `booking.html?checkin=${encodeURIComponent(inVal)}&checkout=${encodeURIComponent(outVal)}&guests=${encodeURIComponent(guestsVal)}`;
      window.location.href = targetUrl;
    });
  }

  // 2. Contact Page Form Handler
  const contactForm = document.getElementById('velora-contact-form');
  if (contactForm) {
    const contactSuccessBox = document.getElementById('contact-success-box');
    const contactFields = document.getElementById('contact-fields-container');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      /* ==========================================================================
         V-TECH PRODUCTION HOOK: Contact endpoint (e.g. Formspree or EmailJS)
         fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', ... })
         ========================================================================== */

      if (contactFields && contactSuccessBox) {
        contactFields.style.opacity = '0';
        contactFields.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
          contactFields.style.display = 'none';
          contactSuccessBox.style.display = 'block';

          if (window.lenis) {
            window.lenis.scrollTo(contactSuccessBox, { offset: -100 });
          }
        }, 300);
      }
    });
  }
})();
