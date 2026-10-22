/**
 * THE GRAND VELORA — NAVIGATION & HEADER CONTROLLER
 * Glassmorphism on scroll, smart hide/reveal on scroll direction,
 * active link highlighting, mobile menu state, and newsletter submission.
 */

(function () {
  'use strict';

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // 1. Highlight Active Page Link based on pathname
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.split('/').pop().split('?')[0];

      if (
        (currentPath === '' && (linkPath === 'index.html' || linkPath === '')) ||
        currentPath === linkPath ||
        (currentPath === 'index.html' && linkPath === '')
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 2. Scroll Behavior: Glass transformation & smart hide/reveal
    let lastScrollY = window.scrollY;
    let scrollThreshold = 40;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Toggle glass background
      if (currentScrollY > scrollThreshold) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }

      // Hide on scroll down, show on scroll up (only past 120px)
      if (currentScrollY > 120 && currentScrollY > lastScrollY && !mobileMenu?.classList.contains('open')) {
        header?.classList.add('header-hidden');
      } else {
        header?.classList.remove('header-hidden');
      }

      lastScrollY = Math.max(0, currentScrollY);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 3. Mobile Menu Toggle
    if (menuToggle && mobileMenu) {
      function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      }

      function openMenu() {
        menuToggle.classList.add('is-active');
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();
      }

      function closeMenu() {
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
      }

      menuToggle.addEventListener('click', toggleMenu);

      // Close on ESC key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          closeMenu();
        }
      });

      // Close on clicking mobile link
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });
    }

    // 4. Footer Newsletter Interactive Feedback
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const feedback = newsletterForm.parentElement.querySelector('.newsletter-feedback');
        if (input && input.value.trim().length > 3) {
          input.value = '';
          if (feedback) {
            feedback.textContent = 'Thank you for subscribing to our private journal.';
            feedback.style.display = 'block';
            setTimeout(() => {
              feedback.style.display = 'none';
            }, 5000);
          }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
