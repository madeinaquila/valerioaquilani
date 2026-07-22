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
    'Atleta Nazionale Sordi 🏐'
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
  const emailUser = 'valerio.aquilani'; // TODO: replace with real handle
  const emailDomain = 'example.com';    // TODO: replace with real domain

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
