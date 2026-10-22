/**
 * THE GRAND VELORA — ANIMATIONS & SCROLL TRIGGERS
 * Handles text splits, ScrollTrigger reveals, parallax, magnetic CTAs,
 * counter animations, and testimonial slider.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('Grand Velora: GSAP not loaded yet.');
      return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Text Line/Word Splitter (Free, Vanilla Alternative to Paid SplitText)
    function splitTextLines(selector) {
      if (prefersReducedMotion) return;

      document.querySelectorAll(selector).forEach((el) => {
        // Prevent re-splitting
        if (el.dataset.splitDone) return;
        el.dataset.splitDone = 'true';

        const words = el.innerText.trim().split(/\s+/);
        el.innerHTML = '';

        words.forEach((word) => {
          const wordWrapper = document.createElement('span');
          wordWrapper.className = 'word-wrap';
          wordWrapper.style.display = 'inline-block';
          wordWrapper.style.overflow = 'hidden';
          wordWrapper.style.verticalAlign = 'top';

          const wordInner = document.createElement('span');
          wordInner.className = 'word-inner';
          wordInner.style.display = 'inline-block';
          wordInner.textContent = word + '\u00A0';

          wordWrapper.appendChild(wordInner);
          el.appendChild(wordWrapper);
        });
      });
    }

    // Split hero titles
    splitTextLines('.hero-headline-split');

    // 2. Hero Headline Entrance (after page transition completes)
    function animateHero() {
      const heroWords = document.querySelectorAll('.hero-headline-split .word-inner');
      const heroEyebrow = document.querySelector('.hero-eyebrow');
      const heroSubtext = document.querySelector('.hero-subtext');
      const heroCtas = document.querySelector('.hero-actions');
      const heroBar = document.querySelector('.hero-booking-bar');

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ delay: 0.2 });

      if (heroEyebrow) {
        tl.fromTo(heroEyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      }

      if (heroWords.length > 0) {
        tl.fromTo(
          heroWords,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.045, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (heroSubtext) {
        tl.fromTo(heroSubtext, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');
      }

      if (heroCtas) {
        tl.fromTo(heroCtas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');
      }

      if (heroBar) {
        tl.fromTo(heroBar, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.7');
      }
    }

    // Trigger hero entrance after transition completes or immediately if already loaded
    window.addEventListener('velora:transitionComplete', animateHero);
    setTimeout(animateHero, 400);

    if (prefersReducedMotion) return;

    // 3. ScrollTrigger Reveals for Elements & Cards
    if (typeof ScrollTrigger !== 'undefined') {
      // Standard fade + rise reveals
      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Staggered reveals for grids
      gsap.utils.toArray('.reveal-stagger-parent').forEach((parent) => {
        const children = parent.querySelectorAll('.reveal-child');
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: parent,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // Parallax on images with [data-speed]
      gsap.utils.toArray('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.15;
        gsap.to(el, {
          yPercent: speed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Hero background image slow Ken-Burns zoom on scroll
      const heroBg = document.querySelector('.hero-bg-media');
      if (heroBg) {
        gsap.to(heroBg, {
          scale: 1.15,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 4. Numbers Counter Animation
      gsap.utils.toArray('.stat-number').forEach((counter) => {
        const targetValue = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetValue,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          onUpdate: function () {
            counter.textContent = Math.floor(obj.val).toString();
          },
        });
      });
    }

    // 5. Magnetic CTA Button Effect
    document.querySelectorAll('.btn-magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.35,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });

    // 6. Testimonial Crossfade Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (slides.length > 0) {
      let currentIndex = 0;

      function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex]?.classList.remove('active');

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('active');
        dots[currentIndex]?.classList.add('active');
      }

      prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
      nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => goToSlide(idx));
      });
    }
  }

  // 7. Rooms Page Smooth Filter with FLIP Animation
  window.initRoomFilter = function () {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.room-card-wrapper');

    if (!chips.length || !cards.length) return;

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const filter = chip.getAttribute('data-filter');

        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        // Capture First state
        const firstPositions = new Map();
        cards.forEach((card) => {
          firstPositions.set(card, card.getBoundingClientRect());
        });

        // Apply DOM visibility change
        cards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });

        if (prefersReducedMotion) return;

        // Animate Last to Invert
        cards.forEach((card) => {
          if (card.style.display !== 'none') {
            const first = firstPositions.get(card);
            const last = card.getBoundingClientRect();
            if (first) {
              const deltaX = first.left - last.left;
              const deltaY = first.top - last.top;

              gsap.fromTo(
                card,
                { x: deltaX, y: deltaY, scale: 0.96, opacity: 0.5 },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' }
              );
            }
          }
        });

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
