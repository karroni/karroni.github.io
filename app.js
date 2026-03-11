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

  applyFilter();
  triggerStaggeredEntrance(id);
}

function currentFromHash() {
  const hash = window.location.hash.replace("#", "");
  return hash || "studies";
}

window.addEventListener("hashchange", () => {
  showPanel(currentFromHash());
});


/* ───────────────────────────────────────
   Category definitions with colours
   ─────────────────────────────────────── */

const categories = [
  { id: "data-analytics",     label: "Data Analytics",        color: "#3d8b9e", bg: "rgba(61,139,158,0.12)" },
  { id: "ai-ml",              label: "AI & Machine Learning", color: "#7c5ea3", bg: "rgba(124,94,163,0.12)" },
  { id: "system-dev",         label: "System Development",    color: "#c47f35", bg: "rgba(196,127,53,0.12)" },
  { id: "interaction-design", label: "Interaction Design",    color: "#5a8a58", bg: "rgba(90,138,88,0.12)" },
  { id: "research-society",   label: "Research & Society",    color: "#b06078", bg: "rgba(176,96,120,0.12)" }
];

function getCategoryStyle(tagId) {
  const cat = categories.find(c => c.id === tagId);
  return cat
    ? `background:${cat.bg};color:${cat.color};border-color:${cat.color}`
    : "";
}

function getCategoryLabel(tagId) {
  return categories.find(c => c.id === tagId)?.label || tagId;
}


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
    summary: "Deepening expertise in applied AI — from neural networks and evolutionary computation to the societal and ethical dimensions of intelligent systems.",
    skills: [
      { name: "Deep Learning",           tag: "ai-ml" },
      { name: "Evolutionary Algorithms", tag: "ai-ml" },
      { name: "Computational Intelligence", tag: "ai-ml" },
      { name: "Reinforcement Learning",  tag: "ai-ml" },
      { name: "Swarm Robotics",          tag: "ai-ml" },
      { name: "Complex Systems",         tag: "ai-ml" },
      { name: "Cyber Security Policy",   tag: "research-society" },
      { name: "Research Methods",        tag: "research-society" },
      { name: "Interdisciplinary Design", tag: "interaction-design" }
    ],
    projects: [
      {
        title: "Evolutionary Robotics Lab",
        desc: "Designing and implementing swarm and evolutionary robotic systems using bio-inspired AI methods.",
        tools: ["Python", "Neuro-evolution", "Complex Systems"]
      },
      {
        title: "Interdisciplinary Innovation Challenge",
        desc: "Cross-disciplinary team tackling real-world societal challenges using participatory and universal design methods.",
        tools: ["Co-design", "Design Thinking", "UN SDGs"]
      }
    ],
    courses: [
      "Computational Intelligence: Theory & Applications",
      "Evolutionary AI and Robotics",
      "Understanding and Communicating Research",
      "Advanced Machine Learning & Deep Learning",
      "Interdisciplinary Innovation & Complex Problems",
      "Security Politics, Cyberwar & Ethics",
      "Technology and Society: Critical Perspectives"
    ]
  },
  {
    id: "hdip-galway",
    title: "Higher Diploma in Data Analytics",
    org: "University of Galway",
    dates: "2022–2023",
    tags: ["data-analytics", "system-dev", "interaction-design"],
    summary: "Intensive conversion programme building practical data analytics skills — from raw data pipelines to interactive dashboards.",
    skills: [
      { name: "Python",     tag: "data-analytics" },
      { name: "R",           tag: "data-analytics" },
      { name: "SQL",         tag: "system-dev" },
      { name: "Power BI",   tag: "data-analytics" },
      { name: "Azure",       tag: "system-dev" },
      { name: "Databricks", tag: "data-analytics" },
      { name: "Statistics",  tag: "data-analytics" },
      { name: "HTML / CSS / JS", tag: "system-dev" },
      { name: "HCI & UX",   tag: "interaction-design" }
    ],
    projects: [
      {
        title: "KinetikIQ – Sports Analytics Pipeline",
        desc: "Built an end-to-end pipeline to process raw LiDAR data for athletic performance analysis at a sports-tech startup.",
        tools: ["Azure", "Databricks", "Python", "Power BI"]
      }
    ],
    courses: [
      "Data Visualisation (R & Python)",
      "Databases (SQL)",
      "Industrial Data Analytics Project",
      "Business Intelligence (Power BI)",
      "Applied Data Science with R",
      "Human-Computer Interaction",
      "Internet Programming (HTML/CSS/JS)",
      "Statistics for Data Science 1 & 2"
    ]
  },
  {
    id: "bsc-uia",
    title: "BSc IT and Information Systems",
    org: "University of Agder (UiA), Kristiansand",
    dates: "2019–2022",
    tags: ["system-dev", "interaction-design", "data-analytics", "research-society"],
    summary: "Broad foundation in systems development, interaction design, and digital transformation — with hands-on project work for real organisations.",
    skills: [
      { name: "Java / OOP",           tag: "system-dev" },
      { name: "Systems Analysis",     tag: "system-dev" },
      { name: "Database Design",      tag: "system-dev" },
      { name: "Service Design",       tag: "interaction-design" },
      { name: "Universal Design",     tag: "interaction-design" },
      { name: "Data Science",         tag: "data-analytics" },
      { name: "IoT",                  tag: "system-dev" },
      { name: "Project Management",   tag: "research-society" },
      { name: "Research Methods",     tag: "research-society" }
    ],
    projects: [
      {
        title: "eHelse Agder – Regional Health Website",
        desc: "Designed and developed a complete website for the Regional eHealth Coordination Group, including stakeholder interviews, user testing, and FTP deployment. Graded A.",
        tools: ["Web Development", "UX Research", "User Testing"]
      },
      {
        title: "Programming Project",
        desc: "Full-stack development project applying systems analysis, object-oriented design, and database modelling.",
        tools: ["Java", "SQL", "Systems Design"]
      }
    ],
    courses: [
      "Digital Interaction Design",
      "Co-creation – Communication & Project Work",
      "The Role of Digitalisation in Future Societies",
      "Object-Oriented Programming",
      "Data Communications and Operating Systems",
      "Business Administration for IT Students",
      "Organisational Theory for IT Students",
      "Systems Analysis and Design",
      "Data Modelling and Database Systems",
      "Programming Project",
      "Service Design and Business Development",
      "Data Science Applications",
      "Universal Design of Information Systems",
      "IT and Changes in Society",
      "Internet of Things",
      "Research Methods in Social Science",
      "Project Management in Practice",
      "Internship",
      "Bachelor Thesis – eHelse Agder Website",
      "Current IT-related Topics, Sustainability & Digitalisation"
    ]
  }
];


