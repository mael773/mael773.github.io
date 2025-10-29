document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------
     UTIL - safeQueryAll
  ----------------------------- */
  const $all = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

  /* -----------------------------
     NAV - set active link
  ----------------------------- */
  (function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    $all(".nav-links a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      a.classList.toggle("active", href === path || (path === "" && href === "index.html"));
    });
  })();

  /* -----------------------------
     SMOOTH SCROLL
  ----------------------------- */
  (function smoothAnchors() {
    $all('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => target.setAttribute("tabindex", "-1"), 400);
        }
      });
    });
  })();

  /* -----------------------------
     REVEAL ON SCROLL
  ----------------------------- */
  (function revealOnScroll() {
    const selector = ".fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option";
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.matches(".skills-grid, .projects-grid, .options")) {
          Array.from(el.children).forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 80);
          });
        } else {
          el.classList.add("visible");
        }
        obs.unobserve(el);
      });
    }, { threshold: 0.15 });

    $all(".skills-grid, .projects-grid, .options").forEach(g => observer.observe(g));
    $all(selector).forEach(el => {
      if (!el.closest(".skills-grid, .projects-grid, .options")) observer.observe(el);
    });
  })();

  /* -----------------------------
     BACK TO TOP BUTTON
  ----------------------------- */
  (function backToTop() {
    if (document.getElementById("scrollTopBtn")) return;
    const btn = document.createElement("button");
    btn.id = "scrollTopBtn";
    btn.setAttribute("aria-label", "Retour en haut");
    btn.innerText = "↑";
    Object.assign(btn.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      background: getComputedStyle(document.documentElement).getPropertyValue('--accent') || "#00aaff",
      color: "#041418",
      zIndex: 9999,
      boxShadow: "0 6px 18px rgba(0,0,0,0.3)"
    });
    document.body.appendChild(btn);

    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
    });
  })();

  /* -----------------------------
     CONTACT FORM HANDLER
  ----------------------------- */
  (function contactFormHandler() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    const createNotice = (msg, ok = true) => {
      const n = document.createElement("div");
      n.className = "contact-notice";
      n.textContent = msg;
      Object.assign(n.style, {
        position: "fixed",
        right: "20px",
        bottom: "90px",
        padding: "12px 16px",
        background: ok ? "rgba(56,189,248,0.95)" : "rgba(220,53,69,0.95)",
        color: "#04202b",
        borderRadius: "8px",
        zIndex: 10000,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        opacity: 1,
        transition: "opacity 0.3s ease"
      });
      document.body.appendChild(n);
      setTimeout(() => { n.style.opacity = "0"; }, 2500);
      setTimeout(() => n.remove(), 3000);
    };

    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        createNotice("Veuillez remplir tous les champs.", false);
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        createNotice("Adresse email invalide.", false);
        return;
      }

      form.reset();
      createNotice("Message envoyé — merci !");
    });
  })();

});
