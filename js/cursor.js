/**
 * THE GRAND VELORA — BESPOKE LUXURY CURSOR
 * Gold dot and smooth lag ring on desktop devices with hover expansion.
 */

(function () {
  'use strict';

  // Only initialize on desktop pointer devices
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  // Create elements if not in DOM
  let dot = document.querySelector('.custom-cursor-dot');
  let ring = document.querySelector('.custom-cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(ring);
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }

    // Instant position for precision dot
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  // Smooth lerp loop for outer gold ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover state detection
  const interactiveSelectors = 'a, button, input, select, textarea, .room-card, .filter-chip, [role="button"], .interactive-element';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });
})();
