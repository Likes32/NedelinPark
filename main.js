/* Проявление блоков при скролле. Один наблюдатель, один эффект. */
(function () {
  'use strict';

  var items = document.querySelectorAll('[data-in]');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (calm || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  items.forEach(function (el) { io.observe(el); });
})();
