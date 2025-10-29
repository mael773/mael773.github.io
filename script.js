// ===============================
// SCRIPT PRINCIPAL DU PORTFOLIO
// ===============================

// --- Activer le lien de navigation courant ---
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
    }
  });
});

// --- Scroll doux + ancrage correct ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const yOffset = -70; // Compense le header sticky
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// --- Apparition au scroll ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll("section, .timeline-item, .project-card").forEach(el => {
  observer.observe(el);
});

// --- Formulaire contact (affichage console) ---
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm));
    console.log("Message envoyé :", data);
    alert("Votre message a été simulé comme envoyé (fonction mail désactivée en démo).");
    contactForm.reset();
  });
}
