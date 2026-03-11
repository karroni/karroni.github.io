/* ───────────────────────────────────────
   Navigation
   ─────────────────────────────────────── */

function showPanel(id) {
  document.querySelectorAll("[data-panel]").forEach(p => p.hidden = p.id !== id);
  document.querySelectorAll(".tab").forEach(t => {
    t.dataset.section === id
      ? t.setAttribute("aria-current", "page")
      : t.removeAttribute("aria-current");
  });
  if (id === "experience") applyFilter();
}

function currentFromHash() {
  return window.location.hash.replace("#", "") || "experience";
}

window.addEventListener("hashchange", () => showPanel(currentFromHash()));

/* ───────────────────────────────────────
   Domain definitions
   ─────────────────────────────────────── */

const domains = [
  { id: "data-analytics",     label: "Data Analytics",        icon: "\u{1F4CA}", color: "#3d8b9e", bg: "rgba(61,139,158,0.12)" },
  { id: "ai-ml",              label: "AI & Machine Learning", icon: "\u{1F9E0}", color: "#7c5ea3", bg: "rgba(124,94,163,0.12)" },
  { id: "system-dev",         label: "System Development",    icon: "\u2699\uFE0F", color: "#c47f35", bg: "rgba(196,127,53,0.12)" },
  { id: "interaction-design", label: "Interaction Design",    icon: "\u{1F3A8}", color: "#5a8a58", bg: "rgba(90,138,88,0.12)" },
  { id: "research-society",   label: "Research & Society",    icon: "\u{1F30D}", color: "#b06078", bg: "rgba(176,96,120,0.12)" }
];

function getDomain(id) { return domains.find(d => d.id === id); }

function chipStyle(tagId) {
  const d = getDomain(tagId);
  return d ? "background:"+d.bg+";color:"+d.color+";border-color:"+d.color : "";
}

/* ───────────────────────────────────────
   Journey data
   ─────────────────────────────────────── */

