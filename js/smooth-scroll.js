/**
 * THE GRAND VELORA — SMOOTH SCROLL (LENIS + GSAP TICKER)
 * Synchronizes Lenis smooth momentum scrolling with GSAP ScrollTrigger.
 */

(function () {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.info('Grand Velora: prefers-reduced-motion active, smooth scroll bypassed.');
    return;
  }

  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') {
      console.warn('Grand Velora: Lenis library not yet loaded. Retrying in 100ms...');
      setTimeout(initSmoothScroll, 100);
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Scroll progress bar indicator
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      lenis.on('scroll', (e) => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) {
          const progress = Math.min(100, Math.max(0, (e.scroll / total) * 100));
          progressBar.style.width = `${progress}%`;
        }
      });
    }

    // Smooth scroll for internal hash anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          lenis.scrollTo(href, { offset: -80, duration: 1.2 });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }
})();
