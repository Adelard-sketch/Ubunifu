// Scroll reveal animation for elements with class `fade-in-section`
(function () {
  const faders = document.querySelectorAll('.fade-in-section');

  function initScrollReveal() {
    if (!faders.length) return;

    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
  }

  // Load shared navbar partial into header placeholder
  async function loadNavbar() {
    const header = document.getElementById('site-header');
    if (!header) return;
    try {
      const res = await fetch('includes/navbar.html');
      if (!res.ok) throw new Error('Navbar fetch failed');
      const html = await res.text();
      header.innerHTML = html;
    } catch (err) {
      console.warn('Could not load navbar:', err);
    }
  }

  // Initialize once DOM is ready. Script is loaded with `defer`, but be defensive.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadNavbar();
      initScrollReveal();
    });
  } else {
    loadNavbar();
    initScrollReveal();
  }
  // (team style toggle removed - profile-card view is default)
})();
