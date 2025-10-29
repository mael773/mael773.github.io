/* =========================================================
   script.js - global improvements
   - set active nav
   - smooth scroll with header offset
   - reveal on scroll (staggered)
   - back-to-top
   - contact form handling
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $all = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

  /* ---------------- active nav ---------------- */
  (function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    $all(".nav-links a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if (!href) return;
      a.classList.toggle("active", href === path || (path === "" && href === "index.html"));
    });
  })();

  /* ---------------- smooth anchors with header offset ---------------- */
  (function smoothAnchorsWithOffset() {
    const navBar = document.querySelector(".navbar");
    const getOffset = () => (navBar ? navBar.getBoundingClientRect().height + 8 : 72);

    $all('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (ev) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        ev.preventDefault();
        const offset = getOffset();
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        // accessibility focus
        setTimeout(() => {
          target.setAttribute("tabindex", "-1");
          target.focus({preventScroll:true});
        }, 600);
      });
    });
  })();

  /* ---------------- reveal on scroll ---------------- */
  (function revealOnScroll() {
    const revealSelector = ".fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option, .timeline-content, .timeline-dot";
    const items = $all(revealSelector);
    if (!items.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // if element is a grid container, stagger reveal children
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

    // Observe containers first
    $all(".skills-grid, .projects-grid, .options").forEach(g => observer.observe(g));
    // Observe individual nodes (skip children of handled grids)
    $all(revealSelector).forEach(el => {
      if (el.closest(".skills-grid, .projects-grid, .options")) return;
      observer.observe(el);
    });
  })();

  /* ---------------- back to top button ---------------- */
  (function backToTop() {
    if (document.getElementById("scrollTopBtn")) return;
    const btn = document.createElement("button");
    btn.id = "scrollTopBtn";
    btn.setAttribute("aria-label", "Retour en haut");
    btn.textContent = "↑";
    Object.assign(btn.style, {
      position: "fixed", right: "22px", bottom: "22px", width: "46px", height: "46px",
      borderRadius: "50%", border: "none", cursor: "pointer", display: "none",
      alignItems: "center", justifyContent: "center",
      background: getComputedStyle(document.documentElement).getPropertyValue('--accent') || "#00aaff",
      color: "#041418", zIndex: 99999, boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
    });
    document.body.appendChild(btn);
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => { btn.style.display = window.scrollY > 300 ? "flex" : "none"; });
  })();

  /* ---------------- simple contact form handling ---------------- */
  (function contactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;
    const showNotice = (msg, ok = true) => {
      const n = document.createElement("div");
      n.textContent = msg;
      Object.assign(n.style, {
        position: "fixed", right: "18px", bottom: "92px", padding: "12px 14px",
        background: ok ? "rgba(56,189,248,0.95)" : "rgba(220,53,69,0.95)",
        color: "#04202b", borderRadius: "8px", zIndex: 100000
      });
      document.body.appendChild(n);
      setTimeout(() => n.style.opacity = "0", 2400);
      setTimeout(() => n.remove(), 2800);
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const n = (data.get("name") || "").toString().trim();
      const em = (data.get("email") || "").toString().trim();
      const m = (data.get("message") || "").toString().trim();
      if (!n || !em || !m) return showNotice("Veuillez remplir tous les champs.", false);
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(em)) return showNotice("Adresse email invalide.", false);
      form.reset();
      showNotice("Message envoyé — merci !", true);
    });
  })();

});
