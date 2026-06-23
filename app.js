import { renderFilterBar, renderStudiesTimeline, renderWorkTimeline, renderProjectsGrid, renderHomeWindows, renderJourneyTimeline } from "./render.js";
import { applyFilter } from "./filter.js";
import { studiesTimeline } from "./data/studies.js";
import { workTimeline } from "./data/work.js";
import { projectsTimeline } from "./data/projects.js";


/* ───────────────────────────────────────
   Deep-link navigation
   ─────────────────────────────────────── */

let pendingScrollTarget = null;

function openAndScrollTo(itemId) {
  if (!itemId) return;
  const bodyEl = document.getElementById(`${itemId}-body`);
  const btnEl  = document.querySelector(`[data-toggle="${itemId}-body"]`);
  if (bodyEl && btnEl) {
    bodyEl.hidden = false;
    btnEl.setAttribute("aria-expanded", "true");
    const itemEl = bodyEl.closest(".timeline-item");
    setTimeout(() => itemEl?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
  pendingScrollTarget = null;
}

export function navigateTo(sectionId, itemId) {
  if (currentFromHash() === sectionId) {
    openAndScrollTo(itemId);
  } else {
    if (itemId) pendingScrollTarget = itemId;
    window.location.hash = sectionId;
  }
}


/* ───────────────────────────────────────
   Navigation: hash-based panel switching
   ─────────────────────────────────────── */

function triggerStaggeredEntrance(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.querySelectorAll(".timeline-item, .showcase-card").forEach((item, i) => {
    item.style.animationDelay = `${i * 0.08}s`;
    item.classList.remove("enter");
    void item.offsetWidth;
    item.classList.add("enter");
  });
}

function showPanel(id) {
  document.querySelectorAll("[data-panel]").forEach(p => { p.hidden = p.id !== id; });
  document.querySelectorAll(".tab").forEach(t => {
    if (t.dataset.section === id) t.setAttribute("aria-current", "page");
    else t.removeAttribute("aria-current");
  });
  document.getElementById("filter-bar").hidden = (id === "home");
  applyFilter();
  triggerStaggeredEntrance(id);
  if (pendingScrollTarget) setTimeout(() => openAndScrollTo(pendingScrollTarget), 80);
}

function currentFromHash() {
  return window.location.hash.replace("#", "") || "home";
}

window.addEventListener("hashchange", () => showPanel(currentFromHash()));


/* ───────────────────────────────────────
   Journey timeline events
   ─────────────────────────────────────── */

function extractStartYear(dateStr) {
  const m = dateStr.match(/(\d{4})/);
  return m ? parseInt(m[1]) : 0;
}

const timelineEvents = [
  ...studiesTimeline.map(item => ({
    id:      item.id,
    title:   item.title,
    org:     item.org,
    dates:   item.dates,
    type:    "study",
    section: "studies",
    year:    extractStartYear(item.dates)
  })),
  ...workTimeline.filter(w => w.tags.length > 0).map(item => ({
    id:      item.id,
    title:   item.role,
    org:     item.org,
    dates:   item.dates,
    type:    "work",
    section: "work",
    year:    extractStartYear(item.dates)
  }))
].sort((a, b) => b.year - a.year);


/* ───────────────────────────────────────
   Home windows config
   ─────────────────────────────────────── */

const homeWindows = [
  {
    id: "studies",
    label: "Studies",
    icon: "📚",
    items: studiesTimeline.map((item, i) => ({
      id:    item.id,
      title: item.title,
      meta:  `${item.org} · ${item.dates}`,
      bgVar: `--slide-studies-${i}`
    }))
  },
  {
    id: "work",
    label: "Work",
    icon: "💼",
    items: workTimeline.filter(w => w.tags.length > 0).map((item, i) => ({
      id:    item.id,
      title: item.role,
      meta:  `${item.org} · ${item.dates}`,
      bgVar: `--slide-work-${i}`
    }))
  },
  {
    id: "projects",
    label: "Projects",
    icon: "⚡",
    items: projectsTimeline.map((item, i) => ({
      id:    item.id,
      title: item.title,
      meta:  (item.tech || []).slice(0, 3).join(" · "),
      bgVar: `--slide-projects-${i}`
    }))
  },
  {
    id: "travels",
    label: "Travels",
    icon: "✈️",
    items: []
  }
];


/* ───────────────────────────────────────
   Initialise
   ─────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderFilterBar("filter-bar");
  renderStudiesTimeline("studies-timeline", studiesTimeline);
  renderWorkTimeline("work-timeline", workTimeline);
  renderProjectsGrid("projects-grid", projectsTimeline);
  renderJourneyTimeline("journey-timeline", timelineEvents, navigateTo);
  renderHomeWindows("home-windows", homeWindows, navigateTo);
  showPanel(currentFromHash());
});
