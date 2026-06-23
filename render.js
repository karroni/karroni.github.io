import { categories } from "./data/categories.js";
import { setFilter } from "./filter.js";

function getCategoryStyle(tagId) {
  const cat = categories.find(c => c.id === tagId);
  return cat ? `background:${cat.bg};color:${cat.color};border-color:${cat.color}` : "";
}

export function renderFilterBar(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = `
    <div class="filter-bar" role="group" aria-label="Filter by domain">
      <span class="filter-label">Explore by domain</span>
      ${categories.map(c => `
        <button class="filter-btn" type="button" data-category="${c.id}"
                style="--cat-color:${c.color};--cat-bg:${c.bg}">
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
