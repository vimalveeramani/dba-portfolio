/* Portfolio interactions:
   - Theme toggle (persist)
   - Mobile nav toggle
   - Smooth scroll
   - Reveal on scroll
   - Quote rotator with controls (prev/next/play/pause)
   - Button ripple (light)
*/

(() => {
  const root = document.body;
  const themeBtn = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  /* ---------- THEME PERSISTENCE ---------- */
  const THEME_KEY = 'vv-theme'; // values: 'light' | 'dark'
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    root.classList.remove('theme-light');
    root.classList.add('theme-dark');
    themeBtn.textContent = '☀️';
    themeBtn.setAttribute('aria-pressed', 'true');
  } else {
    // default to light
    root.classList.remove('theme-dark');
    root.classList.add('theme-light');
    themeBtn.textContent = '🌙';
    themeBtn.setAttribute('aria-pressed', 'false');
  }

  themeBtn.addEventListener('click', () => {
    const isDark = root.classList.toggle('theme-dark');
    root.classList.toggle('theme-light', !isDark);
    themeBtn.setAttribute('aria-pressed', String(isDark));
    // swap icon: moon when light (means click to go dark), sun when dark (click to go light)
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  });

  /* ---------- MOBILE NAV ---------- */
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close nav when link clicked (mobile)
  siteNav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      if (siteNav.classList.contains('open')) siteNav.classList.remove('open');
    });
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('in-view'));
  }

  /* ---------- BUTTON RIPPLE ---------- */
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.2;
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    ripple.style.cssText = `
      position:absolute;left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;border-radius:50%;
      background:rgba(255,255,255,0.18);transform:scale(0);pointer-events:none;transition:transform .45s,opacity .45s;z-index:10;
    `;
    btn.style.position = 'relative';
    btn.appendChild(ripple);
    requestAnimationFrame(()=> ripple.style.transform = 'scale(1)');
    setTimeout(()=> { ripple.style.opacity = '0'; setTimeout(()=> ripple.remove(), 500); }, 450);
  });

  /* ---------- QUOTE ROTATOR ---------- */
  const quotes = [
    {text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius"},
    {text: "We suffer more often in imagination than in reality.", author: "Seneca"},
    {text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius"},
    {text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche"},
    {text: "Don't explain your philosophy. Embody it.", author: "Epictetus"},
    {text: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi"}
  ];

  let qIndex = 0;
  let playing = true;
  const Q_INTERVAL = 6000;

  const elText = document.getElementById('quote-text');
  const elAuthor = document.getElementById('quote-author');
  const btnPrev = document.getElementById('quote-prev');
  const btnNext = document.getElementById('quote-next');
  const btnPlay = document.getElementById('quote-play');

  function renderQuote(i) {
    const q = quotes[i];
    elText.textContent = `"${q.text}"`;
    elAuthor.textContent = q.author;
    // for screen readers announce change:
    elText.setAttribute('aria-hidden', 'false');
  }

  function nextQuote() {
    qIndex = (qIndex + 1) % quotes.length;
    renderQuote(qIndex);
  }
  function prevQuote() {
    qIndex = (qIndex - 1 + quotes.length) % quotes.length;
    renderQuote(qIndex);
  }

  let qTimer = setInterval(nextQuote, Q_INTERVAL);

  btnNext.addEventListener('click', ()=> {
    nextQuote();
    restartTimer();
  });
  btnPrev.addEventListener('click', ()=> {
    prevQuote();
    restartTimer();
  });
  btnPlay.addEventListener('click', ()=> {
    playing = !playing;
    if (playing) {
      btnPlay.textContent = '⏸';
      qTimer = setInterval(nextQuote, Q_INTERVAL);
    } else {
      btnPlay.textContent = '▶';
      clearInterval(qTimer);
    }
  });

  function restartTimer() {
    if (playing) {
      clearInterval(qTimer);
      qTimer = setInterval(nextQuote, Q_INTERVAL);
    }
  }

  // Initialize
  renderQuote(qIndex);

  /* Ensure keyboard accessibility for quote controls */
  [btnPrev, btnNext, btnPlay].forEach(b => {
    b.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') b.click();
    });
  });

})();
