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

// Work timeline data (from CV PDF)
const workTimeline = [
  {
    id: "apple-aiml",
    role: "Annotation Analyst",
    org: "Apple Distribution International (Cork, Ireland)",
    dates: "2023–2025",
    bullets: [
      "Quality assurance and analysis of Norwegian Bokmål language data (Apple AIML).",
      "Worked systematically with data structure, consistency, and language patterns in large datasets."
    ]
  },
  {
    id: "precision-sport-tech",
    role: "Data Analyst",
    org: "Precision Sport Technology (Galway, Ireland)",
    dates: "Summer 2023",
    bullets: [
      "Processed raw LiDAR data in Databricks.",
      "Identified patterns in training data using Python and R.",
      "Built dashboards and visualizations in Power BI for decision support."
    ]
  },
  {
    id: "skatteetaten",
    role: "Interaction Designer",
    org: "Skatteetaten (Helsfyr, Oslo)",
    dates: "Summer 2022",
    bullets: [
      "Contributed to an AI-based customer service solution.",
      "Worked with cross-functional teams to translate needs into technical solutions.",
      "Experience with user data, insights, and systematic problem solving."
    ]
  },
  {
    id: "sporveien",
    role: "IT Service Desk",
    org: "Sporveien AS (Tøyen, Oslo)",
    dates: "Summer 2020",
    bullets: [
      "Worked with internal IT service and observed ongoing projects in Sporveien."
    ]
  },
  {
    id: "compass-group",
    role: "Service Staff",
    org: "Compass Group (Fornebu, Bærum)",
    dates: "2018–2019",
    bullets: [
      "Worked across roles (barista, server, canteen staff)."
    ]
  }
];

function renderWorkTimeline(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = items.map((item, idx) => {
    const bodyId = `${item.id}-body`;
    return `
      <div class="timeline-item">
        <div class="timeline-dot" aria-hidden="true"></div>

        <div class="timeline-card">
          <button class="timeline-header"
                  type="button"
                  aria-expanded="${idx === 0 ? "true" : "false"}"
                  aria-controls="${bodyId}"
                  data-toggle="${bodyId}">
            <div>
              <p class="timeline-title">${item.role}</p>
              <p class="timeline-meta">${item.org}</p>
            </div>
            <div class="timeline-dates">${item.dates}</div>
          </button>

          <div class="timeline-body" id="${bodyId}" ${idx === 0 ? "" : "hidden"}>
            <ul>
              ${item.bullets.map(b => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Click handlers (accordion-style; multiple can be open if you prefer)
  mount.querySelectorAll("button[data-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const bodyId = btn.getAttribute("data-toggle");
      const body = document.getElementById(bodyId);
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", String(!isOpen));
      if (body) body.hidden = isOpen;
    });
  });
}

// Call on load
document.addEventListener("DOMContentLoaded", () => {
  renderWorkTimeline("work-timeline", workTimeline);
});
