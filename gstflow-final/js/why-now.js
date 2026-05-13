// Countdown to July 1, 2025
function updateCountdown() {
  const target = new Date('2025-07-01T00:00:00+05:30').getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('mins').textContent = '00';
    document.getElementById('secs').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('days').textContent = pad(days);
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('mins').textContent = pad(mins);
  document.getElementById('secs').textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);
