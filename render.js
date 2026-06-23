import { categories } from "./data/categories.js";
import { setFilter } from "./filter.js";

function getCategoryStyle(tagId) {
  if (!tagId) return "";
  return `background:var(--cat-${tagId}-bg);color:var(--cat-${tagId}-color);border-color:var(--cat-${tagId}-color)`;
}

export function renderFilterBar(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = `
    <div class="filter-bar" role="group" aria-label="Filter by domain">
      <span class="filter-label">Explore by domain</span>
      ${categories.map(c => `
        <button class="filter-btn" type="button" data-category="${c.id}"
                style="--cat-color:var(--cat-${c.id}-color);--cat-bg:var(--cat-${c.id}-bg)">
          ${c.label}
        </button>
      `).join("")}
    </div>
  `;
  mount.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.category));
  });
}

function renderSkills(skills) {
  if (!skills?.length) return "";
  return `
    <div class="skills-row">
      ${skills.map(s => `
        <span class="skill-chip" data-tag="${s.tag}" style="${getCategoryStyle(s.tag)}">${s.name}</span>
      `).join("")}
    </div>
  `;
}

function renderTimelineProjects(projects, parentTags) {
  if (!projects?.length) return "";
  return `
    <div class="projects-section">
      <p class="projects-heading">Projects</p>
      ${projects.map(p => `
        <div class="project-card" data-tags="${(parentTags || []).join(",")}">
          <p class="project-title">${p.title}</p>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tools">
            ${p.tools.map(t => `<span class="tool-chip">${t}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderCourses(courses, itemId) {
  if (!courses?.length) return "";
  const toggleId = `${itemId}-courses`;
  return `
    <div class="courses-toggle-section">
      <button class="courses-toggle-btn" type="button"
              aria-expanded="false"
              aria-controls="${toggleId}"
              data-courses-toggle="${toggleId}">
        <span class="courses-toggle-icon">+</span>
        Course list (${courses.length})
      </button>
      <ul class="courses-hidden-list" id="${toggleId}" hidden>
        ${courses.map(c => `<li>${c}</li>`).join("")}
      </ul>
    </div>
  `;
}

function bindToggles(container) {
  container.querySelectorAll("button[data-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const body = document.getElementById(btn.getAttribute("data-toggle"));
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      if (body) body.hidden = isOpen;
    });
  });
}

function bindCourseToggles(container) {
  container.querySelectorAll("button[data-courses-toggle]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const list = document.getElementById(btn.getAttribute("data-courses-toggle"));
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      btn.querySelector(".courses-toggle-icon").textContent = isOpen ? "+" : "−";
      if (list) list.hidden = isOpen;
    });
  });
}

export function renderStudiesTimeline(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = items.map((item, idx) => {
    const bodyId = `${item.id}-body`;
    const tagsAttr = (item.tags || []).join(",");
    return `
      <div class="timeline-item enter" data-tags="${tagsAttr}" style="animation-delay:${idx * 0.08}s">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-card">
          <button class="timeline-header" type="button"
                  aria-expanded="${idx === 0 ? "true" : "false"}"
                  aria-controls="${bodyId}" data-toggle="${bodyId}">
            <div>
              <p class="timeline-title">${item.title}</p>
              <p class="timeline-meta">${item.org}</p>
            </div>
            <div class="timeline-dates">${item.dates}</div>
          </button>
          <div class="timeline-body" id="${bodyId}" ${idx === 0 ? "" : "hidden"}>
            <p class="item-summary">${item.summary}</p>
            ${renderSkills(item.skills)}
            ${renderTimelineProjects(item.projects, item.tags)}
            ${renderCourses(item.courses, item.id)}
          </div>
        </div>
      </div>
    `;
  }).join("");
  bindToggles(mount);
  bindCourseToggles(mount);
}

export function renderWorkTimeline(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = items.map((item, idx) => {
    const bodyId = `${item.id}-body`;
    const tagsAttr = (item.tags || []).join(",");
    return `
      <div class="timeline-item enter" data-tags="${tagsAttr}" style="animation-delay:${idx * 0.08}s">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-card">
          <button class="timeline-header" type="button"
                  aria-expanded="${idx === 0 ? "true" : "false"}"
                  aria-controls="${bodyId}" data-toggle="${bodyId}">
            <div>
              <p class="timeline-title">${item.role}</p>
              <p class="timeline-meta">${item.org}</p>
            </div>
            <div class="timeline-dates">${item.dates}</div>
          </button>
          <div class="timeline-body" id="${bodyId}" ${idx === 0 ? "" : "hidden"}>
            <p class="item-summary">${item.summary}</p>
            ${renderSkills(item.skills)}
            ${renderTimelineProjects(item.projects, item.tags)}
          </div>
        </div>
      </div>
    `;
  }).join("");
  bindToggles(mount);
}

const STATUS_LABELS = {
  "active":      "Active",
  "in-progress": "In progress",
  "archived":    "Archived"
};

export function renderProjectsGrid(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  if (!items.length) {
    mount.innerHTML = `<p class="empty-state">Projects coming soon.</p>`;
    return;
  }

  mount.innerHTML = items.map((item, idx) => {
    const tagsAttr = (item.tags || []).join(",");
    const statusLabel = STATUS_LABELS[item.status] || "";
    const linksHtml = [
      item.github ? `<a class="showcase-link" href="${item.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : "",
      item.demo   ? `<a class="showcase-link showcase-link--demo" href="${item.demo}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>` : ""
    ].filter(Boolean).join("");

    return `
      <article class="showcase-card enter" data-tags="${tagsAttr}" style="animation-delay:${idx * 0.07}s">
        <div class="showcase-header">
          <div>
            <h3 class="showcase-title">${item.title}</h3>
            ${item.year ? `<span class="showcase-year">${item.year}</span>` : ""}
          </div>
          ${statusLabel ? `<span class="status-badge status-${item.status}">${statusLabel}</span>` : ""}
        </div>
        ${item.desc ? `<p class="showcase-desc">${item.desc}</p>` : ""}
        ${item.tech?.length ? `
          <div class="project-tools">
            ${item.tech.map(t => `<span class="tool-chip">${t}</span>`).join("")}
          </div>
        ` : ""}
        ${linksHtml ? `<div class="showcase-links">${linksHtml}</div>` : ""}
      </article>
    `;
  }).join("");
}


