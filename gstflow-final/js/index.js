/* ============================================================
   INDEX PAGE — JavaScript
   ============================================================ */

// ── Animated counter ──────────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * target);
    el.textContent = current.toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Trigger counter when stat comes into view
const counterEls = document.querySelectorAll('.stat__number[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ── Mockup button interactions ─────────────────────────────
const approveBtn = document.querySelector('.mockup-btn--approve');
const exportBtn = document.querySelector('.mockup-btn--export');
const flaggedRow = document.querySelector('.mockup-row--flagged');

approveBtn?.addEventListener('click', () => {
  if (flaggedRow) {
    const val = flaggedRow.querySelector('.mockup-value');
    const conf = flaggedRow.querySelector('.mockup-conf');
    flaggedRow.classList.remove('mockup-row--flagged');
    if (val) { val.classList.remove('confidence--low'); val.classList.add('confidence--high'); }
    if (conf) { conf.textContent = '100%'; conf.classList.remove('mockup-conf--warn'); }
    approveBtn.textContent = '✓ All Approved';
    approveBtn.style.background = 'rgba(46,204,113,0.25)';
  }
});

exportBtn?.addEventListener('click', () => {
  exportBtn.textContent = '⬇ Downloading...';
  setTimeout(() => {
    exportBtn.textContent = '✓ Exported!';
    exportBtn.style.background = 'rgba(46,204,113,0.15)';
    exportBtn.style.color = 'var(--success)';
    setTimeout(() => {
      exportBtn.textContent = 'Export to Tally';
      exportBtn.style.background = '';
      exportBtn.style.color = '';
    }, 2000);
  }, 800);
});

// ── Parallax hero orbs ─────────────────────────────────────
const orbs = document.querySelectorAll('.hero__orb');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
