/**
 * THE GRAND VELORA — ACCESSIBLE GALLERY LIGHTBOX
 * Keyboard accessible (ESC, Left/Right arrows), smooth modal focus management,
 * and high-resolution imagery display with editorial captions.
 */

(function () {
  'use strict';

  function initLightbox() {
    const galleryItems = document.querySelectorAll('[data-lightbox-item]');
    if (!galleryItems.length) return;

    // Create Lightbox DOM structure if not present
    let lightbox = document.getElementById('velora-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'velora-lightbox';
      lightbox.className = 'lightbox-modal';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Estate Photography Gallery Lightbox');
      lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-dialog">
          <button class="lightbox-close" aria-label="Close image gallery">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <button class="lightbox-nav lightbox-prev" aria-label="Previous photograph">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="" />
            <div class="lightbox-caption"></div>
          </div>

          <button class="lightbox-nav lightbox-next" aria-label="Next photograph">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const imgEl = lightbox.querySelector('.lightbox-image');
    const captionEl = lightbox.querySelector('.lightbox-caption');

    let currentIndex = 0;
    let lastActiveElement = null;

    const itemsData = Array.from(galleryItems).map((item) => ({
      src: item.getAttribute('data-full-src') || item.querySelector('img')?.src || '',
      caption: item.getAttribute('data-caption') || item.querySelector('img')?.alt || '',
      alt: item.querySelector('img')?.alt || 'The Grand Velora Estate Photography'
    }));

    function showImage(index) {
      currentIndex = (index + itemsData.length) % itemsData.length;
      const data = itemsData[currentIndex];

      imgEl.style.opacity = '0';
      imgEl.src = data.src;
      imgEl.alt = data.alt;
      captionEl.textContent = data.caption;

      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
    }

    function openLightbox(index) {
      lastActiveElement = document.activeElement;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();

      showImage(index);
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();

      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    }

    // Attach click listeners to gallery thumbnails
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
      // Keyboard Enter/Space
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
