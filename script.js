/* =========================================================
   ARYAN OJHA — PORTFOLIO SCRIPTS
   Features: sticky nav, dark mode, scroll animations,
             active nav highlight, skill bars, form handler
   ========================================================= */

/* ── DOM references ─────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const themeToggle= document.getElementById('themeToggle');
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobLinks   = document.querySelectorAll('.mob-link');
const backToTop  = document.getElementById('backToTop');
const navLinks   = document.querySelectorAll('.nav-link');
const sections   = document.querySelectorAll('section[id]');

/* ═══════════════════════════════════════════════════════════
   1. STICKY NAVBAR — adds "scrolled" class after 60px
═══════════════════════════════════════════════════════════ */
function handleScroll() {
  /* Sticky style */
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  /* Back-to-top visibility */
  backToTop.classList.toggle('show', window.scrollY > 400);

  /* Active nav link highlight */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run once on load

/* ═══════════════════════════════════════════════════════════
   2. DARK / LIGHT MODE TOGGLE
═══════════════════════════════════════════════════════════ */
// Restore saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  // Lucide re-renders icons — no action needed (CSS handles visibility)
});

/* ═══════════════════════════════════════════════════════════
   3. HAMBURGER MENU (mobile)
═══════════════════════════════════════════════════════════ */
function openMobileNav() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMobileNav() : openMobileNav();
});

// Close when a link is clicked
mobLinks.forEach(link => link.addEventListener('click', closeMobileNav));

/* ═══════════════════════════════════════════════════════════
   4. SCROLL REVEAL ANIMATIONS
   Uses IntersectionObserver for performance
═══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   5. SKILL BARS — animate on visibility
═══════════════════════════════════════════════════════════ */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width') || '0';
        // Small delay so the card reveal animation finishes first
        setTimeout(() => { fill.style.width = width + '%'; }, 300);
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-fill').forEach(el => barObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   6. BACK TO TOP
═══════════════════════════════════════════════════════════ */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ═══════════════════════════════════════════════════════════
   7. CONTACT FORM (client-side demo)
   Replace with a real backend / Formspree / EmailJS in prod
═══════════════════════════════════════════════════════════ */
function handleSubmit(event) {
  event.preventDefault();

  const btn     = event.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  // Loading state
  btn.disabled = true;
  btn.innerHTML = '<span style="opacity:.6">Sending…</span>';

  // Simulate async send (replace with actual API call)
  setTimeout(() => {
    event.target.reset();
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send"></i> Send Message';
    success.classList.add('show');
    lucide.createIcons(); // re-init icon inside button
    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1200);
}

/* ═══════════════════════════════════════════════════════════
   8. SMOOTH SCROLL POLYFILL for older browsers
   (Modern browsers support scroll-behavior: smooth in CSS,
    but this handles href="#..." links safely)
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});