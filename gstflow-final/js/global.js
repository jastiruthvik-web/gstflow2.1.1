/* ============================================================
   GSTFLOW — Global JavaScript
   ============================================================ */

// ── Nav scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

burger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Active nav link ────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
});

// ── Reveal on scroll ──────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Immediately reveal anything already in the viewport on page load
function revealInView() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

// Run on DOMContentLoaded and again on load (images/fonts may shift layout)
document.addEventListener('DOMContentLoaded', revealInView);
window.addEventListener('load', revealInView);

// ── Smooth cursor glow (subtle) ────────────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.6s ease, top 0.6s ease;
  left: -300px; top: -300px;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
