/* ───────────────────────────────────────
   Navigation: hash-based panel switching
   ─────────────────────────────────────── */

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
  return hash || "studies";
}

window.addEventListener("hashchange", () => {
  showPanel(currentFromHash());
});

document.addEventListener("DOMContentLoaded", () => {
  showPanel(currentFromHash());
});


/* ───────────────────────────────────────
   Category definitions
   ─────────────────────────────────────── */

const categories = [
  { id: "data-analytics",    label: "Data Analytics" },
  { id: "ai-ml",             label: "AI & Machine Learning" },
  { id: "system-dev",        label: "System Development" },
  { id: "interaction-design", label: "Interaction Design" },
  { id: "research-society",  label: "Research & Society" }
];


/* ───────────────────────────────────────
   Studies data
   ─────────────────────────────────────── */

const studiesTimeline = [
  {
    id: "msc-oslomet",
    title: "MSc Applied Artificial Intelligence",
    org: "OsloMet – Oslo Metropolitan University",
    dates: "2024–2026",
    tags: ["ai-ml", "data-analytics", "research-society", "interaction-design"],
    bullets: [
      "Specialisation in applied AI methods including deep learning, evolutionary computation, and computational intelligence.",
      "Currently in semester 2 (Spring 2026)."
    ],
    courses: [
      { name: "Computational Intelligence: Theory & Applications", tag: "ai-ml" },
      { name: "Evolutionary AI and Robotics",                      tag: "ai-ml" },
      { name: "Understanding and Communicating Research",           tag: "research-society" },
      { name: "Advanced Machine Learning & Deep Learning",          tag: "ai-ml" },
      { name: "Interdisciplinary Innovation & Complex Problems",    tag: "interaction-design" },
      { name: "Security Politics, Cyberwar & Ethics",               tag: "research-society" },
      { name: "Technology and Society: Critical Perspectives",      tag: "research-society" }
    ]
  },
  {
    id: "hdip-galway",
    title: "Higher Diploma in Data Analytics",
    org: "University of Galway (formerly NUI Galway)",
    dates: "2022–2023",
    tags: ["data-analytics", "system-dev", "interaction-design"],
    bullets: [
      "One-year conversion programme focused on data analytics, visualisation, and applied statistics.",
      "Completed an industry project with Precision Sports Technology (now KinetikIQ) using Azure, Databricks, and Power BI."
    ],
    courses: [
      { name: "Data Visualisation (R & Python)",        tag: "data-analytics" },
      { name: "Databases (SQL)",                        tag: "system-dev" },
      { name: "Industrial Data Analytics Project",      tag: "data-analytics" },
      { name: "Business Intelligence (Power BI)",       tag: "data-analytics" },
      { name: "Applied Data Science with R",            tag: "data-analytics" },
      { name: "Human-Computer Interaction",             tag: "interaction-design" },
      { name: "Internet Programming (HTML/CSS/JS)",     tag: "system-dev" },
      { name: "Statistics for Data Science 1 & 2",      tag: "data-analytics" }
    ]
  },
  {
    id: "bsc-uia",
    title: "BSc IT and Information Systems",
    org: "University of Agder (UiA), Kristiansand",
    dates: "2019–2022",
    tags: ["system-dev", "interaction-design", "data-analytics", "research-society"],
    bullets: [
      "Three-year programme covering system development, digital transformation, and information systems.",
      "Bachelor thesis: Design and development of the website for RKG eHelse Agder (graded A)."
    ],
    courses: [
      { name: "Digital Interaction Design",                           tag: "interaction-design" },
      { name: "Co-creation – Communication & Project Work",           tag: "interaction-design" },
      { name: "The Role of Digitalisation in Future Societies",       tag: "research-society" },
      { name: "Object-Oriented Programming",                         tag: "system-dev" },
      { name: "Data Communications and Operating Systems",            tag: "system-dev" },
      { name: "Business Administration for IT Students",              tag: "research-society" },
      { name: "Organisational Theory for IT Students",                tag: "research-society" },
      { name: "Systems Analysis and Design",                          tag: "system-dev" },
      { name: "Data Modelling and Database Systems",                  tag: "system-dev" },
      { name: "Programming Project",                                  tag: "system-dev" },
      { name: "Service Design and Business Development",              tag: "interaction-design" },
      { name: "Data Science Applications",                            tag: "data-analytics" },
      { name: "Universal Design of Information Systems",              tag: "interaction-design" },
      { name: "IT and Changes in Society",                            tag: "research-society" },
      { name: "Internet of Things",                                   tag: "system-dev" },
      { name: "Research Methods in Social Science",                   tag: "research-society" },
      { name: "Project Management in Practice",                       tag: "research-society" },
      { name: "Internship",                                           tag: "system-dev" },
      { name: "Bachelor Thesis – eHelse Agder Website (Grade: A)",   tag: "system-dev" },
      { name: "Current IT-related Topics, Sustainability & Digitalisation", tag: "research-society" }
    ]
  }
];


