/* =========================================================
   script.js - Fiable & non-bloquant
   - active nav (robuste)
   - smooth scroll with offset (navbar)
   - reveal on scroll (adds .visible, non-mandatory)
   - back-to-top, simple contact handler
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $all = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

  /* -------------------------
     Active navigation (robust)
     - compares href filename or full href match
  ------------------------- */
  (function setActiveNav() {
    const current = window.location.href;
    $all(".nav-links a").forEach(a => {
      const href = a.getAttribute("href");
      if (!href) return;
      // normalize relative paths: take last segment
      const hrefName = href.split("/").pop();
      const isActive = current.endsWith(hrefName) || current.includes(hrefName) || (hrefName === "index.html" && (current.endsWith("/") || current.endsWith("index.html")));
      a.classList.toggle("active", isActive);
    });
  })();

  /* -------------------------
     Smooth anchors with navbar offset
  ------------------------- */
  (function anchorsWithOffset() {
    const nav = document.querySelector(".navbar");
    const navHeight = () => (nav ? nav.getBoundingClientRect().height : 64);

    $all('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const targetSelector = a.getAttribute("href");
        if (!targetSelector || targetSelector === "#") return;
        const target = document.querySelector(targetSelector);
        if (!target) return;
        e.preventDefault();
        const offset = navHeight() + 12; // small gap
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        // focus for accessibility
        setTimeout(() => {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }, 600);
      }, { passive: true });
    });
  })();

  /* -------------------------
     Reveal on scroll (non-blocking)
     - will add .visible to elements in view
     - if JS fails, content remains visible (no global hiding in CSS)
  ------------------------- */
  (function revealOnScroll() {
    const selectors = [
      ".fade-in",
      ".skill-card",
      ".project-card",
      ".cert-card",
      ".experience-card",
      ".option",
      ".timeline-box",
      ".timeline-dot"
    ];
    const items = $all(selectors.join(","));
    if (!items.length) return;

    // Observer with a small negative rootMargin so sections reveal slightly earlier
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    items.forEach(it => observer.observe(it));
  })();

  /* -------------------------
     Back to top button
  ------------------------- */
  (function backToTop() {
    if (document.getElementById("scrollTopBtn")) return;
    const btn = document.createElement("button");
    btn.id = "scrollTopBtn";
    btn.setAttribute("aria-label", "Retour en haut");
    btn.textContent = "↑";
    Object.assign(btn.style, {
      position: "fixed", right: "18px", bottom: "18px", width: "44px", height: "44px",
      borderRadius: "50%", border: "none", cursor: "pointer", display: "none",
      zIndex: 99999, background: getComputedStyle(document.documentElement).getPropertyValue('--accent') || "#00aaff",
      color: "#041418"
    });
    document.body.appendChild(btn);
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => { btn.style.display = window.scrollY > 320 ? "flex" : "none"; });
  })();

  /* -------------------------
     Contact form (client-side)
  ------------------------- */
  (function contactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;
    const showFlash = (msg, ok = true) => {
      const n = document.createElement("div");
      n.textContent = msg;
      Object.assign(n.style, {
        position: "fixed", right: "18px", bottom: "92px", padding: "10px 14px",
        background: ok ? "rgba(56,189,248,0.95)" : "rgba(220,53,69,0.95)",
        color: "#04202b", borderRadius: "8px", zIndex: 100000
      });
      document.body.appendChild(n);
      setTimeout(() => n.style.opacity = "0", 2200);
      setTimeout(() => n.remove(), 2600);
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();
      if (!name || !email || !message) return showFlash("Veuillez remplir tous les champs.", false);
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) return showFlash("Email invalide.", false);
      form.reset();
      showFlash("Message envoyé — merci !", true);
    });
  })();

});