/* ───────────────────────────────────────
   Home windows
   ─────────────────────────────────────── */

export function renderHomeWindows(mountId, windows, onNavigate) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = `
    <div class="home-windows">
      ${windows.map(win => renderWindow(win)).join("")}
    </div>
  `;

  mount.querySelectorAll(".home-window").forEach(el => initSlideshow(el, onNavigate));
}

function renderWindow(win) {
  const comingSoon = win.items.length === 0;
  const slides = comingSoon
    ? [{ id: null, title: "Coming soon", meta: "Check back later", bgVar: `--win-${win.id}-color` }]
    : win.items.map(item => ({ ...item }));

  return `
    <div class="home-window" style="--win-color:var(--win-${win.id}-color)">
      <div class="window-header">
        <span aria-hidden="true">${win.icon}</span>
        ${win.label}
      </div>
      <div class="window-slides-wrapper">
        ${slides.map((slide, i) => `
          <div class="window-slide ${i === 0 ? "active" : ""}"
               data-section="${win.id}"
               data-item="${slide.id || ""}"
               style="background:var(${slide.bgVar})"
               role="button"
               tabindex="0"
               aria-label="View: ${slide.title}">
            <div class="slide-content">
              <p class="slide-title">${slide.title}</p>
              <p class="slide-meta">${slide.meta}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="window-footer">
        <div class="window-dots">
          ${slides.map((_, i) => `
            <button class="window-dot ${i === 0 ? "active" : ""}"
                    data-idx="${i}"
                    type="button"
                    aria-label="Slide ${i + 1}"></button>
          `).join("")}
        </div>
        ${!comingSoon ? `<button class="window-view-all" type="button" data-section="${win.id}">View all →</button>` : ""}
      </div>
    </div>
  `;
}

function initSlideshow(windowEl, onNavigate) {
  const slides = windowEl.querySelectorAll(".window-slide");
  const dots   = windowEl.querySelectorAll(".window-dot");
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove("active");
    dots[current]?.classList.remove("active");
    current = ((idx % slides.length) + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current]?.classList.add("active");
  }

  function start() { timer = setInterval(() => goTo(current + 1), 4000); }
  function stop()  { clearInterval(timer); }

  windowEl.addEventListener("mouseenter", stop);
  windowEl.addEventListener("mouseleave", start);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", e => {
      e.stopPropagation();
      goTo(i);
      stop(); start();
    });
  });

  slides.forEach(slide => {
    slide.addEventListener("click", () => {
      const section = slide.dataset.section;
      const itemId  = slide.dataset.item || null;
      if (section && onNavigate) onNavigate(section, itemId);
    });
    slide.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); slide.click(); }
    });
  });

  windowEl.querySelector(".window-view-all")?.addEventListener("click", e => {
    e.stopPropagation();
    const section = slides[0]?.dataset.section;
    if (section && onNavigate) onNavigate(section, null);
  });

  goTo(0);
  start();
}


/* ───────────────────────────────────────
   Journey timeline (squiggly)
   ─────────────────────────────────────── */

export function renderJourneyTimeline(mountId, events, onNavigate) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const spacing = 148;
  const topPad  = 30;
  const totalH  = topPad + (events.length - 1) * spacing + topPad + 20;

  // Alternate points left (x=22) / right (x=78) in a 0-100 viewBox
  const pts = events.map((ev, i) => ({
    x: i % 2 === 0 ? 22 : 78,
    y: topPad + i * spacing,
    left: i % 2 === 0,
    ev
  }));

  // Build smooth cubic-bezier path
  let d = `M 50 0`;
  for (let i = 0; i < pts.length; i++) {
    const { x, y } = pts[i];
    const prevX = i === 0 ? 50 : pts[i - 1].x;
    const prevY = i === 0 ? 0  : pts[i - 1].y;
    const dy = y - prevY;
    d += ` C ${prevX} ${prevY + dy * 0.55}, ${x} ${y - dy * 0.35}, ${x} ${y}`;
  }
  const last = pts[pts.length - 1];
  const dyTail = totalH - last.y;
  d += ` C ${last.x} ${last.y + dyTail * 0.45}, 50 ${totalH - dyTail * 0.2}, 50 ${totalH}`;

  // Dot elements in SVG
  const svgDots = pts.map(pt => `
    <circle cx="${pt.x}" cy="${pt.y}" r="5.5"
            fill="${pt.ev.type === 'study' ? 'var(--cat-ai-ml-color)' : 'var(--cat-system-dev-color)'}"
            stroke="white" stroke-width="2.5"/>
  `).join("");

  // Event cards (HTML positioned absolutely)
  const cards = pts.map(pt => `
    <div class="journey-event ${pt.left ? 'left' : 'right'}"
         style="top:${pt.y - 34}px"
         role="button" tabindex="0"
         data-section="${pt.ev.section}"
         data-item="${pt.ev.id}"
         aria-label="Go to: ${pt.ev.title}">
      <div class="event-card">
        <span class="event-badge ${pt.ev.type}">${pt.ev.type === 'study' ? '📚' : '💼'}</span>
        <p class="event-title">${pt.ev.title}</p>
        <p class="event-org">${pt.ev.org.split(' (')[0].trim()}</p>
        <p class="event-dates">${pt.ev.dates}</p>
      </div>
    </div>
  `).join("");

  mount.style.height = `${totalH}px`;
  mount.innerHTML = `
    <svg class="journey-svg"
         viewBox="0 0 100 ${totalH}"
         preserveAspectRatio="none"
         width="100%" height="${totalH}"
         aria-hidden="true">
      <path d="${d}" fill="none"
            stroke="var(--color-accent)" stroke-width="0.45"
            stroke-linecap="round"/>
      ${svgDots}
    </svg>
    ${cards}
  `;

  mount.querySelectorAll(".journey-event").forEach(el => {
    const go = () => {
      if (onNavigate) onNavigate(el.dataset.section, el.dataset.item);
    };
    el.addEventListener("click", go);
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });
}
