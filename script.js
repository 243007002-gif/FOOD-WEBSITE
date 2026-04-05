/**
 * Bibek Roy Fine Dining – Main JavaScript
 * All interactions, animations and effects
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // CUSTOM CURSOR
  // ============================
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth cursor ring follow
    const animateCursorRing = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateCursorRing);
    };
    animateCursorRing();

    // Hover effects on interactive elements
    const interactables = document.querySelectorAll('a, button, .hero-card, .menu-item, .award-card, .team-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });

    // Hide on mobile
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      cursorRing.style.display = 'none';
    }
  }

  // ============================
  // NAVIGATION SCROLL EFFECT
  // ============================
  const nav = document.getElementById('main-nav');
  if (nav) {
    const handleNavScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // ============================
  // HAMBURGER MENU OVERLAY
  // ============================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuOverlayClose = document.getElementById('menu-overlay-close');

  const openOverlay = () => {
    menuOverlay.classList.add('open');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    menuOverlay.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn && menuOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      if (menuOverlay.classList.contains('open')) {
        closeOverlay();
      } else {
        openOverlay();
      }
    });
  }

  if (menuOverlayClose) {
    menuOverlayClose.addEventListener('click', closeOverlay);
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('open')) {
      closeOverlay();
    }
  });

  // ============================
  // SCROLL REVEAL ANIMATIONS
  // ============================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ============================
  // MENU PAGE – CATEGORY TABS
  // ============================
  const catBtns = document.querySelectorAll('.menu-cat-btn');
  const menuSections = document.querySelectorAll('.menu-section');
  const menuStickyImg = document.getElementById('menu-sticky-img');

  // Category images mapping
  const categoryImages = {
    starters: 'images/dish_seafood.png',
    mains: 'images/dish_steak.png',
    seafood: 'images/dish_seafood.png',
    desserts: 'images/dish_cocktail.png',
    cocktails: 'images/dish_cocktail.png'
  };

  if (catBtns.length > 0) {
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;

        // Update active button
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding section
        menuSections.forEach(section => {
          section.classList.remove('active');
        });
        const targetSection = document.getElementById('section-' + cat);
        if (targetSection) {
          targetSection.classList.add('active');
          // Re-trigger reveal animations for new items
          targetSection.querySelectorAll('.reveal').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        }

        // Update sticky image with smooth transition
        if (menuStickyImg && categoryImages[cat]) {
          menuStickyImg.style.opacity = '0';
          menuStickyImg.style.transform = 'scale(1.05)';
          setTimeout(() => {
            menuStickyImg.src = categoryImages[cat];
            menuStickyImg.style.opacity = '1';
            menuStickyImg.style.transform = 'scale(1)';
          }, 300);
        }
      });
    });

    // Trigger initial reveal for active section
    const activeSection = document.querySelector('.menu-section.active');
    if (activeSection) {
      setTimeout(() => {
        activeSection.querySelectorAll('.reveal').forEach(el => {
          el.classList.add('visible');
        });
      }, 100);
    }
  }

  // Menu sticky image transition style
  if (menuStickyImg) {
    menuStickyImg.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
  }

  // ============================
  // RESERVATION FORM
  // ============================
  const reservationForm = document.getElementById('reservation-form');
  const formSuccess = document.getElementById('form-success');

  // Set minimum date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    // Set max date to 3 months ahead
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const mxYyyy = maxDate.getFullYear();
    const mxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
    const mxDd = String(maxDate.getDate()).padStart(2, '0');
    dateInput.max = `${mxYyyy}-${mxMm}-${mxDd}`;
  }

  if (reservationForm) {
    // Real-time validation feedback
    const requiredInputs = reservationForm.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all required fields
      let isValid = true;
      requiredInputs.forEach(input => {
        if (!validateField(input)) isValid = false;
      });

      if (!isValid) {
        // Shake the submit button
        const submitBtn = document.getElementById('submit-reservation');
        submitBtn.style.animation = 'shake 0.4s ease';
        setTimeout(() => submitBtn.style.animation = '', 400);
        return;
      }

      // Simulate form submission
      const submitBtn = document.getElementById('submit-reservation');
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        // Show success state
        reservationForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('show');
        }
      }, 1500);
    });
  }

  function validateField(input) {
    const value = input.value.trim();
    let isValid = true;

    // Remove existing error
    clearFieldError(input);

    if (!value) {
      showFieldError(input, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(value)) {
      showFieldError(input, 'Please enter a valid email address');
      isValid = false;
    } else if (input.type === 'tel' && value.length < 7) {
      showFieldError(input, 'Please enter a valid phone number');
      isValid = false;
    }

    return isValid;
  }

  function showFieldError(input, message) {
    input.style.borderColor = '#e05555';
    input.style.background = 'rgba(224, 85, 85, 0.06)';

    // Create or update error message
    let errorEl = input.parentElement.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      errorEl.style.cssText = 'font-size:10px; color:#e05555; letter-spacing:1px; margin-top:4px; display:block;';
      input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearFieldError(input) {
    input.style.borderColor = '';
    input.style.background = '';
    const errorEl = input.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.remove();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ============================
  // HERO CARD HOVER PARALLAX
  // ============================
  const heroCards = document.querySelectorAll('.hero-card');
  heroCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = card.querySelector('.hero-card-img');
      if (img) {
        img.style.transform = `scale(1.08) translate(${x * 10}px, ${y * 10}px)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('.hero-card-img');
      if (img) {
        img.style.transform = '';
      }
    });
  });

  // ============================
  // HERO LEFT PARALLAX ON SCROLL
  // ============================
  const heroLeft = document.querySelector('.hero-left');
  const heroBgImage = document.querySelector('.hero-bg-image');

  if (heroLeft && heroBgImage) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBgImage.style.transform = `scale(1.04) translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ============================
  // SMOOTH IMAGE LOADING
  // ============================
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
    }
  });

  // ============================
  // Page transition effect
  // ============================
  const pageLinks = document.querySelectorAll('a[href]');
  pageLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Only handle internal links
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      });
    }
  });

  // Fade in on page load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

});

// ============================
// CSS Animation for Shake
// ============================
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);
