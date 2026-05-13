/* ============================================================
   GSTFLOW — Waitlist Registration (EmailJS)
   ============================================================
   SETUP:
   1. emailjs.com → free account → connect gstfloww@gmail.com
   2. Create template with: {{to_name}} {{to_email}} {{phone}} {{client_count}}
   3. Replace the 3 values below
   ============================================================ */

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ── Count logic: base 700, rounds DOWN to nearest 100 ──────
const BASE_COUNT = 700;

function getCount() {
  const stored = parseInt(localStorage.getItem('gstflow_count') || '0');
  return BASE_COUNT + stored;
}

function formatCount(n) {
  // Show as "700+", "800+", "900+" etc — floor to nearest 100
  return Math.floor(n / 100) * 100 + '+';
}

function updateCountDisplays() {
  const count = getCount();
  const label = formatCount(count);
  document.querySelectorAll('.waitlist-count-display').forEach(el => {
    el.textContent = label;
  });
  // Avatar +X bubble
  const bubble = document.querySelector('.avatar-plus');
  if (bubble) bubble.textContent = label;
}

updateCountDisplays();

// ── Form submission ─────────────────────────────────────────
async function handleSignup() {
  const name    = document.getElementById('fname')?.value.trim();
  const email   = document.getElementById('femail')?.value.trim();
  const phone   = document.getElementById('fphone')?.value.trim();
  const clients = document.getElementById('fclients')?.value;
  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnArrow= document.getElementById('btnArrow');
  const spinner = document.getElementById('btnSpinner');
  const errorEl = document.getElementById('formError');

  errorEl.style.display = 'none';
  if (!name)                     { showError('Please enter your name.'); return; }
  if (!email || !email.includes('@')) { showError('Please enter a valid email.'); return; }
  if (!clients)                  { showError('Please select your client range.'); return; }

  btn.disabled = true;
  btnText.textContent = 'Sending...';
  btnArrow.style.display = 'none';
  spinner.style.display = 'inline-block';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_name:       name,
      to_email:      email,
      phone:         phone || 'Not provided',
      client_count:  clients,
      discount_code: 'GSTFLOW20',
    });
    onSuccess();
  } catch (err) {
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      onSuccess(); // demo mode
    } else {
      showError('Something went wrong. Email us: gstfloww@gmail.com');
      btn.disabled = false;
      btnText.textContent = 'Register for Early Access';
      btnArrow.style.display = 'inline';
      spinner.style.display = 'none';
    }
  }
}

function onSuccess() {
  // Increment persistent count
  const prev = parseInt(localStorage.getItem('gstflow_count') || '0');
  localStorage.setItem('gstflow_count', prev + 1);
  updateCountDisplays();

  document.getElementById('regForm').style.display = 'none';
  document.getElementById('regSuccess').style.display = 'block';
}

function showError(msg) {
  const el = document.getElementById('formError');
  el.textContent = msg;
  el.style.display = 'block';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement.closest('.reg-form')) handleSignup();
});
