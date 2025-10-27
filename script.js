/* =========================================================
   ✨ SCRIPT PORTFOLIO ZIMMERMANN MAËL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------
     Animation des compétences
  ----------------------------- */
  const cards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));

  /* -----------------------------
     Bouton retour en haut (optionnel)
  ----------------------------- */
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.textContent = "↑";
  scrollTopBtn.id = "scrollTopBtn";
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.style.position = "fixed";
  scrollTopBtn.style.bottom = "25px";
  scrollTopBtn.style.right = "25px";
  scrollTopBtn.style.background = "var(--accent)";
  scrollTopBtn.style.color = "var(--bg-dark)";
  scrollTopBtn.style.border = "none";
  scrollTopBtn.style.borderRadius = "50%";
  scrollTopBtn.style.width = "40px";
  scrollTopBtn.style.height = "40px";
  scrollTopBtn.style.cursor = "pointer";
  scrollTopBtn.style.display = "none";
  scrollTopBtn.style.transition = "0.3s";

  scrollTopBtn.addEventListener("mouseenter", () => {
    scrollTopBtn.style.transform = "scale(1.1)";
  });
  scrollTopBtn.addEventListener("mouseleave", () => {
    scrollTopBtn.style.transform = "scale(1)";
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
