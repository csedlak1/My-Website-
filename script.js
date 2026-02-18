/* =============================================
   CLARA SEDLAK — Portfolio Interactions
   ============================================= */

// ---- NAV: scrolled class + active link ----

const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Scrolled state for nav border/shadow
  nav.classList.toggle('scrolled', window.scrollY > 60);

  // Active nav link based on current section
  let currentId = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}, { passive: true });


// ---- SCROLL REVEAL (.reveal elements) ----

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  // Stagger sibling reveals slightly
  const siblings = el.parentElement.querySelectorAll('.reveal');
  const siblingIndex = Array.from(siblings).indexOf(el);
  if (siblingIndex > 0) {
    el.style.transitionDelay = `${siblingIndex * 0.08}s`;
  }
  revealObserver.observe(el);
});


// ---- GALLERY PHOTOS: staggered reveal ----

const photoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        photoObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.photo-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  photoObserver.observe(el);
});


// ---- ABOUT PHOTOS: reveal ----

const aboutPhotoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        aboutPhotoObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.about-photo-frame').forEach((el) => {
  aboutPhotoObserver.observe(el);
});


// ---- STAT COUNTERS ----

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = Math.min(now - startTime, duration);
    const progress = elapsed / duration;
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.stat-num[data-count]');
        if (numEl && !numEl.dataset.animated) {
          numEl.dataset.animated = 'true';
          // Small delay so the card's reveal animation finishes first
          setTimeout(() => animateCounter(numEl), 200);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.stat').forEach((el) => counterObserver.observe(el));


// ---- PARALLAX: hero photo on scroll ----

const heroFrame = document.querySelector('.hero-image-frame');

if (heroFrame) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroFrame.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
  }, { passive: true });
}


// ---- PARALLAX: contact background on scroll ----

const contactBgImg = document.querySelector('.contact-bg img');
const contactSection = document.querySelector('.contact');

if (contactBgImg && contactSection) {
  const contactParallax = () => {
    const rect = contactSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.innerHeight - rect.top) * 0.12;
      contactBgImg.style.transform = `translateY(${offset}px)`;
    }
  };
  window.addEventListener('scroll', contactParallax, { passive: true });
}


// ---- TIMELINE: stagger on reveal ----

document.querySelectorAll('.timeline-item.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});
