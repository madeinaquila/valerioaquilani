// ==========================================
// Signature line draw-in (hero graphic)
// Uses getTotalLength() instead of the pathLength
// SVG attribute, since pathLength has historically
// unreliable support in Safari.
// ==========================================
(function () {
  const path = document.querySelector('.trend-path');
  if (!path) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const length = path.getTotalLength();
  path.style.strokeDasharray = length;

  if (prefersReducedMotion) {
    path.style.strokeDashoffset = '0';
    return;
  }

  path.style.strokeDashoffset = length;
  // Force a reflow so the browser registers the starting state
  // before the transition below is applied.
  path.getBoundingClientRect();

  path.style.transition = 'stroke-dashoffset 1.7s cubic-bezier(.25,.8,.35,1) .2s';
  requestAnimationFrame(() => {
    path.style.strokeDashoffset = '0';
  });
})();

// ==========================================
// Typing effect for hero roles
// ==========================================
(function () {
  const target = document.getElementById('typing-target');
  if (!target) return;

  const roles = [
    'Web Developer',
    'Master in Data Science & AI',
    'Analytics Enthusiast',
    'Atleta Nazionale Sordi'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typeSpeed = 55;
  const deleteSpeed = 30;
  const pauseAfterType = 1400;
  const pauseAfterDelete = 400;

  function tick() {
    const word = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      target.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
})();

// ==========================================
// Obfuscated email reveal
// Keeps the address out of the raw HTML so basic
// scraper bots can't harvest it. Replace the
// user/domain parts below with the real address.
// ==========================================
(function () {
  const emailUser = 'v.aquilani10';
  const emailDomain = 'gmail.com';

  document.querySelectorAll('[data-email-reveal]').forEach((el) => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const address = emailUser + '@' + emailDomain;
      window.location.href = 'mailto:' + address;
      el.textContent = address;
      el.href = 'mailto:' + address;
    });
  });
})();
