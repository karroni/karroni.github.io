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
    color: "#8B5CF6",
    items: studiesTimeline.map((item, i) => ({
      id:    item.id,
      title: item.title,
      meta:  `${item.org} · ${item.dates}`,
      bg: [
        "linear-gradient(145deg, #9F7AEA 0%, #6B46C1 100%)",
        "linear-gradient(145deg, #667EEA 0%, #4C51BF 100%)",
        "linear-gradient(145deg, #B794F4 0%, #7C3AED 100%)"
      ][i]
    }))
  },
  {
    id: "work",
    label: "Work",
    icon: "💼",
    color: "#F59E0B",
    items: workTimeline.filter(w => w.tags.length > 0).map((item, i) => ({
      id:    item.id,
      title: item.role,
      meta:  `${item.org} · ${item.dates}`,
      bg: [
        "linear-gradient(145deg, #1a1a2e 0%, #3c3c7e 100%)",
        "linear-gradient(145deg, #0EA5C9 0%, #0369A1 100%)",
        "linear-gradient(145deg, #F43F5E 0%, #BE123C 100%)",
        "linear-gradient(145deg, #10B981 0%, #047857 100%)",
        "linear-gradient(145deg, #F59E0B 0%, #B45309 100%)"
      ][i]
    }))
  },
  {
    id: "projects",
    label: "Projects",
    icon: "⚡",
    color: "#0EA5C9",
    items: projectsTimeline.map(item => ({
      id:    item.id,
      title: item.title,
      meta:  (item.tech || []).slice(0, 3).join(" · "),
      bg:    "linear-gradient(145deg, #0EA5C9 0%, #0369A1 100%)"
    }))
  },
  {
    id: "travels",
    label: "Travels",
    icon: "✈️",
    color: "#10B981",
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
