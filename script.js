/* ── NAV scroll effect ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile nav toggle ── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = toggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* Close mobile menu on link click */
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = toggle?.querySelectorAll('span');
    spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.comp-card, .sae-card, .bilan-card, .pres-card, .section-title, .section-label'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * (entry.target.dataset.index || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => observer.observe(el));

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
