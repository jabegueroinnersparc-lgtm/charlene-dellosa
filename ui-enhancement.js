/* UI enhancement layer: lightweight, pointer-aware feedback */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function addPressFeedback(event) {
    var target = event.target.closest && event.target.closest('a, button');
    if (!target || reduceMotion.matches) return;
    target.classList.remove('ui-pressed');
    window.requestAnimationFrame(function () {
      target.classList.add('ui-pressed');
      window.setTimeout(function () { target.classList.remove('ui-pressed'); }, 220);
    });
  }

  document.addEventListener('pointerdown', addPressFeedback, { passive: true });

  /* Avoid animating large sections while they are far below the fold. */
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ui-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    document.querySelectorAll('.landing-card, .media-card, .pain-point-card, .testimonial-box').forEach(function (item) {
      item.classList.add('ui-motion-ready');
      observer.observe(item);
    });
  }
})();
