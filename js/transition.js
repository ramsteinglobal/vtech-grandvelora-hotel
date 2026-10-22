/**
 * THE GRAND VELORA — PAGE TRANSITIONS & BRAND LOADER
 * Handles intercepted page navigation, logo SVG stroke drawing,
 * first-visit intro duration vs quick subsequent transitions,
 * and pageshow cache resilience.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'velora_has_visited';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Render overlay into DOM if not present
  function ensureOverlayExists() {
    let overlay = document.getElementById('page-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'page-transition-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = `
        <div class="transition-brand">
          <div class="transition-monogram-circle">
            <svg class="transition-v-svg" viewBox="0 0 32 32" aria-hidden="true">
              <path class="transition-svg-stroke" d="M7 8 L16 25 L25 8" />
            </svg>
          </div>
          <div class="transition-brand-title">The Grand Velora</div>
          <div class="transition-brand-subtitle">Est. 1962</div>
          <div class="transition-line"></div>
        </div>
      `;
      document.body.prepend(overlay);
    }
    return overlay;
  }

  // Handle Entrance Animation on Page Load
  function handlePageEntrance() {
    const overlay = ensureOverlayExists();
    const hasVisited = sessionStorage.getItem(STORAGE_KEY);

    // Initial state: visible
    overlay.classList.add('is-entering');

    // First visit: ~1.4s intro with full SVG stroke draw; subsequent: fast reveal (~300ms)
    const holdDuration = prefersReducedMotion ? 100 : (hasVisited ? 280 : 1200);

    setTimeout(() => {
      overlay.classList.remove('is-entering');
      overlay.classList.add('is-revealed');
      sessionStorage.setItem(STORAGE_KEY, 'true');

      // Dispatch event for other animations (e.g. hero text reveal)
      window.dispatchEvent(new CustomEvent('velora:transitionComplete'));

      // Remove from flow after translateY animation completes
      setTimeout(() => {
        overlay.classList.remove('is-revealed');
      }, 700);
    }, holdDuration);
  }

  // Intercept Internal Links
  function handleLinkClick(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore anchors, external links, new tabs, tel, mailto, javascript:
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.getAttribute('target') === '_blank' ||
      link.hasAttribute('download') ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }

    // Check if target is on same domain
    const targetUrl = new URL(link.href, window.location.href);
    if (targetUrl.origin !== window.location.origin) {
      return; // External link
    }

    // If clicking current page without params/hash difference, do nothing
    if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
      e.preventDefault();
      return;
    }

    // Intercept navigation
    e.preventDefault();
    const overlay = ensureOverlayExists();

    overlay.classList.remove('is-revealed');
    overlay.classList.add('is-exiting');

    // Replay SVG animation on exit
    const stroke = overlay.querySelector('.transition-svg-stroke');
    if (stroke) {
      stroke.style.animation = 'none';
      void stroke.offsetWidth; // Force reflow
      stroke.style.animation = '';
    }

    const exitDuration = prefersReducedMotion ? 150 : 380;
    setTimeout(() => {
      window.location.href = link.href;
    }, exitDuration);
  }

  // Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ensureOverlayExists();
      handlePageEntrance();
      document.addEventListener('click', handleLinkClick);
    });
  } else {
    ensureOverlayExists();
    handlePageEntrance();
    document.addEventListener('click', handleLinkClick);
  }

  // Critical Resilience: back/forward bfcache protection
  window.addEventListener('pageshow', (event) => {
    const overlay = document.getElementById('page-transition-overlay');
    if (overlay) {
      overlay.classList.remove('is-exiting');
      overlay.classList.remove('is-entering');
      overlay.classList.add('is-revealed');
      setTimeout(() => {
        overlay.classList.remove('is-revealed');
      }, 300);
    }
  });

})();