/* ───────────────────────────────────────
   Work data
   ─────────────────────────────────────── */

const workTimeline = [
  {
    id: "apple-aiml",
    role: "Annotation Analyst – Apple AIML",
    org: "Apple Distribution International (Cork, Ireland)",
    dates: "2023–2024",
    tags: ["data-analytics", "ai-ml"],
    summary: "Quality assurance and analysis of Norwegian Bokmål language data for Apple's AI/ML division — working systematically with data structure, consistency, and language patterns in large datasets.",
    skills: [
      { name: "Data Quality",      tag: "data-analytics" },
      { name: "Language Data",     tag: "ai-ml" },
      { name: "Pattern Analysis",  tag: "data-analytics" },
      { name: "NLP / Bokmål",     tag: "ai-ml" }
    ],
    projects: []
  },
  {
    id: "precision-sport-tech",
    role: "Data Analytics & Visualisation Intern",
    org: "Precision Sports Technology / KinetikIQ (Galway, Ireland)",
    dates: "Summer 2023",
    tags: ["data-analytics", "ai-ml", "system-dev"],
    summary: "Core member of a startup team developing the first algorithms and visualisation processes for KinetikIQ's sports analytics product.",
    skills: [
      { name: "Python",       tag: "data-analytics" },
      { name: "R",             tag: "data-analytics" },
      { name: "Power BI",     tag: "data-analytics" },
      { name: "Databricks",   tag: "data-analytics" },
      { name: "Azure",         tag: "system-dev" },
      { name: "LiDAR Data",   tag: "ai-ml" }
    ],
    projects: [
      {
        title: "KinetikIQ Analytics Pipeline",
        desc: "Built dashboards and data pipelines to process raw LiDAR sensor data for sports performance decision support.",
        tools: ["Azure", "Databricks", "Python", "Power BI"]
      }
    ]
  },
  {
    id: "skatteetaten",
    role: "Interaction Designer & Team Leader",
    org: "Skatteetaten – Norwegian Tax Administration (Oslo)",
    dates: "Summer 2022",
    tags: ["interaction-design", "ai-ml", "system-dev"],
    summary: "Led a team of 6 on an AI-based customer service solution — AI-assisted tax returns and digital assistants — within a 36-person summer project.",
    skills: [
      { name: "Figma",            tag: "interaction-design" },
      { name: "User Research",    tag: "interaction-design" },
      { name: "Prototyping",      tag: "interaction-design" },
      { name: "Team Leadership",  tag: "research-society" },
      { name: "Python",           tag: "system-dev" },
      { name: "Azure ML",         tag: "ai-ml" },
      { name: "Jira / Kanban",   tag: "system-dev" }
    ],
    projects: [
      {
        title: "AI-Assisted Tax Returns",
        desc: "Designed the interaction model for an AI-based digital assistant — from lo-fi paper sketches to hi-fi Figma prototypes, validated through user testing.",
        tools: ["Figma", "User Interviews", "Usability Testing", "Azure ML"]
      }
    ]
  },
  {
    id: "ehealth-agder",
    role: "Web Developer – Bachelor Thesis",
    org: "RKG eHelse Agder (Kristiansand)",
    dates: "Spring 2022",
    tags: ["system-dev", "interaction-design"],
    summary: "Designed and developed the complete website for the Regional eHealth Coordination Group from scratch — including stakeholder research, user testing, and deployment.",
    skills: [
      { name: "Web Development",  tag: "system-dev" },
      { name: "UX Research",      tag: "interaction-design" },
      { name: "User Testing",     tag: "interaction-design" },
      { name: "Stakeholder Mgmt", tag: "interaction-design" }
    ],
    projects: [
      {
        title: "ehelseagder.no Redesign",
        desc: "Full overhaul of a regional health coordination website — from needs analysis with health leaders to FTP deployment. Received top marks and excellent feedback.",
        tools: ["HTML/CSS", "FTP", "User Interviews", "Iterative Design"]
      }
    ]
  },
  {
    id: "sporveien",
    role: "IT Consultant – Service Desk",
    org: "Sporveien AS (Oslo)",
    dates: "Summer 2020",
    tags: ["system-dev"],
    summary: "IT support and process improvement at Norway's largest public transit operator — troubleshooting, ITIL-based case management, and digitisation of manual workflows.",
    skills: [
      { name: "ITIL",              tag: "system-dev" },
      { name: "Troubleshooting",   tag: "system-dev" },
      { name: "Process Automation", tag: "system-dev" }
    ],
    projects: [
      {
        title: "Equipment Purchase Digitisation",
        desc: "Initiated and built a digital form to replace a fully manual equipment purchase process — improving efficiency across the IT department.",
        tools: ["Process Design", "Digital Forms"]
      }
    ]
  },
  {
    id: "compass-group",
    role: "Barista / Service Staff",
    org: "Compass Group – Eurest AS (Fornebu, Bærum)",
    dates: "2018–2019",
    tags: [],
    summary: "Worked across roles — barista, cashier, server, and canteen — gaining experience in fast-paced service environments and taking initiative with improvements.",
    skills: [],
    projects: []
  }
];


