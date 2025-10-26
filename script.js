// ==== Apparition douce au scroll ====
const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(fader => observer.observe(fader));

// ==== Gestion du lien actif ====
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// ==== Bouton retour en haut ====
const btnTop = document.createElement('button');
btnTop.id = 'btnTop';
btnTop.innerHTML = '⬆';
document.body.appendChild(btnTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTop.style.display = 'block';
  } else {
    btnTop.style.display = 'none';
  }
});

btnTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==== Effet de clic sur les boutons ====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => (btn.style.transform = 'scale(1)'), 150);
  });
});
