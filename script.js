// Theme toggle (light/dark), remembered per visitor via localStorage.
(function(){
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch(e){}
  if (stored === 'light' || stored === 'dark') { root.setAttribute('data-theme', stored); }
  btn.addEventListener('click', function(){
    var current = root.getAttribute('data-theme');
    var isDark = current ? current === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e){}
  });
})();

// Scroll-reveal: each .reveal block fades/slides in the first time it enters view.
(function(){
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function(el){ io.observe(el); });
})();

// Hero spotlight: a soft glow that follows the pointer (skipped on touch / reduced-motion).
(function(){
  var hero = document.getElementById('heroSection');
  var spot = document.getElementById('heroSpotlight');
  if (!hero || !spot) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (reduceMotion || isCoarse) return;
  var ticking = false, lastX = 0, lastY = 0;
  hero.addEventListener('mousemove', function(e){
    var r = hero.getBoundingClientRect();
    lastX = ((e.clientX - r.left) / r.width) * 100;
    lastY = ((e.clientY - r.top) / r.height) * 100;
    if (!ticking) {
      window.requestAnimationFrame(function(){
        spot.style.setProperty('--mx', lastX + '%');
        spot.style.setProperty('--my', lastY + '%');
        ticking = false;
      });
      ticking = true;
    }
  });
})();
