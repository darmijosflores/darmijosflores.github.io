// Comportamiento compartido: menú móvil, aparición de secciones al hacer scroll y movimiento suave de la portada.
(function () {
  var header = document.querySelector('header.site');
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('mobile-nav');

  if (btn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  // Las secciones marcadas con data-reveal suben y aparecen al entrar en pantalla.
  var animated = document.documentElement.classList.contains('anim');
  var items = document.querySelectorAll('[data-reveal]');
  if (animated) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Portada del inicio: la fotografía se desplaza más despacio que la página (efecto de profundidad).
  var heroImg = document.getElementById('hero-img');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (heroImg && animated && y < window.innerHeight * 1.2) {
      heroImg.style.transform = 'translate3d(0,' + (y * 0.18).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
})();
