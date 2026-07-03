const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-22% 0px -62% 0px", threshold: [0.1, 0.3, 0.6] }
);

sections.forEach((section) => observer.observe(section));

const advisorData = {
  public: {
    early: ["用地红线、控规条件、任务书初稿", "使用人群与功能面积需求", "审批节点、投资估算与工期边界"],
    design: ["现状测绘资料与地勘资料", "专业条件表与机电接口", "消防、无障碍、节能等专项要求"],
    site: ["施工图审查意见", "材料样板与变更台账", "现场问题清单与会议纪要"],
  },
  office: {
    early: ["品牌定位、办公人数与商业业态", "交通组织、停车和后勤需求", "立面形象与展示面控制"],
    design: ["平面效率指标、竖向交通条件", "幕墙、机电、消防专业接口", "租售或运营单位反馈清单"],
    site: ["样板段确认记录", "机电综合与装饰收口问题", "竣工资料与交付标准"],
  },
  residential: {
    early: ["社区配套清单与户型/服务半径要求", "既有建筑安全与管线资料", "居民使用痛点与更新目标"],
    design: ["日照、消防、无障碍和景观接口", "立面改造材料策略", "分期施工与居民沟通计划"],
    site: ["现场变更签证资料", "质量缺陷与整改闭环", "交付后运维建议"],
  },
  smart: {
    early: ["弱电系统现状与业主使用目标", "安防、网络、机房和运维权限需求", "预算边界与分期建设计划"],
    design: ["点位表、系统图和设备清单", "与建筑、装饰、机电专业的综合接口", "数据安全与账号权限要求"],
    site: ["设备调试记录", "系统验收测试报告", "运维培训与资料移交清单"],
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
    <strong>建议准备</strong>
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
  const existing = JSON.parse(localStorage.getItem("jiuyuan_inquiries") || "[]");
  existing.push(record);
  localStorage.setItem("jiuyuan_inquiries", JSON.stringify(existing));
  contactForm.reset();
  if (formStatus) {
    formStatus.textContent = "留言已记录。项目团队将根据联系方式跟进需求。";
  }
});
