// Menu a tutta pagina su telefono
(function () {
  const open = document.querySelector('.menu-btn');
  const panel = document.getElementById('menu');
  if (!open || !panel) return;
  const close = panel.querySelector('.menu-close');

  function setOpen(isOpen) {
    panel.classList.toggle('open', isOpen);
    open.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    (isOpen ? close : open).focus();
  }

  open.addEventListener('click', () => setOpen(true));
  close.addEventListener('click', () => setOpen(false));
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    panel.classList.remove('open');
    open.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));
  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

// Email mostrata solo al clic, così i bot che leggono l'HTML non la trovano
(function () {
  const user = 'v.aquilani10';
  const domain = 'gmail.com';

  document.querySelectorAll('[data-email-reveal]').forEach((el) => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const address = user + '@' + domain;
      el.href = 'mailto:' + address;
      if (el.dataset.emailReveal !== 'keep') el.textContent = address;
      window.location.href = 'mailto:' + address;
    });
  });
})();

// Chi preferisce ridurre il movimento vede solo l'immagine ferma
(function () {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('video[data-reduce-motion]').forEach((v) => {
    v.removeAttribute('autoplay');
    v.pause();
  });
})();
