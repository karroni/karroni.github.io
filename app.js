import { renderFilterBar, renderStudiesTimeline, renderWorkTimeline, renderProjectsGrid, renderHomeWindows } from "./render.js";
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
   Home windows config
   ─────────────────────────────────────── */

const homeWindows = [
  {
    id: "studies",
    label: "Studies",
    icon: "📚",
    color: "#7c5ea3",
    items: studiesTimeline.map((item, i) => ({
      id:    item.id,
      title: item.title,
      meta:  `${item.org} · ${item.dates}`,
      bg: [
        "linear-gradient(145deg, #8b6ac4 0%, #4a3070 100%)",
        "linear-gradient(145deg, #4e90cc 0%, #2a5a8a 100%)",
        "linear-gradient(145deg, #7a8fd4 0%, #3a4a8a 100%)"
      ][i]
    }))
  },
  {
    id: "work",
    label: "Work",
    icon: "💼",
    color: "#c47f35",
    items: workTimeline.filter(w => w.tags.length > 0).map((item, i) => ({
      id:    item.id,
      title: item.role,
      meta:  `${item.org} · ${item.dates}`,
      bg: [
        "linear-gradient(145deg, #1c1c3a 0%, #3c3c7e 100%)",
        "linear-gradient(145deg, #1a7a6e 0%, #0d4a44 100%)",
        "linear-gradient(145deg, #c44060 0%, #7a2040 100%)",
        "linear-gradient(145deg, #3a9a7a 0%, #1a6a4a 100%)",
        "linear-gradient(145deg, #e67c20 0%, #a44a10 100%)"
      ][i]
    }))
  },
  {
    id: "projects",
    label: "Projects",
    icon: "⚡",
    color: "#3d8b9e",
    items: projectsTimeline.map(item => ({
      id:    item.id,
      title: item.title,
      meta:  (item.tech || []).slice(0, 3).join(" · "),
      bg:    "linear-gradient(145deg, #3d8b9e 0%, #1d5a6b 100%)"
    }))
  },
  {
    id: "travels",
    label: "Travels",
    icon: "✈️",
    color: "#5a8a58",
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
  renderHomeWindows("home-windows", homeWindows, navigateTo);
  showPanel(currentFromHash());
});
