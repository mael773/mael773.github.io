/* ============================
   script.js - Portfolio helper
   - fade-in on scroll
   - set active nav link
   - back-to-top button
   - small button click effect
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  // FADE-IN ON APPEAR
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // SET ACTIVE NAV LINK (matching file name)
  const navLinks = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (href === 'index.html' && current === '')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // BACK TO TOP BUTTON
  const btnTop = document.createElement('button');
  btnTop.id = 'btnTop';
  btnTop.title = 'Retour en haut';
  btnTop.innerHTML = '⬆';
  document.body.appendChild(btnTop);

  const toggleBtn = () => {
    if (window.scrollY > 360) btnTop.style.display = 'flex';
    else btnTop.style.display = 'none';
  };
  toggleBtn();
  window.addEventListener('scroll', toggleBtn);

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // tiny press animation on .btn elements (for better feedback)
  document.querySelectorAll('.btn').forEach(b => {
    b.addEventListener('click', () => {
      b.style.transform = 'scale(0.97)';
      setTimeout(() => b.style.transform = '', 160);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

