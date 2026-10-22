/**
 * THE GRAND VELORA — LUXURY BOOKING INQUIRY CONTROLLER
 * Handles date restrictions, adult & child steppers, URL parameter pre-filling,
 * robust validation with inline error messaging, and animated success state.
 */

(function () {
  'use strict';

  function initBookingEngine() {
    const bookingForm = document.getElementById('velora-booking-form');
    if (!bookingForm) return;

    const checkInInput = document.getElementById('booking-checkin');
    const checkOutInput = document.getElementById('booking-checkout');
    const roomSelect = document.getElementById('booking-room');
    const requestsInput = document.getElementById('booking-requests');

    // Steppers elements
    const adultsVal = document.getElementById('stepper-adults-val');
    const adultsInput = document.getElementById('booking-adults');
    const btnAdultsMinus = document.getElementById('btn-adults-minus');
    const btnAdultsPlus = document.getElementById('btn-adults-plus');

    const childrenVal = document.getElementById('stepper-children-val');
    const childrenInput = document.getElementById('booking-children');
    const btnChildrenMinus = document.getElementById('btn-children-minus');
    const btnChildrenPlus = document.getElementById('btn-children-plus');

    const successBox = document.getElementById('booking-success-box');
    const formFieldsContainer = document.getElementById('booking-fields-container');

    // 1. Date Configuration: Defaults & Minimums
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 3);

    const formatDate = (d) => d.toISOString().split('T')[0];

    if (checkInInput && checkOutInput) {
      checkInInput.min = formatDate(today);
      checkOutInput.min = formatDate(tomorrow);

      // Default placeholder dates if empty
      if (!checkInInput.value) checkInInput.value = formatDate(tomorrow);
      if (!checkOutInput.value) checkOutInput.value = formatDate(dayAfter);

      checkInInput.addEventListener('change', () => {
        const inDate = new Date(checkInInput.value);
        if (!isNaN(inDate.getTime())) {
          const nextDay = new Date(inDate);
          nextDay.setDate(nextDay.getDate() + 1);
          checkOutInput.min = formatDate(nextDay);
          if (new Date(checkOutInput.value) <= inDate) {
            checkOutInput.value = formatDate(nextDay);
          }
        }
      });
    }

    // 2. Stepper Logic
    let adults = 2;
    let children = 0;

    function updateAdults(newVal) {
      adults = Math.max(1, Math.min(6, newVal));
      if (adultsVal) adultsVal.textContent = adults;
      if (adultsInput) adultsInput.value = adults;
    }

    function updateChildren(newVal) {
      children = Math.max(0, Math.min(4, newVal));
      if (childrenVal) childrenVal.textContent = children;
      if (childrenInput) childrenInput.value = children;
    }

    btnAdultsMinus?.addEventListener('click', () => updateAdults(adults - 1));
    btnAdultsPlus?.addEventListener('click', () => updateAdults(adults + 1));
    btnChildrenMinus?.addEventListener('click', () => updateChildren(children - 1));
    btnChildrenPlus?.addEventListener('click', () => updateChildren(children + 1));

    // 3. Pre-fill from URL Parameters (?room=, ?type=)
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');
    const typeParam = urlParams.get('type');

    if (roomParam && roomSelect) {
      const matchOption = Array.from(roomSelect.options).find(
        (opt) => opt.value.toLowerCase().includes(roomParam.toLowerCase()) ||
                 roomParam.toLowerCase().includes(opt.value.toLowerCase())
      );
      if (matchOption) {
        roomSelect.value = matchOption.value;
      }
    }

    if (typeParam && requestsInput) {
      if (typeParam === 'table' || typeParam === 'dining') {
        requestsInput.value = 'Inquiry for Aura Fine Dining & Cellar table reservation.';
      } else if (typeParam === 'spa' || typeParam === 'wellness') {
        requestsInput.value = 'Inquiry for Soma Ayurvedic Spa & Wellness treatment journey.';
      } else if (typeParam === 'event' || typeParam === 'wedding') {
        requestsInput.value = 'Inquiry for hosting an intimate wedding / private gala in the Mirrored Pavilion.';
      }
    }

    // 4. Form Validation & Submission
    function setError(inputEl, message) {
      const parent = inputEl.closest('.form-group');
      if (!parent) return;
      parent.classList.add('has-error');
      const errEl = parent.querySelector('.form-error');
      if (errEl) errEl.textContent = message;
    }

    function clearError(inputEl) {
      const parent = inputEl.closest('.form-group');
      if (!parent) return;
      parent.classList.remove('has-error');
      const errEl = parent.querySelector('.form-error');
      if (errEl) errEl.textContent = '';
    }

    // Clear errors on change
    bookingForm.querySelectorAll('.form-input, .form-select').forEach((input) => {
      input.addEventListener('input', () => clearError(input));
      input.addEventListener('change', () => clearError(input));
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('booking-name');
      const emailInput = document.getElementById('booking-email');
      const phoneInput = document.getElementById('booking-phone');

      // Name validation
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setError(nameInput, 'Please provide your full title & name.');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, 'Please provide a valid correspondence email address.');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Phone validation
      const phoneRegex = /^[\d\s+\-()]{7,16}$/;
      if (!phoneRegex.test(phoneInput.value.trim())) {
        setError(phoneInput, 'Please enter a valid telephone or mobile number.');
        isValid = false;
      } else {
        clearError(phoneInput);
      }

      // Check-in / Check-out validation
      if (checkInInput && checkOutInput) {
        const inDate = new Date(checkInInput.value);
        const outDate = new Date(checkOutInput.value);
        if (outDate <= inDate) {
          setError(checkOutInput, 'Departure date must be after arrival date.');
          isValid = false;
        } else {
          clearError(checkOutInput);
        }
      }

      if (!isValid) return;

      /* ==========================================================================
         INTEGRATION HOOK FOR V-TECH CLIENT PRODUCTION
         --------------------------------------------------------------------------
         Replace the block below with your live booking endpoint or email service:
         e.g., fetch('https://api.v-tech.example/bookings', { method: 'POST', body: ... })
         or Formspree: fetch('https://formspree.io/f/YOUR_ID', { ... })
         or EmailJS: emailjs.sendForm(...)
         ========================================================================== */

      const formDataSummary = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        checkIn: checkInInput ? checkInInput.value : '',
        checkOut: checkOutInput ? checkOutInput.value : '',
        room: roomSelect ? roomSelect.options[roomSelect.selectedIndex].text : 'Selected Suite',
        adults: adults,
        children: children,
        requests: requestsInput ? requestsInput.value.trim() : ''
      };

      console.info('Grand Velora: Booking inquiry prepared for dispatch:', formDataSummary);

      // Transition to elegant success state
      if (formFieldsContainer && successBox) {
        formFieldsContainer.style.opacity = '0';
        formFieldsContainer.style.transition = 'opacity 0.4s ease';

        setTimeout(() => {
          formFieldsContainer.style.display = 'none';
          successBox.classList.add('active');

          const summaryEl = document.getElementById('success-summary-details');
          if (summaryEl) {
            summaryEl.innerHTML = `
              <p><strong>Guest:</strong> ${formDataSummary.name}</p>
              <p><strong>Residence:</strong> ${formDataSummary.room}</p>
              <p><strong>Dates:</strong> ${formDataSummary.checkIn} to ${formDataSummary.checkOut}</p>
              <p><strong>Party:</strong> ${formDataSummary.adults} Adults${formDataSummary.children > 0 ? `, ${formDataSummary.children} Children` : ''}</p>
              <p style="margin-top: 14px; font-size: 0.82rem; color: var(--muted);">
                Our Head Concierge will review your reservation request and contact you within 4 hours at 
                <span style="color: var(--champagne);">${formDataSummary.email}</span>.
              </p>
            `;
          }

          if (window.lenis) {
            window.lenis.scrollTo(successBox, { offset: -120 });
          }
        }, 400);
      }
    });

    // Reset button on success card
    const resetBtn = document.getElementById('booking-reset-btn');
    resetBtn?.addEventListener('click', () => {
      bookingForm.reset();
      updateAdults(2);
      updateChildren(0);
      if (successBox && formFieldsContainer) {
        successBox.classList.remove('active');
        formFieldsContainer.style.display = 'block';
        setTimeout(() => {
          formFieldsContainer.style.opacity = '1';
        }, 50);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingEngine);
  } else {
    initBookingEngine();
  }
})();
