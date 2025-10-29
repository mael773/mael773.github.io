/* =========================================================

   ✨ script.js - Portfolio (global)

   - active nav

   - smooth scroll

   - reveal on scroll (fade-in, cards)

   - back-to-top button

   - basic contact form handling (client-side)

   ========================================================= */



document.addEventListener("DOMContentLoaded", () => {


  /* -----------------------------


     UTIL - safeQueryAll (no errors if not found)


  ----------------------------- */


  const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));


  /* helper: select all */


  const $all = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));




  /* -----------------------------


     NAV - set active link based on current filename


  ----------------------------- */


  /* ===== active navigation based on filename ===== */

  (function setActiveNav() {


    try {


      const path = window.location.pathname.split("/").pop() || "index.html";


      // find all nav links in either .nav-links (ul) or .nav-links (div) or direct <nav> anchors


      const navSelectors = [


        ".nav-links a",


        "nav a",


        ".navbar a",


        ".nav a",


        ".brand + .nav-links a"


      ];


      const links = new Set();


      navSelectors.forEach(s => $all(s).forEach(a => links.add(a)));


      links.forEach(a => {


        const href = (a.getAttribute("href") || "").split("/").pop();


        if (!href) return;


        if (href === path || (path === "" && (href === "index.html" || href === "/"))) {


          a.classList.add("active");


        } else {


          a.classList.remove("active");


        }


      });


    } catch (e) {


      // fail silently


      // console.error(e);


    }


    const path = window.location.pathname.split("/").pop() || "index.html";


    $all(".nav-links a").forEach(a => {


      const href = (a.getAttribute("href") || "").split("/").pop();


      if (!href) return;


      a.classList.toggle("active", href === path || (path === "" && href === "index.html"));


    });

  })();




  /* -----------------------------


     SMOOTH SCROLL for anchors


  ----------------------------- */


  /* ===== smooth scroll for anchors ===== */

  (function smoothAnchors() {

    $all('a[href^="#"]').forEach(a => {


      a.addEventListener("click", (ev) => {


        const href = a.getAttribute("href");


        if (!href || href === "#") return;


        const target = document.querySelector(href);


      a.addEventListener("click", function (e) {


        const target = document.querySelector(this.getAttribute("href"));

        if (target) {


          ev.preventDefault();


          e.preventDefault();

          target.scrollIntoView({ behavior: "smooth", block: "start" });


          // optional: set focus for accessibility


          setTimeout(() => target.setAttribute("tabindex", "-1"), 400);

        }

      });

    });

  })();




  /* -----------------------------


     REVEAL ON SCROLL (IntersectionObserver)


     - animated classes: .fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option


     - add .visible class, with optional stagger for grid children


  ----------------------------- */


  /* ===== reveal on scroll (IntersectionObserver) ===== */

  (function revealOnScroll() {


    const revealSelector = [


      ".fade-in",


      ".skill-card",


      ".project-card",


      ".cert-card",


      ".experience-card",


      ".option"


    ].join(",");





    const items = $all(revealSelector);


    const selector = ".fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option";


    const items = $all(selector);

    if (!items.length) return;



    const observer = new IntersectionObserver((entries, obs) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target;





        // If it's a grid parent (options or a category), reveal children with stagger


        // reveal grid children with stagger if parent is grid

        if (el.matches(".skills-grid") || el.matches(".projects-grid") || el.matches(".options")) {

          const children = Array.from(el.children);


          children.forEach((child, i) => {


            child.style.transition = `opacity 450ms ease ${i * 75}ms, transform 450ms ease ${i * 75}ms`;


            child.classList.add("visible");


          children.forEach((c, i) => {


            setTimeout(() => c.classList.add("visible"), i * 80);

          });

        } else {


          // small stagger for cards in the same parent


          if (el.matches(".skill-card") || el.matches(".project-card")) {


            el.style.transition = `opacity 500ms ease, transform 500ms ease`;


          }

          el.classList.add("visible");

        }




        obs.unobserve(el);

      });

    }, { threshold: 0.15 });




    // Observe sensible parents first (grids) so we can stagger children


    $all(".skills-grid, .projects-grid, .options").forEach(grid => observer.observe(grid));


    // Observe others (individual cards / fade-in sections)


    // Observe grids (so we can stagger children)


    $all(".skills-grid, .projects-grid, .options").forEach(g => observer.observe(g));


    // Observe other revealable nodes

    $all(".fade-in, .skill-card, .project-card, .cert-card, .experience-card, .option")

      .forEach(el => {


        // skip children of grids (handled above)


        const parentGrid = el.closest(".skills-grid, .projects-grid, .options");


        if (!parentGrid) observer.observe(el);


        // skip if child of handled grid


        if (el.closest(".skills-grid, .projects-grid, .options")) return;


        observer.observe(el);

      });

  })();




  /* -----------------------------


     BACK TO TOP button


  ----------------------------- */


  /* ===== back to top button ===== */

  (function backToTop() {


    // don't create multiple times

    if (document.getElementById("scrollTopBtn")) return;




    const btn = document.createElement("button");

    btn.id = "scrollTopBtn";


    btn.setAttribute("aria-label", "Retour en haut");

    btn.innerText = "↑";

    Object.assign(btn.style, {


      position: "fixed",


      bottom: "24px",


      right: "24px",


      width: "44px",


      height: "44px",


      borderRadius: "50%",


      border: "none",


      cursor: "pointer",


      display: "none",


      alignItems: "center",


      justifyContent: "center",


      background: getComputedStyle(document.documentElement).getPropertyValue('--accent') || "#00aaff",


      color: "#04202b",


      zIndex: 9999,


      boxShadow: "0 6px 18px rgba(0,0,0,0.3)"


      position: "fixed", right: "20px", bottom: "20px", width: "44px", height: "44px",


      borderRadius: "50%", border: "none", cursor: "pointer", display: "none",


      zIndex: 9999, background: getComputedStyle(document.documentElement).getPropertyValue('--accent') || "#00aaff",


      color: "#041418"

    });

    document.body.appendChild(btn);




    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));


    window.addEventListener("scroll", () => {


      const show = window.scrollY > 320;


      btn.style.display = show ? "flex" : "none";


    });


    window.addEventListener("scroll", () => btn.style.display = window.scrollY > 300 ? "flex" : "none");

  })();




  /* -----------------------------


     CONTACT FORM (client-side handling)


     - If .contact-form exists, validate and show feedback (no real email sent)


  ----------------------------- */


  (function contactFormHandler() {


  /* ===== contact form handling (client-side only) ===== */


  (function contactForm() {

    const form = document.querySelector(".contact-form");

    if (!form) return;




    const createNotice = (text, ok = true) => {


    const notice = (msg, ok = true) => {

      const n = document.createElement("div");


      n.className = "contact-notice";


      n.textContent = text;


      n.textContent = msg;

      Object.assign(n.style, {


        position: "fixed",


        right: "20px",


        bottom: "90px",


        padding: "12px 16px",


        position: "fixed", right: "20px", bottom: "90px", padding: "10px 14px",

        background: ok ? "rgba(56,189,248,0.95)" : "rgba(220,53,69,0.95)",


        color: "#04202b",


        borderRadius: "8px",


        zIndex: 10000,


        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"


        color: "#04202b", borderRadius: "8px", zIndex: 10000

      });

      document.body.appendChild(n);


      setTimeout(() => n.style.opacity = "0", 2500);


      setTimeout(() => n.remove(), 3000);


      setTimeout(() => n.style.opacity = "0", 2200);


      setTimeout(() => n.remove(), 2600);

    };




    form.addEventListener("submit", (e) => {


    form.addEventListener("submit", e => {

      e.preventDefault();


      const formData = new FormData(form);


      const name = (formData.get("name") || "").toString().trim();


      const email = (formData.get("email") || "").toString().trim();


      const message = (formData.get("message") || "").toString().trim();





      if (!name || !email || !message) {


        createNotice("Veuillez remplir tous les champs.", false);


        return;


      }





      // basic email pattern


      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!emailPattern.test(email)) {


        createNotice("Adresse email invalide.", false);


        return;


      }





      // Simulate sending (client-side only)


      const data = new FormData(form);


      const name = (data.get("name") || "").toString().trim();


      const email = (data.get("email") || "").toString().trim();


      const message = (data.get("message") || "").toString().trim();


      if (!name || !email || !message) return notice("Veuillez remplir tous les champs.", false);


      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!re.test(email)) return notice("Email invalide.", false);


      // simulated send

      form.reset();


      createNotice("Message envoyé — merci !", true);


    });


  })();





  /* -----------------------------


     SMALL POLISH: Make sure nav links with same-page anchors get .active removed after clicking


  ----------------------------- */


  (function clearActiveOnAnchorClick() {


    $all('a[href^="#"]').forEach(a => {


      a.addEventListener("click", () => {


        $all(".nav-links a, nav a").forEach(link => link.classList.remove("active"));


      });


      notice("Message envoyé — merci !");

    });

  })();




  /* -----------------------------


     OPTIONAL: keyboard accessibility for back-to-top


  ----------------------------- */


  document.addEventListener("keydown", (e) => {


    if ((e.ctrlKey && e.key === "Home") || e.key === "Home") {


      window.scrollTo({ top: 0, behavior: "smooth" });


    }


  });

});