/* ───────────────────────────────────────
   Work data (enriched from attestations)
   ─────────────────────────────────────── */

const workTimeline = [
  {
    id: "apple-aiml",
    role: "Annotation Analyst – Apple AIML",
    org: "Apple Distribution International (Cork, Ireland)",
    dates: "2023–2024",
    tags: ["data-analytics", "ai-ml"],
    bullets: [
      "Quality assurance and analysis of Norwegian Bokmål language data for Apple's AI/ML division.",
      "Worked systematically with data structure, consistency, and language patterns in large datasets.",
      "Full-time role (39 hrs/week) at Horgans Quay, Cork."
    ]
  },
  {
    id: "precision-sport-tech",
    role: "Data Analytics & Visualisation Intern",
    org: "Precision Sports Technology / KinetikIQ (Galway, Ireland)",
    dates: "Summer 2023",
    tags: ["data-analytics", "ai-ml", "system-dev"],
    bullets: [
      "Core member of a startup team developing the first algorithms and visualisation processes for KinetikIQ.",
      "Processed raw LiDAR data using Azure Databricks and Python.",
      "Built dashboards and visualisations in Power BI for sports performance decision support.",
      "Identified patterns in training data using Python and R."
    ]
  },
  {
    id: "skatteetaten",
    role: "Interaction Designer & Team Leader",
    org: "Skatteetaten – Norwegian Tax Administration (Oslo)",
    dates: "Summer 2022",
    tags: ["interaction-design", "ai-ml", "system-dev"],
    bullets: [
      "Led a team of 6 on an AI-based customer service solution (AI-assisted tax returns & digital assistants).",
      "Planned and conducted user interviews, needs analysis, and usability testing.",
      "Created lo-fi and hi-fi prototypes in Figma; managed tasks in Jira (Kanban).",
      "Coordinated cross-functional collaboration across the 36-person summer project.",
      "Tech stack included Python, JavaScript, TypeScript, PostgreSQL, REST API, Azure ML."
    ]
  },
  {
    id: "ehealth-agder",
    role: "Web Developer – Bachelor Thesis Project",
    org: "RKG eHelse Agder (Kristiansand)",
    dates: "Spring 2022",
    tags: ["system-dev", "interaction-design"],
    bullets: [
      "Designed and developed the website for the Regional eHealth Coordination Group in Agder from scratch.",
      "Conducted stakeholder interviews and needs analysis with health leaders and project managers.",
      "Performed user testing and iterative design; presented work to steering groups.",
      "Installed and configured the web solution on FTP hosting; full visual redesign."
    ]
  },
  {
    id: "sporveien",
    role: "IT Consultant – Service Desk",
    org: "Sporveien AS (Oslo)",
    dates: "Summer 2020",
    tags: ["system-dev"],
    bullets: [
      "Troubleshooting PCs, mobile devices, and enterprise applications at Norway's largest public transit provider.",
      "Case management using ITIL framework and Service Management tools.",
      "Initiated and contributed to continuous improvement — e.g. digitised a previously manual equipment purchase form.",
      "PC imaging, meeting room support, and internal procurement advisory."
    ]
  },
  {
    id: "compass-group",
    role: "Barista / Service Staff",
    org: "Compass Group – Eurest AS (Fornebu, Bærum)",
    dates: "2018–2019",
    tags: [],
    bullets: [
      "Worked across roles including barista, cashier, server, and canteen staff.",
      "Took initiative with process improvements and maintained high standards of service."
    ]
  }
];


