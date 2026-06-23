import { renderFilterBar, renderStudiesTimeline, renderWorkTimeline, renderProjectsGrid } from "./render.js";
import { applyFilter } from "./filter.js";
import { studiesTimeline } from "./data/studies.js";
import { workTimeline } from "./data/work.js";
import { projectsTimeline } from "./data/projects.js";


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
  applyFilter();
  triggerStaggeredEntrance(id);
}

function currentFromHash() {
  return window.location.hash.replace("#", "") || "studies";
}

window.addEventListener("hashchange", () => showPanel(currentFromHash()));


/* ───────────────────────────────────────
   Initialise
   ─────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderFilterBar("filter-bar");
  renderStudiesTimeline("studies-timeline", studiesTimeline);
  renderWorkTimeline("work-timeline", workTimeline);
  renderProjectsGrid("projects-grid", projectsTimeline);
  showPanel(currentFromHash());
});
