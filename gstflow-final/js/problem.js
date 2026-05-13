/* ============================================================
   GSTFLOW — Problem Page JavaScript
   ============================================================ */

// ── Donut chart counter animation ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const donutPct = document.querySelector('.donut-pct');
  if (!donutPct) return;

  const donutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(donutPct, 0, 50, 1200);
        donutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  donutObserver.observe(donutPct);

  // ── Problem card entrance animation ──────────────────────
  const pcards = document.querySelectorAll('.pcard');
  const pcardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, i * 120);
        pcardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  pcards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    pcardObserver.observe(card);
  });

  // ── Who grid counter animation ──────────────────────────
  const whoNums = document.querySelectorAll('.who-num');
  const whoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        whoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  whoNums.forEach(num => {
    num.style.opacity = '0';
    num.style.transition = 'opacity 0.6s ease';
    whoObserver.observe(num);
  });
});

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + (end - start) * eased);
    el.textContent = current + '%';
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
