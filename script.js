document.addEventListener("DOMContentLoaded", () => {
  const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ===== active navigation based on filename =====
  (function setActiveNav() {
    try {
      const path = window.location.pathname.split("/").pop() || "index.html";
      const navSelectors = [".nav-links a", "nav a", ".navbar a", ".nav a", ".brand + .nav-links a"];
      const links = new Set();
      navSelectors.forEach(s => $all(s).forEach(a => links.add(a)));
      links.forEach(a => {
        const href = (a.getAttribute("href") || "").split("/").pop();
        if (!href) return;
        a.classList.toggle("active", href === path || (path === "" && href === "index.html"));
      });
    } catch (e) {}
  })();

  // ===== smooth scroll for anchors =====
  (function smoothAnchors() {
    $all('a[href^="#"]').forEach(a => {
      a.addEventListener("click", ev => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        ev.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => target.setAttribute("tabindex", "-1"), 400);
      });
    });
  })();

  // ===== reveal on scroll (IntersectionObserver) =====
  (function revealOnScroll() {
    const selector = ".fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option";
    const items = $all(selector);
    if (!items.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(el => {
        if (!el.isIntersecting) return;
        const elTarget = el.target || el;
        if (elTarget.matches(".skills-grid, .projects-grid, .options")) {
          Array.from(elTarget.children).forEach((c, i) => setTimeout(() => c.classList.add("visible"), i * 80));
        } else {
          elTarget.style.transition = "opacity 500ms ease, transform 500ms ease";
          elTarget.classList.add("visible");
        }
        obs.unobserve(elTarget);
      });
    }, { threshold: 0.15 });

    $all(".skills-grid, .projects-grid, .options").forEach(g => observer.observe(g));
    $all(selector).forEach(el => {
      if (!el.closest(".skills-grid, .projects-grid, .options")) observer.observe(el);
    });
  })();

  // ===== back to top button =====
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
    window.addEventListener("scroll", () => btn.style.display = window.scrollY > 300 ? "flex" : "none");
  })();

  // ===== contact form handling (client-side only) =====
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
        padding: "10px 14px",
        background: ok ? "rgba(56,189,248,0.95)" : "rgba(220,53,69,0.95)",
        color: "#04202b",
        borderRadius: "8px",
        zIndex: 10000,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
      });
      document.body.appendChild(n);
      setTimeout(() => n.style.opacity = "0", 2200);
      setTimeout(() => n.remove(), 2600);
    };

    form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = (formData.get("name") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();
      if (!name || !email || !message) return createNotice("Veuillez remplir tous les champs.", false);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) return createNotice("Adresse email invalide.", false);
      form.reset();
      createNotice("Message envoyé — merci !", true);
    });
  })();

  // ===== clear active class on same-page anchor click =====
  (function clearActiveOnAnchorClick() {
    $all('a[href^="#"]').forEach(a => {
      a.addEventListener("click", () => {
        $all(".nav-links a, nav a").forEach(link => link.classList.remove("active"));
      });
    });
  })();

  // ===== optional: keyboard accessibility for back-to-top =====
  document.addEventListener("keydown", e => {
    if (e.key === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
