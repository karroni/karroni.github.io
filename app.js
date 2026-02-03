function showPanel(id) {
  const panels = document.querySelectorAll("[data-panel]");
  const tabs = document.querySelectorAll(".tab");

  panels.forEach(p => {
    p.hidden = (p.id !== id);
  });

  tabs.forEach(t => {
    const isActive = t.dataset.section === id;
    if (isActive) t.setAttribute("aria-current", "page");
    else t.removeAttribute("aria-current");
  });
}

function currentFromHash() {
  const hash = window.location.hash.replace("#", "");
  return hash || "studies"; // default section
}

window.addEventListener("hashchange", () => {
  showPanel(currentFromHash());
});

document.addEventListener("DOMContentLoaded", () => {
  showPanel(currentFromHash());
});
