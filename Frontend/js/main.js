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
      initContactForm();
    });
  } else {
    loadNavbar();
    initScrollReveal();
    initContactForm();
  }
  // (team style toggle removed - profile-card view is default)
})();

// Contact form handler (outside main IIFE so it's accessible if needed)
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('contact-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const endpoint = form.dataset.endpoint || form.action;
    if (!endpoint) {
      if (statusEl) statusEl.textContent = 'No form endpoint configured.';
      return;
    }

    const formData = new FormData(form);

    if (submitBtn) submitBtn.disabled = true;
    if (statusEl) {
      statusEl.textContent = 'Sending...';
      statusEl.classList.remove('success', 'error');
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        if (statusEl) {
          statusEl.textContent = 'Message sent — thank you!';
          statusEl.classList.add('success');
        }
        form.reset();
      } else {
        let msg = 'Submission failed.';
        try {
          const data = await res.json();
          if (data && data.error) msg = data.error;
          else if (data && data.errors && data.errors.length) msg = data.errors.map(x=>x.message||x).join(', ');
        } catch (_) {}
        if (statusEl) {
          statusEl.textContent = msg;
          statusEl.classList.add('error');
        }
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = 'Network error. Please try again later.';
        statusEl.classList.add('error');
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
