import { categories } from "./data/categories.js";

let activeFilter = null;

export function setFilter(categoryId) {
  activeFilter = (activeFilter === categoryId) ? null : categoryId;
  applyFilter();
  updateFilterButtons();
}

export function applyFilter() {
  document.querySelectorAll(".timeline-item[data-tags]").forEach(item => {
    const tags = item.dataset.tags.split(",").filter(Boolean);
    item.classList.toggle("faded", !!activeFilter && !tags.includes(activeFilter));
  });

  document.querySelectorAll(".skill-chip[data-tag]").forEach(chip => {
    if (!activeFilter) {
      chip.classList.remove("skill-highlight", "faded");
    } else if (chip.dataset.tag === activeFilter) {
      chip.classList.add("skill-highlight");
      chip.classList.remove("faded");
    } else {
      chip.classList.remove("skill-highlight");
      chip.classList.add("faded");
    }
  });

  document.querySelectorAll(".project-card[data-tags], .showcase-card[data-tags]").forEach(card => {
    const tags = card.dataset.tags.split(",").filter(Boolean);
    card.classList.toggle("faded", !!activeFilter && !tags.includes(activeFilter));
  });
}

export function updateFilterButtons() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.dataset.category === activeFilter) {
      btn.classList.add("filter-active");
      btn.style.background   = `var(--cat-${activeFilter}-color)`;
      btn.style.color        = "#fff";
      btn.style.borderColor  = `var(--cat-${activeFilter}-color)`;
    } else {
      btn.classList.remove("filter-active");
      btn.style.cssText = "";
    }
  });
}
