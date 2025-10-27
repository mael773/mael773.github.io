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
     Bouton retour en haut
  ----------------------------- */
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.textContent = "↑";
  scrollTopBtn.id = "scrollTopBtn";
  document.body.appendChild(scrollTopBtn);

  Object.assign(scrollTopBtn.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "var(--accent)",
    color: "var(--bg-dark)",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "none",
    transition: "0.3s",
    zIndex: "100",
  });

  scrollTopBtn.addEventListener("mouseenter", () => {
    scrollTopBtn.style.transform = "scale(1.1)";
  });
  scrollTopBtn.addEventListener("mouseleave", () => {
    scrollTopBtn.style.transform = "scale(1)";
  });

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
