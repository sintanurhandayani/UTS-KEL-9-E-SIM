// script.js - theme toggle, footer year, mobile menu, profile handling hints

(function(){
  // --- Theme handling ---
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('persona-theme') || null;

  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
      themeToggle.textContent = '🌞';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.textContent = '🌗';
    }
  }

  // init theme
  if(stored){
    applyTheme(stored);
  } else {
    // prefer light by default but allow OS-level dark preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('persona-theme', next);
  });

  // --- Footer year ---
  const fy = document.getElementById('footer-year');
  if(fy) fy.textContent = new Date().getFullYear();

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      if(nav.classList.contains('open')){
        nav.style.display = 'block';
      } else {
        nav.style.display = '';
      }
    });
  }

  // --- Smooth internal links ---
  document.querySelectorAll('a.nav-link, a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu
        if(nav.classList.contains('open')){
          nav.classList.remove('open');
          nav.style.display = '';
        }
      }
    });
  });

  // --- Avatar fallbacks: show initials if image missing ---
  document.querySelectorAll('.avatar-fallback').forEach(div=>{
    if(!div.textContent.trim()){
      const initials = div.dataset.initials || '';
      div.textContent = initials;
    }
  });

  // --- ensure cards link to profile pages (keep simple anchor links) ---
  // No extra logic required here for index page.

})();