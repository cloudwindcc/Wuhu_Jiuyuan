const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sectionLinks = navLinks.filter((link) => link.getAttribute("href")?.startsWith("#"));
const sections = [...document.querySelectorAll("main section[id]")];

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    if (link.getAttribute("href")?.startsWith("#")) {
      sectionLinks.forEach((sectionLink) => {
        sectionLink.classList.toggle("active", sectionLink === link);
      });
    }
  });
});

function setActiveSection(sectionId) {
  sectionLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
}

let ticking = false;

function updateActiveSection() {
  const marker = window.innerHeight * 0.3;
  const current = sections.reduce((active, section) => {
    return section.getBoundingClientRect().top <= marker ? section.id : active;
  }, "");
  setActiveSection(current);
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActiveSection);
  },
  { passive: true }
);

updateActiveSection();

const advisorData = {
  public: {
    early: ["Site boundary and planning conditions", "User groups and functional area requirements", "Approval milestones, cost estimate and schedule boundaries"],
    design: ["Measured survey and geotechnical information", "Discipline condition sheets and MEP interfaces", "Fire protection, accessibility and energy-saving requirements"],
    site: ["Construction drawing review comments", "Material samples and change ledger", "Site issue list and meeting minutes"],
  },
  office: {
    early: ["Brand positioning, staff count and commercial program", "Traffic organization, parking and back-of-house needs", "Facade identity and key display elevations"],
    design: ["Plan efficiency targets and vertical circulation conditions", "Curtain wall, MEP and fire protection interfaces", "Feedback checklist from sales, leasing or operations teams"],
    site: ["Mock-up area confirmation records", "MEP coordination and interior closing details", "Completion documents and handover standards"],
  },
  residential: {
    early: ["Community amenity list and service radius requirements", "Existing building safety and utility information", "Resident pain points and renewal objectives"],
    design: ["Sunlight, fire protection, accessibility and landscape interfaces", "Facade renewal material strategy", "Phased construction and resident communication plan"],
    site: ["Site change and confirmation records", "Quality defect close-out list", "Post-handover operation and maintenance advice"],
  },
  smart: {
    early: ["Existing low-voltage system conditions and owner goals", "Security, network, equipment room and operations permission needs", "Budget boundary and phased implementation plan"],
    design: ["Point schedule, system diagrams and equipment list", "Integrated interfaces with architecture, interiors and MEP disciplines", "Data security and account permission requirements"],
    site: ["Equipment commissioning records", "System acceptance test report", "Operations training and document handover checklist"],
  },
};

const projectType = document.querySelector("#project-type");
const projectStage = document.querySelector("#project-stage");
const advisorButton = document.querySelector("#advisor-button");
const advisorResult = document.querySelector("#advisor-result");

function renderAdvisor() {
  if (!projectType || !projectStage || !advisorResult) return;
  const items = advisorData[projectType.value][projectStage.value];
  advisorResult.innerHTML = `
    <strong>Suggested Preparation</strong>
    <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

advisorButton?.addEventListener("click", renderAdvisor);
projectType?.addEventListener("change", renderAdvisor);
projectStage?.addEventListener("change", renderAdvisor);

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const record = {
    name: data.get("name"),
    phone: data.get("phone"),
    company: data.get("company"),
    message: data.get("message"),
    createdAt: new Date().toISOString(),
  };
  const existing = JSON.parse(localStorage.getItem("jiuyuan_inquiries_en") || "[]");
  existing.push(record);
  localStorage.setItem("jiuyuan_inquiries_en", JSON.stringify(existing));
  contactForm.reset();
  if (formStatus) {
    formStatus.textContent = "Your inquiry has been recorded. The project team will follow up using the contact information provided.";
  }
});
