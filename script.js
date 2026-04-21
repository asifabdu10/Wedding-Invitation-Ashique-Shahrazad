/* ═══════════════════════════════════════════════
   Wedding Invitation – Ashique & Shahrazad
   script.js
   ═══════════════════════════════════════════════ */

/* ─── 1. Countdown Timer ─── */
(function countdown() {
  const weddingDate = new Date('2026-08-02T12:00:00');

  function pad(n, len = 2) {
    return String(n).padStart(len, '0');
  }

  function tick() {
    const now  = Date.now();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent  = '000';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent  = pad(days, 3);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent  = pad(mins);
    document.getElementById('cd-secs').textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();


/* ─── 2. Add to Calendar ─── */
document.getElementById('add-calendar-btn').addEventListener('click', function () {
  const title       = 'Wedding – Ashique & Shahrazad';
  const details     = 'You are cordially invited to the wedding celebration.';
  const location    = 'Contour Resorts and Convention Centre, Tiruvalla, Changanassery';
  const startDate   = '20260802T120000';
  const endDate     = '20260802T160000';
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${startDate}/${endDate}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent(location)}`;
  window.open(url, '_blank');
});


/* ─── 3. RSVP Buttons ─── */
document.getElementById('rsvp-yes').addEventListener('click', function () {
  this.textContent = '✓ Accepted!';
  this.style.background = '#2d8c48';
  this.style.borderColor = '#2d8c48';
  document.getElementById('rsvp-no').style.opacity = '0.4';
});

document.getElementById('rsvp-no').addEventListener('click', function () {
  this.textContent = '✗ Declined';
  this.style.background = '#e0e0e0';
  this.style.color = '#666';
  document.getElementById('rsvp-yes').style.opacity = '0.4';
});


/* ─── 4. Dark Mode Toggle ─── */
(function darkMode() {
  const btn  = document.getElementById('dark-toggle');
  const body = document.body;

  // Restore preference
  if (localStorage.getItem('wedding-dark') === '1') {
    body.classList.add('dark');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', function () {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('wedding-dark', isDark ? '1' : '0');
  });
})();


/* ─── 5. Canvas Petal Animation ─── */
(function petals() {
  const canvas = document.getElementById('petal-canvas');
  const ctx    = canvas.getContext('2d');

  // Petal colors matching reference (pink, dusty rose, gold/peach)
  const COLORS = ['#e8a0b0', '#d4687a', '#f0c8b0', '#e8b4a0', '#c87080', '#f5d0a0'];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Petal class
  class Petal {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x     = Math.random() * canvas.width;
      this.y     = initial ? Math.random() * -canvas.height : -16;
      this.size  = 6 + Math.random() * 10;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.speedY = 0.6 + Math.random() * 1.2;
      this.speedX = -0.5 + Math.random() * 1.0;
      this.angle  = Math.random() * Math.PI * 2;
      this.spin   = (-0.02 + Math.random() * 0.04);
      this.opacity = 0.5 + Math.random() * 0.5;
    }

    update() {
      this.y     += this.speedY;
      this.x     += this.speedX;
      this.angle += this.spin;
      if (this.y > canvas.height + 20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle   = this.color;

      // Teardrop / leaf shape
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);
      ctx.bezierCurveTo(
        this.size / 2, -this.size / 4,
        this.size / 2,  this.size / 2,
        0,              this.size / 2
      );
      ctx.bezierCurveTo(
        -this.size / 2,  this.size / 2,
        -this.size / 2, -this.size / 4,
        0,              -this.size / 2
      );
      ctx.fill();
      ctx.restore();
    }
  }

  // Spawn petals
  const PETAL_COUNT = 45;
  const petalList   = Array.from({ length: PETAL_COUNT }, () => new Petal());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalList.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();
