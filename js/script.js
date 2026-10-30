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

// Domanda in homepage: "Cosa stai cercando?"
(function () {
  const quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;
  const answer = quiz.querySelector('.quiz-answer');
  const buttons = quiz.querySelectorAll('button[data-answer]');
  const texts = {
    ui: 'Parti dalla pagina <a href="about.html">Percorso</a>: 13 anni di interfacce su Figma, con attenzione all’accessibilità.',
    dati: 'Guarda il progetto SQL sui <a href="portfolio.html#sostenibile">195 Paesi</a> e quello sullo <a href="portfolio.html#spreco">spreco alimentare</a>.',
    tutte: 'È proprio quello che faccio: progetto l’interfaccia e capisco i dati che la riempiono. <a href="portfolio.html">Vedi tutti i progetti</a>.'
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      answer.innerHTML = texts[btn.dataset.answer];
    });
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
