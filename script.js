/* =========================================================
   ✨ script.js - Portfolio (global)
   - active nav
   - smooth scroll
   - reveal on scroll (fade-in, cards)
   - back-to-top button
   - basic contact form handling (client-side)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* helper: select all */
  const $all = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

  /* ===== active navigation based on filename ===== */
  (function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    $all(".nav-links a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if (!href) return;
      a.classList.toggle("active", href === path || (path === "" && href === "index.html"));
    });
  })();

  /* ===== smooth scroll for anchors ===== */
  (function smoothAnchors() {
    $all('a[href^="#"]').forEach(a => {
      a.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  })();

  /* ===== reveal on scroll (IntersectionObserver) ===== */
  (function revealOnScroll() {
    const selector = ".fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option";
    const items = $all(selector);
    if (!items.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // reveal grid children with stagger if parent is grid
        if (el.matches(".skills-grid") || el.matches(".projects-grid") || el.matches(".options")) {
          const children = Array.from(el.children);
          children.forEach((c, i) => {
            setTimeout(() => c.classList.add("visible"), i * 80);
          });
        } else {
          el.classList.add("visible");
        }
        obs.unobserve(el);
      });
    }, { threshold: 0.15 });

    // Observe grids (so we can stagger children)
    $all(".skills-grid, .projects-grid, .options").forEach(g => observer.observe(g));
    // Observe other revealable nodes
    $all(".fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option")
      .forEach(el => {
        // skip if child of handled grid
        if (el.closest(".skills-grid, .projects-grid, .options")) return;
        observer.observe(el);
      });
  })();

  /* ===== back to top button ===== */
  (function backToTop() {
    if (document.getElementById("scrollTopBtn")) return;
    const btn = document.createElement("button");
    btn.id = "scrollTopBtn";
    btn.innerText = "↑";
    Object.assign(btn.style, {
      position: "fixed", right: "20px", bottom: "20px", width: "44px", height: "44px",
      borderRadius: "50%", border: "none", cursor: "pointer", display: "none",
      zIndex: 9999, background: getComputedStyle(document.documentElement).getPropertyValue('--accent') || "#00aaff",
      color: "#041418"
    });
    document.body.appendChild(btn);
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => btn.style.display = window.scrollY > 300 ? "flex" : "none");
  })();

  /* ===== contact form handling (client-side only) ===== */
  (function contactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    const notice = (msg, ok = true) => {
      const n = document.createElement("div");
      n.textContent = msg;
      Object.assign(n.style, {
        position: "fixed", right: "20px", bottom: "90px", padding: "10px 14px",
        background: ok ? "rgba(56,189,248,0.95)" : "rgba(220,53,69,0.95)",
        color: "#04202b", borderRadius: "8px", zIndex: 10000
      });
      document.body.appendChild(n);
      setTimeout(() => n.style.opacity = "0", 2200);
      setTimeout(() => n.remove(), 2600);
    };

    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();
      if (!name || !email || !message) return notice("Veuillez remplir tous les champs.", false);
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) return notice("Email invalide.", false);
      // simulated send
      form.reset();
      notice("Message envoyé — merci !");
    });
  })();

});