/* ───────────────────────────────────────
   Filter state
   ─────────────────────────────────────── */

let activeFilter = null;  // null = show all

function setFilter(categoryId) {
  // Toggle: clicking the same filter again clears it
  if (activeFilter === categoryId) {
    activeFilter = null;
  } else {
    activeFilter = categoryId;
  }
  applyFilter();
  updateFilterButtons();
}

function applyFilter() {
  document.querySelectorAll(".timeline-item[data-tags]").forEach(item => {
    const tags = item.dataset.tags.split(",");
    if (!activeFilter || tags.includes(activeFilter)) {
      item.classList.remove("faded");
    } else {
      item.classList.add("faded");
    }
  });

  // Also fade course chips if a filter is active
  document.querySelectorAll(".course[data-tag]").forEach(chip => {
    const tag = chip.dataset.tag;
    if (!activeFilter || tag === activeFilter) {
      chip.classList.remove("faded");
    } else {
      chip.classList.add("faded");
    }
  });
}

function updateFilterButtons() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.dataset.category === activeFilter) {
      btn.classList.add("filter-active");
    } else {
      btn.classList.remove("filter-active");
    }
  });
}


/* ───────────────────────────────────────
   Render: category filter bar
   ─────────────────────────────────────── */

function renderFilterBar(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = `
    <div class="filter-bar" role="group" aria-label="Filter by category">
      ${categories.map(c => `
        <button class="filter-btn" type="button" data-category="${c.id}">
          ${c.label}
        </button>
      `).join("")}
    </div>
  `;

  mount.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setFilter(btn.dataset.category);
    });
  });
}


/* ───────────────────────────────────────
   Render: studies timeline
   ─────────────────────────────────────── */

function renderStudiesTimeline(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = items.map((item, idx) => {
    const bodyId = `${item.id}-body`;
    const tagsAttr = (item.tags || []).join(",");

    const coursesHtml = (item.courses && item.courses.length)
      ? `
        <ul class="course-list" aria-label="Courses">
          ${item.courses.map(c => `
            <li class="course" data-tag="${c.tag || ""}">
              <span>${c.name}</span>
              ${c.tag ? `<span class="badge">${categories.find(cat => cat.id === c.tag)?.label || c.tag}</span>` : ""}
            </li>
          `).join("")}
        </ul>
      `
      : `<p class="muted" style="margin:0.75rem 0 0;">Courses: to be added.</p>`;

    return `
      <div class="timeline-item" data-tags="${tagsAttr}">
        <div class="timeline-dot" aria-hidden="true"></div>

        <div class="timeline-card">
          <button class="timeline-header"
                  type="button"
                  aria-expanded="${idx === 0 ? "true" : "false"}"
                  aria-controls="${bodyId}"
                  data-toggle="${bodyId}">
            <div>
              <p class="timeline-title">${item.title}</p>
              <p class="timeline-meta">${item.org}</p>
            </div>
            <div class="timeline-dates">${item.dates}</div>
          </button>

          <div class="timeline-body" id="${bodyId}" ${idx === 0 ? "" : "hidden"}>
            <ul>
              ${(item.bullets || []).map(b => `<li>${b}</li>`).join("")}
            </ul>
            ${coursesHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");

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


/* ───────────────────────────────────────
   Render: work timeline
   ─────────────────────────────────────── */

function renderWorkTimeline(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = items.map((item, idx) => {
    const bodyId = `${item.id}-body`;
    const tagsAttr = (item.tags || []).join(",");

    return `
      <div class="timeline-item" data-tags="${tagsAttr}">
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


/* ───────────────────────────────────────
   Initialise everything on load
   ─────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderFilterBar("filter-bar");
  renderStudiesTimeline("studies-timeline", studiesTimeline);
  renderWorkTimeline("work-timeline", workTimeline);
});
