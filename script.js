document.addEventListener('DOMContentLoaded', function () {
  const tabBar = document.querySelector('.browser-tabs');
  const tabs = document.querySelectorAll('.browser-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const indicator = document.querySelector('.tab-indicator');

  // Slide the glass lens under the active tab.
  function moveIndicator(tab) {
    if (!indicator || !tab) return;
    indicator.style.width = tab.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
  }

  function activate(tab) {
    const targetTab = tab.getAttribute('data-tab');

    tabs.forEach(function (t) {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tabContents.forEach(function (content) {
      content.classList.remove('active');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + targetTab).classList.add('active');
    moveIndicator(tab);
  }

  tabs.forEach(function (tab, i) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');

    tab.addEventListener('click', function () {
      activate(tab);
    });

    tab.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(tab);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        next.focus();
        activate(next);
      }
    });
  });

  if (indicator && tabBar) {
    tabBar.classList.add('has-indicator');
    // Place it without animating on first paint.
    indicator.style.transition = 'none';
    moveIndicator(document.querySelector('.browser-tab.active'));
    requestAnimationFrame(function () {
      indicator.style.transition = '';
    });
    window.addEventListener('resize', function () {
      moveIndicator(document.querySelector('.browser-tab.active'));
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        moveIndicator(document.querySelector('.browser-tab.active'));
      });
    }
  }

  // Specular highlight that follows the pointer across glass surfaces.
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.glass').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
        el.style.setProperty('--glow', '1');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--glow', '0.6');
      });
    });
  }
});
