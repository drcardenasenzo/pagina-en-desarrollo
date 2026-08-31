(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  const closeMenu = () => {
    if (!toggle || !links) return;
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  };
  if (header) {
    const onScroll = () =>
      header.classList.toggle("scrolled", window.scrollY > 18);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu();
      } else {
        links.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Cerrar menú");
        document.body.classList.add("menu-open");
      }
    });
    links
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }
  const heroMedia = document.querySelector("#inicio.hero .hero-media");
  const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  if (heroMedia && !motionQuery.matches) {
    const hero = heroMedia.closest(".hero");
    let parallaxFrame = 0;
    const updateHeroParallax = () => {
      parallaxFrame = 0;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const compactViewport = innerWidth < 768;
      const maxShift = compactViewport ? 58 : 104;
      const scrollRatio = compactViewport ? 0.22 : 0.3;
      const offset = Math.min(maxShift, Math.max(0, -rect.top * scrollRatio));
      heroMedia.style.setProperty(
        "--hero-parallax-y",
        `${offset.toFixed(2)}px`,
      );
    };
    const requestHeroParallax = () => {
      if (!parallaxFrame)
        parallaxFrame = requestAnimationFrame(updateHeroParallax);
    };
    addEventListener("scroll", requestHeroParallax, { passive: true });
    addEventListener("resize", requestHeroParallax, { passive: true });
    updateHeroParallax();
  }
  if (!motionQuery.matches) {
    let pageLeaving = false;
    document.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          pageLeaving ||
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        if (link.target && link.target.toLowerCase() !== "_self") return;
        if (link.hasAttribute("download")) return;
        const rawHref = link.getAttribute("href") || "";
        if (/^(#|mailto:|tel:|javascript:)/i.test(rawHref)) return;
        let destination;
        try {
          destination = new URL(link.href, location.href);
        } catch {
          return;
        }
        if (destination.origin !== location.origin) return;
        if (
          destination.pathname === location.pathname &&
          destination.search === location.search
        )
          return;
        event.preventDefault();
        pageLeaving = true;
        document.body.classList.add("is-leaving");
        setTimeout(() => location.assign(destination.href), 180);
      });
    });
    addEventListener("pageshow", () => {
      pageLeaving = false;
      document.body.classList.remove("is-leaving");
    });
  }
  document.querySelectorAll(".faq-question").forEach((btn, index) => {
    const item = btn.closest(".faq-item");
    const answer = item && item.querySelector(".faq-answer");
    if (answer) {
      const id = answer.id || `faq-answer-${index + 1}`;
      answer.id = id;
      btn.setAttribute("aria-controls", id);
      btn.setAttribute(
        "aria-expanded",
        String(item.classList.contains("open")),
      );
    }
    btn.addEventListener("click", () => {
      const willOpen = !item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((other) => {
        other.classList.remove("open");
        const otherBtn = other.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });
  const articlePendingImage = "/assets/img/placeholders/article-pending.svg";
  const articleImages = [
    ...document.querySelectorAll(".article-image img,.article-card img"),
  ];
  const getArticleSlug = (img) => {
    const card = img.closest("a.article-card");
    const sourcePath = card?.getAttribute("href") || location.pathname;
    return sourcePath.split("?")[0].split("/").filter(Boolean).pop();
  };
  const hydrateArticleImage = (img) => {
    if (!img || img.dataset.articleHydrated === "1") return;
    const slug = getArticleSlug(img);
    if (!slug) return;
    img.dataset.articleImage = `/assets/img/articles/${slug}.webp`;
    img.dataset.pendingImage = articlePendingImage;
    img.dataset.articleHydrated = "1";
    img.src = img.dataset.articleImage;
  };
  document
    .querySelectorAll("img[data-placeholder],.mapa-img")
    .forEach((img) => {
      const fallback = () => {
        if (img.dataset.failed) return;
        img.dataset.failed = "1";
        if (img.dataset.pendingImage) img.src = img.dataset.pendingImage;
        img.classList.add("image-missing");
      };
      img.addEventListener("error", fallback);
      if (
        !img.closest("a.article-card")?.hidden &&
        img.complete &&
        img.naturalWidth === 0
      )
        fallback();
    });
  articleImages.forEach((img) => {
    if (!img.closest("a.article-card")?.hidden) hydrateArticleImage(img);
  });
  const homeArticleGrid = document.querySelector("[data-articles-grid]");
  if (homeArticleGrid) {
    const cards = [...homeArticleGrid.querySelectorAll(".article-card")];
    const articleControls = document.querySelector("[data-article-controls]");
    const moreButton = document.querySelector("[data-articles-more]");
    const lessButton = document.querySelector("[data-articles-less]");
    const count = document.querySelector("[data-articles-count]");
    const step = 6;
    let visibleCount = Math.min(step, cards.length);
    const updateArticleVisibility = () => {
      cards.forEach((card, index) => {
        const visible = index < visibleCount;
        card.hidden = !visible;
        if (visible) hydrateArticleImage(card.querySelector("img"));
      });
      if (moreButton) moreButton.hidden = visibleCount >= cards.length;
      if (lessButton) lessButton.hidden = visibleCount <= step;
      if (count)
        count.textContent = `Mostrando ${visibleCount} de ${cards.length} artículos`;
    };
    moreButton?.addEventListener("click", () => {
      visibleCount = Math.min(cards.length, visibleCount + step);
      updateArticleVisibility();
    });
    lessButton?.addEventListener("click", () => {
      const controlsTopBefore = articleControls?.getBoundingClientRect().top;
      document.documentElement.classList.add("is-adjusting-articles");
      visibleCount = Math.max(step, visibleCount - step);
      updateArticleVisibility();
      if (Number.isFinite(controlsTopBefore)) {
        const keepControlsInPlace = () => {
          const controlsTopAfter = articleControls.getBoundingClientRect().top;
          const scrollCorrection = controlsTopAfter - controlsTopBefore;
          if (Math.abs(scrollCorrection) > 1)
            window.scrollBy(0, scrollCorrection);
        };
        keepControlsInPlace();
        requestAnimationFrame(() => {
          keepControlsInPlace();
          requestAnimationFrame(() => {
            keepControlsInPlace();
            document.documentElement.classList.remove("is-adjusting-articles");
          });
        });
      } else {
        document.documentElement.classList.remove("is-adjusting-articles");
      }
    });
    updateArticleVisibility();
  }

  const archiveGrid = document.querySelector("[data-article-archive]");
  if (archiveGrid) {
    const cards = [...archiveGrid.querySelectorAll(".article-card")];
    const filters = [...document.querySelectorAll("[data-article-filter]")];
    const moreButton = document.querySelector("[data-archive-more]");
    const lessButton = document.querySelector("[data-archive-less]");
    const count = document.querySelector("[data-archive-count]");
    const normalize = (value) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
    const aliases = {
      viajes: ["autorizaciones de viaje", "autorizacion judicial de viaje"],
      capacidad: ["capacidad y apoyos", "restriccion de capacidad"],
    };
    cards.forEach((card) => {
      card.dataset.topic = normalize(card.querySelector(".tag")?.textContent || "");
    });
    let activeFilter = "todos";
    let visibleCount = window.matchMedia("(max-width: 639px)").matches ? 6 : 12;
    const pageSize = () =>
      window.matchMedia("(max-width: 639px)").matches ? 6 : 12;
    const filteredCards = () => {
      if (activeFilter === "todos") return cards;
      const accepted = aliases[activeFilter] || [activeFilter];
      return cards.filter((card) => accepted.includes(card.dataset.topic));
    };
    const updateArchive = () => {
      const matches = filteredCards();
      const visibleSet = new Set(matches.slice(0, visibleCount));
      cards.forEach((card) => {
        card.hidden = !visibleSet.has(card);
        if (!card.hidden) hydrateArticleImage(card.querySelector("img"));
      });
      if (moreButton) moreButton.hidden = visibleCount >= matches.length;
      if (lessButton) lessButton.hidden = visibleCount <= pageSize();
      if (count)
        count.textContent = `Mostrando ${Math.min(visibleCount, matches.length)} de ${matches.length} artículos`;
    };
    const applyFilter = (filter) => {
      activeFilter = filter;
      visibleCount = pageSize();
      filters.forEach((button) => {
        const active = button.dataset.articleFilter === activeFilter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      updateArchive();
    };
    filters.forEach((button) =>
      button.addEventListener("click", () => applyFilter(button.dataset.articleFilter)),
    );
    moreButton?.addEventListener("click", () => {
      visibleCount += pageSize();
      updateArchive();
    });
    lessButton?.addEventListener("click", () => {
      visibleCount = Math.max(pageSize(), visibleCount - pageSize());
      updateArchive();
    });
    const requestedTopic = normalize(new URLSearchParams(location.search).get("tema") || "");
    const knownFilter = filters.some(
      (button) => button.dataset.articleFilter === requestedTopic,
    );
    applyFilter(knownFilter ? requestedTopic : "todos");
  }

  const syncServiceArticleStack = (grid) => {
    if (!grid) return;
    const visibleCards = [...grid.querySelectorAll(".article-card")].filter(
      (card) => !card.hidden,
    );
    visibleCards.forEach((card, index) => {
      card.style.setProperty("--service-article-order", String(index + 1));
      card.style.setProperty("--service-article-mobile-offset", `${index * 8}px`);
      card.style.setProperty(
        "--service-article-desktop-offset",
        `${Math.floor(index / 3) * 10}px`,
      );
    });
  };

  document
    .querySelectorAll("[data-service-article-stack]")
    .forEach(syncServiceArticleStack);

  const familyFeaturedGrid = document.querySelector("[data-family-featured-articles]");
  if (familyFeaturedGrid) {
    const featuredArticles = new Set([
      "/articulos/cuanto-corresponde-cuota-alimentaria-hijos/",
      "/articulos/incumplimiento-cuota-alimentaria-que-hacer/",
      "/articulos/divorcio-express-argentina/",
      "/articulos/division-bienes-divorcio/",
      "/articulos/no-me-dejan-ver-a-mi-hijo/",
      "/articulos/como-pedir-regimen-comunicacion-caba/",
      "/articulos/cuidado-personal-hijos/",
      "/articulos/mudarse-con-hijo-sin-consentimiento/",
      "/articulos/como-pedir-perimetral-caba/",
      "/articulos/juicio-filiacion-paternidad/",
      "/articulos/autorizacion-judicial-viaje-menor-caba/",
      "/articulos/como-iniciar-restriccion-capacidad-caba/",
    ]);
    familyFeaturedGrid.querySelectorAll(".article-card").forEach((card) => {
      card.hidden = !featuredArticles.has(new URL(card.href).pathname);
      if (!card.hidden) hydrateArticleImage(card.querySelector("img"));
    });
    syncServiceArticleStack(familyFeaturedGrid);
  }
  const oldHashRoutes = {
    5: "/articulos/hasta-que-edad-se-paga-cuota-alimentaria/",
    6: "/articulos/matrimonio-vs-union-convivencial/",
    7: "/articulos/divorcio-express-argentina/",
    8: "/articulos/quien-se-queda-casa-divorcio-separacion/",
    9: "/articulos/cuanto-tarda-sucesion-caba/",
    10: "/articulos/regimen-comunicacion-mascotas/",
    12: "/articulos/alimentos-abuelos-nietos/",
  };
  const legacyMatch = location.hash.match(
    /^#modal-modal-articulos-articulo-full-(\d+)$/,
  );
  if (legacyMatch && oldHashRoutes[legacyMatch[1]])
    location.replace(oldHashRoutes[legacyMatch[1]]);
  const testimonials = [
    ...document.querySelectorAll(".testimonials-container .testimonial"),
  ];
  if (testimonials.length > 1) {
    let current = testimonials.findIndex((t) => t.classList.contains("active"));
    if (current < 0) current = 0;
    testimonials.forEach((testimonial, index) =>
      testimonial.setAttribute("aria-hidden", String(index !== current)),
    );
    setInterval(() => {
      testimonials[current].classList.remove("active");
      testimonials[current].setAttribute("aria-hidden", "true");
      current = (current + 1) % testimonials.length;
      testimonials[current].classList.add("active");
      testimonials[current].setAttribute("aria-hidden", "false");
    }, 5000);
  }
  if (
    "IntersectionObserver" in window &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const nodes = [...document.querySelectorAll(
      ".card,.article-card,.process-card",
    )].filter(
      (node) =>
        !node.closest("[data-service-stack],[data-service-article-stack]"),
    );
    nodes.forEach((n) => n.classList.add("reveal-ready"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -8%" },
    );
    nodes.forEach((n) => io.observe(n));
  }
})();
