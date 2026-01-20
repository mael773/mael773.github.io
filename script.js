(function () {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  (function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    $$('nav a[href]').forEach((a) => {
      const href = (a.getAttribute('href') || '').split('/').pop();
      if (!href) return;
      if (href === path) {
        a.setAttribute('aria-current', 'page');
      } else if (a.getAttribute('aria-current') === 'page') {
        a.removeAttribute('aria-current');
      }
    });
  })();

  (function smoothScrollLinks() {
    $$('a[data-scroll-to]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const targetId = a.getAttribute('data-scroll-to');
        if (!targetId) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  })();

  (function revealOnScroll() {
    const revealSelector = '.fade, .timeline-item, .timeline-dot, .timeline-content';
    const staggerContainersSelector = '.grid-2, .skills-grid';

    const revealEls = $$(revealSelector);
    const staggerContainers = $$(staggerContainersSelector);

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('visible'));
      staggerContainers.forEach((c) => Array.from(c.children).forEach((ch) => ch.classList.add('visible')));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          el.classList.add('visible');
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));

    const ioGrid = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          const children = Array.from(el.children);
          children.forEach((ch, i) => {
            setTimeout(() => ch.classList.add('visible'), i * 70);
          });
          ioGrid.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    staggerContainers.forEach((el) => ioGrid.observe(el));
  })();

  // Timeline expand/collapse
  (function timelineToggle() {
    const toggles = $$('.timeline-toggle');
    if (!toggles.length) return;

    toggles.forEach((btn) => {
      const targetId = btn.getAttribute('aria-controls');
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const setState = (expanded) => {
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        panel.hidden = !expanded;
        btn.textContent = expanded ? 'Afficher moins' : 'Afficher plus';
      };

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        setState(!expanded);
      });

      // ensure initial state (hidden by default)
      setState(false);
    });
  })();

  (function backToTop() {
    if (document.getElementById('scrollTopBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.type = 'button';
    btn.textContent = '↑';
    btn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const onScroll = () => {
      btn.classList.toggle('show', window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
})();