const journey = [
  {
    id: "high-school",
    type: "milestone",
    title: "High School",
    org: "",
    dates: "2014\u20132017",
    tags: [],
    image: null,
    imageCaption: "",
    narrative: "This is where it all started.",
    summary: "Details coming soon \u2014 check back later!",
    skills: [],
    projects: [],
    courses: []
  },
  {
    id: "compass-group",
    type: "work",
    title: "Barista / Service Staff",
    org: "Compass Group \u2013 Eurest AS (Fornebu)",
    dates: "2018\u20132019",
    tags: [],
    image: null,
    imageCaption: "Fornebu, B\u00e6rum",
    narrative: "Before diving into tech, I learned the value of teamwork, initiative, and keeping things running smoothly in a fast-paced environment.",
    summary: "Worked across roles \u2014 barista, cashier, server, and canteen \u2014 gaining experience in service environments and taking initiative with improvements.",
    skills: [],
    projects: [],
    courses: []
  },
  {
    id: "bsc-uia",
    type: "study",
    title: "BSc IT and Information Systems",
    org: "University of Agder (UiA), Kristiansand",
    dates: "2019\u20132022",
    tags: ["system-dev", "interaction-design", "data-analytics", "research-society"],
    image: null,
    imageCaption: "Kristiansand, Norway",
    narrative: "Curious about how technology shapes organisations and people\u2019s lives, I began a broad IT degree covering everything from programming to interaction design.",
    summary: "Three-year programme building a foundation in systems development, digital transformation, and information systems \u2014 with hands-on project work for real organisations.",
    skills: [
      { name: "Java / OOP", tag: "system-dev" },
      { name: "Systems Analysis", tag: "system-dev" },
      { name: "Database Design", tag: "system-dev" },
      { name: "Service Design", tag: "interaction-design" },
      { name: "Universal Design", tag: "interaction-design" },
      { name: "Data Science", tag: "data-analytics" },
      { name: "IoT", tag: "system-dev" },
      { name: "Project Management", tag: "research-society" },
      { name: "Research Methods", tag: "research-society" }
    ],
    projects: [
      {
        title: "Programming Project",
        desc: "Full-stack development applying systems analysis, OOP, and database modelling.",
        tools: ["Java", "SQL", "Systems Design"]
      }
    ],
    courses: [
      "Digital Interaction Design", "Co-creation \u2013 Communication & Project Work",
      "The Role of Digitalisation in Future Societies", "Object-Oriented Programming",
      "Data Communications and Operating Systems", "Business Administration for IT Students",
      "Organisational Theory for IT Students", "Systems Analysis and Design",
      "Data Modelling and Database Systems", "Programming Project",
      "Service Design and Business Development", "Data Science Applications",
      "Universal Design of Information Systems", "IT and Changes in Society",
      "Internet of Things", "Research Methods in Social Science",
      "Project Management in Practice", "Internship",
      "Bachelor Thesis \u2013 eHelse Agder Website",
      "Current IT-related Topics, Sustainability & Digitalisation"
    ]
  },
  {
    id: "sporveien",
    type: "work",
    title: "IT Consultant \u2013 Service Desk",
    org: "Sporveien AS (Oslo)",
    dates: "Summer 2020",
    tags: ["system-dev"],
    image: null,
    imageCaption: "T\u00f8yen, Oslo",
    narrative: "My first professional IT role \u2014 I quickly realised I wasn\u2019t just solving tickets, I was spotting processes that could be improved.",
    summary: "IT support and process improvement at Norway\u2019s largest public transit operator. Troubleshooting, ITIL-based case management, and digitising manual workflows.",
    skills: [
      { name: "ITIL", tag: "system-dev" },
      { name: "Troubleshooting", tag: "system-dev" },
      { name: "Process Automation", tag: "system-dev" }
    ],
    projects: [
      {
        title: "Equipment Purchase Digitisation",
        desc: "Initiated and built a digital form to replace a fully manual equipment purchase process \u2014 improving efficiency across the IT department.",
        tools: ["Process Design", "Digital Forms"]
      }
    ],
    courses: []
  },
  {
    id: "ehealth-agder",
    type: "work",
    title: "Web Developer \u2013 Bachelor Thesis",
    org: "RKG eHelse Agder (Kristiansand)",
    dates: "Spring 2022",
    tags: ["system-dev", "interaction-design"],
    image: null,
    imageCaption: "Kristiansand, Norway",
    narrative: "For my bachelor thesis, I got to build something real \u2014 a website for health leaders in the Agder region, from first interview to final deployment.",
    summary: "Designed and developed the complete website for the Regional eHealth Coordination Group from scratch. Stakeholder research, user testing, iterative design, and FTP deployment. Graded A.",
    skills: [
      { name: "Web Development", tag: "system-dev" },
      { name: "UX Research", tag: "interaction-design" },
      { name: "User Testing", tag: "interaction-design" },
      { name: "Stakeholder Mgmt", tag: "interaction-design" }
    ],
    projects: [
      {
        title: "ehelseagder.no Redesign",
        desc: "Full overhaul of a regional health coordination website \u2014 from needs analysis with health leaders to deployment. Excellent feedback from the steering group.",
        tools: ["HTML/CSS", "FTP", "User Interviews", "Iterative Design"]
      }
    ],
    courses: []
  },
  {
    id: "skatteetaten",
    type: "work",
    title: "Interaction Designer & Team Leader",
    org: "Skatteetaten \u2013 Norwegian Tax Administration (Oslo)",
    dates: "Summer 2022",
    tags: ["interaction-design", "ai-ml", "system-dev"],
    image: null,
    imageCaption: "Helsfyr, Oslo",
    narrative: "Right after graduating, I joined a 36-person summer project exploring how AI could transform tax services. I was asked to lead a team of 6 \u2014 my first real leadership experience.",
    summary: "Led a cross-functional team on an AI-based customer service solution \u2014 AI-assisted tax returns and digital assistants. From user interviews and prototyping to presenting to stakeholders.",
    skills: [
      { name: "Figma", tag: "interaction-design" },
      { name: "User Research", tag: "interaction-design" },
      { name: "Prototyping", tag: "interaction-design" },
      { name: "Team Leadership", tag: "research-society" },
      { name: "Python", tag: "system-dev" },
      { name: "Azure ML", tag: "ai-ml" },
      { name: "Jira / Kanban", tag: "system-dev" }
    ],
    projects: [
      {
        title: "AI-Assisted Tax Returns",
        desc: "Designed the interaction model for an AI-based digital assistant \u2014 from lo-fi paper sketches to hi-fi Figma prototypes, validated through user testing.",
        tools: ["Figma", "User Interviews", "Usability Testing", "Azure ML"]
      }
    ],
    courses: []
  },
  {
    id: "hdip-galway",
    type: "study",
    title: "Higher Diploma in Data Analytics",
    org: "University of Galway",
    dates: "2022\u20132023",
    tags: ["data-analytics", "system-dev", "interaction-design"],
    image: null,
    imageCaption: "Galway, Ireland",
    narrative: "With a solid foundation in systems and design, I wanted to go deeper into data. I moved to Ireland to specialise \u2014 and ended up staying for a while.",
    summary: "Intensive conversion programme building practical data analytics skills \u2014 from raw data pipelines and statistical modelling to interactive dashboards.",
    skills: [
      { name: "Python", tag: "data-analytics" },
      { name: "R", tag: "data-analytics" },
      { name: "SQL", tag: "system-dev" },
      { name: "Power BI", tag: "data-analytics" },
      { name: "Azure", tag: "system-dev" },
      { name: "Databricks", tag: "data-analytics" },
      { name: "Statistics", tag: "data-analytics" },
      { name: "HTML / CSS / JS", tag: "system-dev" },
      { name: "HCI & UX", tag: "interaction-design" }
    ],
    projects: [],
    courses: [
      "Data Visualisation (R & Python)", "Databases (SQL)",
      "Industrial Data Analytics Project", "Business Intelligence (Power BI)",
      "Applied Data Science with R", "Human-Computer Interaction",
      "Internet Programming (HTML/CSS/JS)", "Statistics for Data Science 1 & 2"
    ]
  },
  {
    id: "precision-sport-tech",
    type: "work",
    title: "Data Analytics & Visualisation Intern",
    org: "Precision Sports Technology / KinetikIQ (Galway)",
    dates: "Summer 2023",
    tags: ["data-analytics", "ai-ml", "system-dev"],
    image: null,
    imageCaption: "Galway, Ireland",
    narrative: "During my diploma, I joined a tiny startup as one of the first team members \u2014 building the analytics engine for a sports-tech product from scratch.",
    summary: "Core member of a startup team developing the first algorithms and visualisation processes for KinetikIQ\u2019s sports analytics product.",
    skills: [
      { name: "Python", tag: "data-analytics" },
      { name: "R", tag: "data-analytics" },
      { name: "Power BI", tag: "data-analytics" },
      { name: "Databricks", tag: "data-analytics" },
      { name: "Azure", tag: "system-dev" },
      { name: "LiDAR Data", tag: "ai-ml" }
    ],
    projects: [
      {
        title: "KinetikIQ \u2013 Sports Analytics Pipeline",
        desc: "Built an end-to-end pipeline to process raw LiDAR data for athletic performance analysis \u2014 from data ingestion to interactive dashboards.",
        tools: ["Azure", "Databricks", "Python", "Power BI"]
      }
    ],
    courses: []
  },
  {
    id: "apple-aiml",
    type: "work",
    title: "Annotation Analyst \u2013 Apple AIML",
    org: "Apple Distribution International (Cork, Ireland)",
    dates: "2023\u20132024",
    tags: ["data-analytics", "ai-ml"],
    image: null,
    imageCaption: "Cork, Ireland",
    narrative: "After graduating, I stayed in Ireland and joined Apple\u2019s AI/ML team \u2014 working with language data at scale and seeing firsthand how large AI systems are built and refined.",
    summary: "Quality assurance and analysis of Norwegian Bokm\u00e5l language data for Apple\u2019s AI/ML division. Systematic work with data structure, consistency, and language patterns in large datasets.",
    skills: [
      { name: "Data Quality", tag: "data-analytics" },
      { name: "Language Data", tag: "ai-ml" },
      { name: "Pattern Analysis", tag: "data-analytics" },
      { name: "NLP / Bokm\u00e5l", tag: "ai-ml" }
    ],
    projects: [],
    courses: []
  },
  {
    id: "msc-oslomet",
    type: "study",
    title: "MSc Applied Artificial Intelligence",
    org: "OsloMet \u2013 Oslo Metropolitan University",
    dates: "2024\u20132026",
    tags: ["ai-ml", "data-analytics", "research-society", "interaction-design"],
    image: null,
    imageCaption: "Oslo, Norway",
    narrative: "Everything I\u2019ve learned \u2014 data, design, systems \u2014 is now coming together. I\u2019m deepening my understanding of AI, not just technically but critically: what it can do, what it should do, and how to build it responsibly.",
    summary: "Specialisation in applied AI methods including deep learning, evolutionary computation, computational intelligence, and the societal dimensions of intelligent systems. Currently in semester 2.",
    skills: [
      { name: "Deep Learning", tag: "ai-ml" },
      { name: "Evolutionary Algorithms", tag: "ai-ml" },
      { name: "Computational Intelligence", tag: "ai-ml" },
      { name: "Reinforcement Learning", tag: "ai-ml" },
      { name: "Swarm Robotics", tag: "ai-ml" },
      { name: "Complex Systems", tag: "ai-ml" },
      { name: "Cyber Security Policy", tag: "research-society" },
      { name: "Research Methods", tag: "research-society" },
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
  }
];

/* ───────────────────────────────────────
   Filter state
   ─────────────────────────────────────── */

let activeFilter = null;

function setFilter(domainId) {
  activeFilter = (activeFilter === domainId) ? null : domainId;
  applyFilter();
  updateLensButtons();
}

function applyFilter() {
  document.querySelectorAll(".journey-stop").forEach(stop => {
    const tags = (stop.dataset.tags || "").split(",").filter(Boolean);
    if (!activeFilter || tags.includes(activeFilter)) {
      stop.classList.remove("faded");
    } else {
      stop.classList.add("faded");
    }
    if (activeFilter && tags.length === 0) {
      stop.classList.add("faded");
    }
  });

  document.querySelectorAll(".journey-bridge").forEach(bridge => {
    const tags = (bridge.dataset.tags || "").split(",").filter(Boolean);
    if (!activeFilter || tags.includes(activeFilter)) {
      bridge.classList.remove("faded");
    } else {
      bridge.classList.add("faded");
    }
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
}

function updateLensButtons() {
  document.querySelectorAll(".lens-btn").forEach(btn => {
    const d = getDomain(btn.dataset.domain);
    if (btn.dataset.domain === activeFilter && d) {
      btn.classList.add("lens-active");
      btn.style.background = d.color;
      btn.style.color = "#fff";
      btn.style.borderColor = d.color;
    } else {
      btn.classList.remove("lens-active");
      btn.style.background = "";
      btn.style.color = "";
      btn.style.borderColor = "";
    }
  });

  const desc = document.getElementById("lens-desc");
  if (!desc) return;
  if (activeFilter) {
    const d = getDomain(activeFilter);
    desc.textContent = "Showing my " + d.label + " journey";
    desc.style.color = d.color;
  } else {
    desc.textContent = "Showing the full story";
    desc.style.color = "";
  }
}

/* ───────────────────────────────────────
   Render: lens bar
   ─────────────────────────────────────── */

function renderLensBar(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML =
    '<div class="lens-bar">' +
      '<div class="lens-bar-top">' +
        '<span class="lens-label">Pick a lens</span>' +
        '<span class="lens-desc" id="lens-desc">Showing the full story</span>' +
      '</div>' +
      '<div class="lens-buttons" role="group" aria-label="Filter by domain">' +
        domains.map(function(d) {
          return '<button class="lens-btn" type="button" data-domain="' + d.id + '"' +
            ' style="--d-color:' + d.color + ';--d-bg:' + d.bg + '">' +
            '<span class="lens-icon">' + d.icon + '</span>' +
            '<span>' + d.label + '</span>' +
          '</button>';
        }).join("") +
      '</div>' +
    '</div>';

  mount.querySelectorAll(".lens-btn").forEach(function(btn) {
    btn.addEventListener("click", function() { setFilter(btn.dataset.domain); });
  });
}

/* ───────────────────────────────────────
   Render helpers
   ─────────────────────────────────────── */

function renderSkills(skills) {
  if (!skills || !skills.length) return "";
  return '<div class="skills-row">' +
    skills.map(function(s) {
      return '<span class="skill-chip" data-tag="' + s.tag + '" style="' + chipStyle(s.tag) + '">' +
        s.name + '</span>';
    }).join("") +
  '</div>';
}

function renderProjects(projects) {
  if (!projects || !projects.length) return "";
  return '<div class="projects-section">' +
    '<p class="section-label">Projects</p>' +
    projects.map(function(p) {
      return '<div class="project-card">' +
        '<p class="project-title">' + p.title + '</p>' +
        '<p class="project-desc">' + p.desc + '</p>' +
        '<div class="project-tools">' +
          p.tools.map(function(t) { return '<span class="tool-chip">' + t + '</span>'; }).join("") +
        '</div>' +
      '</div>';
    }).join("") +
  '</div>';
}

function renderCourses(courses, itemId) {
  if (!courses || !courses.length) return "";
  var toggleId = itemId + "-courses";
  return '<div class="courses-section">' +
    '<button class="courses-toggle" type="button" aria-expanded="false" data-courses-toggle="' + toggleId + '">' +
      '<span class="courses-toggle-icon">+</span> Course list (' + courses.length + ')' +
    '</button>' +
    '<ul class="courses-list" id="' + toggleId + '" hidden>' +
      courses.map(function(c) { return '<li>' + c + '</li>'; }).join("") +
    '</ul>' +
  '</div>';
}

function renderImage(item) {
  if (item.image) {
    return '<div class="stop-image">' +
      '<img src="' + item.image + '" alt="' + (item.imageCaption || item.title) + '" loading="lazy">' +
      (item.imageCaption ? '<span class="image-caption">' + item.imageCaption + '</span>' : "") +
    '</div>';
  }
  if (item.imageCaption) {
    return '<div class="stop-image placeholder">' +
      '<div class="image-placeholder-inner">' +
        '<span class="placeholder-icon">\u{1F4F7}</span>' +
        '<span class="placeholder-text">' + item.imageCaption + '</span>' +
      '</div>' +
    '</div>';
  }
  return "";
}

/* ───────────────────────────────────────
   Render: the journey
   ─────────────────────────────────────── */

function renderJourney(mountId, items) {
  var mount = document.getElementById(mountId);
  if (!mount) return;

  var typeLabel = { study: "Study", work: "Work", milestone: "Milestone" };
  var typeEmoji = { study: "\u{1F393}", work: "\u{1F4BC}", milestone: "\u{1F4CD}" };

  mount.innerHTML = items.map(function(item, idx) {
    var tagsAttr = (item.tags || []).join(",");
    var bodyId = item.id + "-body";
    var hasDetail = (item.skills && item.skills.length) ||
                    (item.projects && item.projects.length) ||
                    (item.courses && item.courses.length) ||
                    item.summary;

    var isLast = idx === items.length - 1;

    var bridge = item.narrative ?
      '<div class="journey-bridge" data-tags="' + tagsAttr + '">' +
        '<p class="bridge-text">' + item.narrative + '</p>' +
      '</div>' : "";

    var detail = "";
    if (hasDetail) {
      detail =
        '<button class="stop-expand-btn" type="button" aria-expanded="' + (isLast ? "true" : "false") + '" data-toggle="' + bodyId + '">' +
          '<span class="expand-label">' + (isLast ? "Show less" : "Learn more") + '</span>' +
          '<span class="expand-arrow">' + (isLast ? "\u25B2" : "\u25BC") + '</span>' +
        '</button>' +
        '<div class="stop-detail" id="' + bodyId + '"' + (isLast ? '' : ' hidden') + '>' +
          (item.summary ? '<p class="stop-summary">' + item.summary + '</p>' : '') +
          renderSkills(item.skills) +
          renderProjects(item.projects) +
          renderCourses(item.courses, item.id) +
        '</div>';
    }

    return bridge +
      '<div class="journey-stop" data-tags="' + tagsAttr + '">' +
        '<div class="stop-track">' +
          '<div class="stop-dot ' + item.type + '" aria-hidden="true">' +
            '<span class="dot-emoji">' + (typeEmoji[item.type] || "\u{1F4CD}") + '</span>' +
          '</div>' +
          '<div class="stop-line" aria-hidden="true"></div>' +
        '</div>' +
        '<div class="stop-content">' +
          '<div class="stop-header">' +
            '<div class="stop-header-top">' +
              '<span class="stop-type-badge ' + item.type + '">' + (typeLabel[item.type] || '') + '</span>' +
              '<span class="stop-dates">' + item.dates + '</span>' +
            '</div>' +
            '<h2 class="stop-title">' + item.title + '</h2>' +
            (item.org ? '<p class="stop-org">' + item.org + '</p>' : '') +
          '</div>' +
          renderImage(item) +
          detail +
        '</div>' +
      '</div>';
  }).join("");

  // Bind expand toggles
  mount.querySelectorAll("button[data-toggle]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var bodyId = btn.getAttribute("data-toggle");
      var body = document.getElementById(bodyId);
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      btn.querySelector(".expand-label").textContent = isOpen ? "Learn more" : "Show less";
      btn.querySelector(".expand-arrow").textContent = isOpen ? "\u25BC" : "\u25B2";
      if (body) body.hidden = isOpen;
    });
  });

  // Bind course toggles
  mount.querySelectorAll("button[data-courses-toggle]").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      var listId = btn.getAttribute("data-courses-toggle");
      var list = document.getElementById(listId);
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      btn.querySelector(".courses-toggle-icon").textContent = isOpen ? "+" : "\u2212";
      if (list) list.hidden = isOpen;
    });
  });

  // Scroll-triggered entrance
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    mount.querySelectorAll(".journey-stop, .journey-bridge").forEach(function(el) {
      observer.observe(el);
    });
  }
}

/* ───────────────────────────────────────
   Initialise
   ─────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", function() {
  renderLensBar("lens-bar");
  renderJourney("journey-timeline", journey);
  showPanel(currentFromHash());
});
