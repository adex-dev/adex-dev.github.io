import React from "react";
import { Terminal } from "@components/includes/terminal";
import { useNavigate } from "react-router";
import { CardAuroraCustome, Sections } from "@components/atom";
const Projects2: React.FC = () => {
  const navigate = useNavigate();
  const projectMaps = [
    {
      id: "wdms",
      title: "WDMS — Web Data Management System",
      desc: "Real-time fingerprint data collection from multiple branches into a centralized server, integrated with HRIS. Role-based access, automated reporting.",
      tags: ["Python Flask", "Tailwind CSS", "Real-time", "HRIS Integration"],
      num: "Production · 2022–2025",
      year: "2022-2025",
      type: "prod",
      impact: "Full Stack · Integration",
    },
    {
      id: "hris",
      title: "HRIS — HR Information System",
      desc: "Full HR automation: payroll processing, attendance tracking, employee data management. Reduced HR team workload by 30%.",
      tags: ["CodeIgniter", "Bootstrap", "MySQL", "Bootstrap"],
      num: "Production · 2022",
      year: "2022",
      type: "prod",
      impact: "↓ 30% HR Workload",
    },
    {
      id: "posisoide",
      title: "POS System — Isoide & Nahm Restaurant",
      desc: "Point-of-sale system for two Japanese restaurants. PHP frontend with Python Flask backend, handling orders, payments, and reporting.",
      tags: ["Python Flask", "PHP", "MySQL", "Tailwind CSS"],
      num: "Production · 2022",
      year: "2022",
      type: "prod",
      impact: "Full Stack · POS",
    },
    {
      id: "archive",
      title: "Archive — Bookkeeping & Inventory System",
      desc: `Automated bookkeeping and inventory tracking application to reduce
            manual data entry errors. Replaced a manual spreadsheet-based
            workflow.`,
      tags: ["Python Flask", "Docker", "MySQL", "Bootstrap"],
      num: "Production · 2021",
      year: "2021",
      type: "prod",
      impact: "Full Stack · Finance",
    },
    {
      id: "attendance",
      title: "Attendance Realization System",
      desc: `Company-wide attendance tracking and realization system built for
            PT. Jaygee Group. Handles daily attendance data, monthly
            realization, and branch-level reporting.`,
      tags: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
      num: "Production · 2019–2022",
      year: "2019–2022",
      type: "prod",
      impact: "Full Stack · HR",
    },
  ];
  const handlerclick = (link: string) => {
    navigate(`/project-detail?id${link}`);
  };
  return (
    <Sections id="projects">
      <div className="card-eyebrow">Work</div>

      <h2 className="card-title">Featured Projects</h2>

      <p className="card-sub">
        Systems built for real production environments — not demos.
      </p>

      <div className="card grid-cols-2 mb-0 gap-1">
        <div
          className="card grid-cols-2 gap-12 col-span-2 featured rust-project mb-3"
          onClick={() => handlerclick("rust-axum")}>
          <div className='h-full relative'>
            <div className="card-num project-num">
              <span className="num-dot project-num-dot personal"></span>
              Personal Project · 2024
            </div>
            <div className="card-name project-name">REST API Backend — Rust & Axum</div>
            <div className="card-desc project-desc">
              A performant, type-safe REST API backend built with Rust and the
              Axum framework. Features JWT authentication, PostgreSQL
              integration, and Docker containerization for consistent
              dev-to-prod environments. Built as a deep-dive into systems-level
              backend engineering.
            </div>
            <div className="card-stack project-stack">
              {["Rust", "Axum", "PostgreSQL", "JWT", "Docker"].map((tag) => (
                <span
                  key={tag}
                  className={`tag ${tag === "Rust" || tag === "Axum" ? "rust" : ""}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-meta absolute bottom-0 w-full">
              <span className="project-year">2024 — Ongoing</span>
              <span className="project-impact">Personal · Backend</span>
            </div>
          </div>
          <Terminal>
            <div>
              <span className="t-comment">// main.rs — Axum router setup</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="t-key">async fn</span>{" "}
              <span className="text-[#2DD4BF]">main</span>() {"{"}
            </div>
            <div>
              &nbsp; <span className="t-key">let</span> app = Router::new()
            </div>
            <div>
              &nbsp;&nbsp;&nbsp; .route(
              <span className="t-string">"/api/auth/login"</span>, post(login))
            </div>
            <div>
              &nbsp;&nbsp;&nbsp; .route(
              <span className="t-string">"/api/users"</span>, get(get_users))
            </div>
            <div>&nbsp;&nbsp;&nbsp; .layer(JwtAuthLayer::new());</div>
            <div>&nbsp;</div>
            <div>&nbsp; axum::serve(listener, app)</div>
            <div>&nbsp;&nbsp;&nbsp; .await.unwrap();</div>
            <div>{"}"}</div>
          </Terminal>
        </div>

        {/* Other Projects */}
        {[...projectMaps].reverse().map((project, index) => (
          <CardAuroraCustome
            onClick={() => handlerclick(project.id)}
            key={index}
            className="beam rounded-8 pt-px p-px pb-1! beam-teal" card='rounded-8'>
            <div className="card-corner project-corner">↗</div>
            <div className="card-num project-num">
              <span className={`num-dot project-num-dot ${project.type}`}></span>
              {project.num}
            </div>
            <div className="project-name">{project.title}</div>
            <div className="project-desc">{project.desc}</div>
            <div className="project-stack">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-meta">
              <span className="project-year">{project.year}</span>
              <span className="project-impact">{project.impact}</span>
            </div>
          </CardAuroraCustome>
        ))}
      </div>
    </Sections>
  );
};

export default Projects2;