/* ───────────────────────────────────────
   Filter state
   ─────────────────────────────────────── */

let activeFilter = null;

function setFilter(categoryId) {
  activeFilter = (activeFilter === categoryId) ? null : categoryId;
  applyFilter();
  updateFilterButtons();
}

function applyFilter() {
  document.querySelectorAll(".timeline-item[data-tags]").forEach(item => {
    const tags = item.dataset.tags.split(",").filter(Boolean);
    if (!activeFilter || tags.includes(activeFilter)) {
      item.classList.remove("faded");
    } else {
      item.classList.add("faded");
    }
  });

  document.querySelectorAll(".skill-chip[data-tag]").forEach(chip => {
    if (!activeFilter) {
      chip.classList.remove("skill-highlight");
      chip.classList.remove("faded");
    } else if (chip.dataset.tag === activeFilter) {
      chip.classList.add("skill-highlight");
      chip.classList.remove("faded");
    } else {
      chip.classList.remove("skill-highlight");
      chip.classList.add("faded");
    }
  });

  document.querySelectorAll(".project-card[data-tags]").forEach(card => {
    const tags = card.dataset.tags.split(",").filter(Boolean);
    if (!activeFilter || tags.includes(activeFilter)) {
      card.classList.remove("faded");
    } else {
      card.classList.add("faded");
    }
  });
}

