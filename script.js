/* Theme toggle (persistent), mobile nav toggle, reveal on scroll, smooth scroll, button ripple */
(() => {
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  // Theme persistence
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') html.classList.add('dark-mode');
  // Toggle
  themeBtn.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.setAttribute('aria-pressed', isDark);
    themeBtn.textContent = isDark ? '🌙' : '☀️';
  });

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav on click
        if (siteNav.classList.contains('open')) siteNav.classList.remove('open');
      }
    });
  });

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(r => io.observe(r));
  } else {
    // fallback
    reveals.forEach(r => r.classList.add('in-view'));
  }

  // Button ripple effect (delegated)
  document.addEventListener('click', (e) => {
    const el = e.target.closest('.btn');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    circle.style.cssText = `
      position:absolute;left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;border-radius:50%;
      background:rgba(255,255,255,0.18);pointer-events:none;transform:scale(0);
      transition:transform .45s,opacity .45s;z-index:10;
    `;
    el.style.position = 'relative'; el.appendChild(circle);
    requestAnimationFrame(()=> circle.style.transform = 'scale(1)');
    setTimeout(()=> {
      circle.style.opacity = '0';
      setTimeout(()=> circle.remove(),500);
    },450);
  });

  // Archive/resume fallback if PDF not found: show helpful message
  const iframe = document.getElementById('resume-iframe');
  iframe.addEventListener('load', ()=> {
    // nothing—browser shows PDF if found; if not, user will get browser default
  });

})();
