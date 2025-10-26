// Effet machine à écrire sur la page d'accueil
const text = "Étudiant en BTS SIO SLAM";
let i = 0;
function typeEffect() {
  const target = document.getElementById("typed-text");
  if (!target) return;
  if (i < text.length) {
    target.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 80);
  }
}
typeEffect();

// Effet fade-in au scroll
const fadeEls = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add('visible');
  });
});