function updateFilterButtons() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.dataset.category === activeFilter) {
      btn.classList.add("filter-active");
      const cat = categories.find(c => c.id === activeFilter);
      if (cat) {
        btn.style.background = cat.color;
        btn.style.color = "#fff";
        btn.style.borderColor = cat.color;
      }
    } else {
      btn.classList.remove("filter-active");
      btn.style.background = "";
      btn.style.color = "";
      btn.style.borderColor = "";
    }
  });
}


/* ───────────────────────────────────────
   Staggered entrance animation
   ─────────────────────────────────────── */

function triggerStaggeredEntrance(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  const items = panel.querySelectorAll(".timeline-item");
  items.forEach((item, i) => {
    item.style.animationDelay = `${i * 0.08}s`;
    item.classList.remove("enter");
    void item.offsetWidth;
    item.classList.add("enter");
  });
}


/* ───────────────────────────────────────
   Render helpers
   ─────────────────────────────────────── */

function renderFilterBar(mountId) {
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
  if (!skills || !skills.length) return "";
  return `
    <div class="skills-row">
      ${skills.map(s => `
        <span class="skill-chip" data-tag="${s.tag}" style="${getCategoryStyle(s.tag)}">
          ${s.name}
        </span>
      `).join("")}
    </div>
  `;
}

function renderProjects(projects, parentTags) {
  if (!projects || !projects.length) return "";
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
  if (!courses || !courses.length) return "";
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


/* ───────────────────────────────────────
   Render: timelines
   ─────────────────────────────────────── */

function renderStudiesTimeline(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = items.map((item, idx) => {
    const bodyId = `${item.id}-body`;
    const tagsAttr = (item.tags || []).join(",");

    return `
      <div class="timeline-item enter" data-tags="${tagsAttr}" style="animation-delay:${idx * 0.08}s">
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
            <p class="item-summary">${item.summary}</p>
            ${renderSkills(item.skills)}
            ${renderProjects(item.projects, item.tags)}
            ${renderCourses(item.courses, item.id)}
          </div>
        </div>
      </div>
    `;
  }).join("");

  bindToggles(mount);
  bindCourseToggles(mount);
}

function renderWorkTimeline(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = items.map((item, idx) => {
    const bodyId = `${item.id}-body`;
    const tagsAttr = (item.tags || []).join(",");

    return `
      <div class="timeline-item enter" data-tags="${tagsAttr}" style="animation-delay:${idx * 0.08}s">
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
            <p class="item-summary">${item.summary}</p>
            ${renderSkills(item.skills)}
            ${renderProjects(item.projects, item.tags)}
          </div>
        </div>
      </div>
    `;
  }).join("");

  bindToggles(mount);
}


/* ───────────────────────────────────────
   Shared toggle binding
   ─────────────────────────────────────── */

function bindToggles(container) {
  container.querySelectorAll("button[data-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const bodyId = btn.getAttribute("data-toggle");
      const body = document.getElementById(bodyId);
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      if (body) body.hidden = isOpen;
    });
  });
}

function bindCourseToggles(container) {
  container.querySelectorAll("button[data-courses-toggle]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const listId = btn.getAttribute("data-courses-toggle");
      const list = document.getElementById(listId);
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      btn.querySelector(".courses-toggle-icon").textContent = isOpen ? "+" : "−";
      if (list) list.hidden = isOpen;
    });
  });
}


/* ───────────────────────────────────────
   Initialise
   ─────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderFilterBar("filter-bar");
  renderStudiesTimeline("studies-timeline", studiesTimeline);
  renderWorkTimeline("work-timeline", workTimeline);
  showPanel(currentFromHash());
});
