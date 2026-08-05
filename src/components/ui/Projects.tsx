import { CardAuroraCustome, Divider, Sections } from "@components/atom";
import { Beam } from "@components/beam";
import { Terminal } from "@components/includes/terminal";
import React from "react";
import { Link } from "react-router";
import { useResponsive } from "@responsive/useResponsive";
const Projects: React.FC = () => {
  const { config } = useResponsive();
  const projectMaps = [
    {
      title: "WDMS — Web Data Management System",
      desc: "Real-time fingerprint data collection from multiple branches into a centralized server, integrated with HRIS. Role-based access, automated reporting.",
      tags: ["Python Flask", "Tailwind CSS", "Real-time", "HRIS Integration"],
      num: "Production · 2022–2025",
      type: "prod",
    },
    {
      title: "HRIS — HR Information System",
      desc: "Full HR automation: payroll processing, attendance tracking, employee data management. Reduced HR team workload by 30%.",
      tags: ["CodeIgniter", "Bootstrap", "MySQL"],
      num: "Production · 2022",
      type: "prod",
    },
    {
      title: "POS System — Isoide & Nahm Restaurant",
      desc: "Point-of-sale system for two Japanese restaurants. PHP frontend with Python Flask backend, handling orders, payments, and reporting.",
      tags: ["Python Flask", "PHP", "MySQL"],
      num: "Production · 2022",
      type: "prod",
    },
  ];
  return (
    <Sections id='projects' className={config.section.skill}>
      <div className={`eyebrow ${config.standard.eyebrow}`}>Work</div>
      <h2 className={config.standard.header}>Featured Projects</h2>
      <p className={config.standard.desc}>
        Systems built for real production environments — not demos.
      </p>
      <Divider />
      <div className={`card project-feature ${config.project.pFeature}`}>
        <div className={`card project-feature-card featured rust-project ${config.project.pFeatureCard}`}>
          <div>
            <div className={`card-num project-num ${config.project.num}`}>
              <span className={`num-dot project-num-dot personal ${config.project.numDot}`}></span>
              Personal Project · 2024
            </div>
            <div className={config.standard.header}>
              REST API Backend — Rust & Axum
            </div>
            <div className={config.standard.desc}>
              A performant, type-safe REST API backend built with Rust and the
              Axum framework. Features JWT authentication, PostgreSQL
              integration, and Docker containerization for consistent
              dev-to-prod environments. Built as a deep-dive into systems-level
              backend engineering.
            </div>
            <div className={`card-stack ${config.standard.stack}`}>
              {["Rust", "Axum", "PostgreSQL", "JWT", "Docker"].map((tag) => (
                <span
                  key={tag}
                  className={`tag ${tag === "Rust" || tag === "Axum" ? "rust" : ""}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Terminal>
            <div>
              <span className='t-comment'>// main.rs — Axum router setup</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className='t-key'>async fn</span>{" "}
              <span className='text-[#2DD4BF]'>main</span>() {"{"}
            </div>
            <div>
              &nbsp; <span className='t-key'>let</span> app = Router::new()
            </div>
            <div>
              &nbsp;&nbsp;&nbsp; .route(
              <span className='t-string'>"/api/auth/login"</span>, post(login))
            </div>
            <div>
              &nbsp;&nbsp;&nbsp; .route(
              <span className='t-string'>"/api/users"</span>, get(get_users))
            </div>
            <div>&nbsp;&nbsp;&nbsp; .layer(JwtAuthLayer::new());</div>
            <div>&nbsp;</div>
            <div>&nbsp; axum::serve(listener, app)</div>
            <div>&nbsp;&nbsp;&nbsp; .await.unwrap();</div>
            <div>{"}"}</div>
          </Terminal>
        </div>
        {/* Other Projects */}
        {projectMaps.map((project, index) => (
          <CardAuroraCustome
            className='beam rounded-8 pt-px p-px pb-1! beam-teal project'
            key={index}
            card='rounded-8!'
          >
            <div className={`card-corner project-corner ${config.project.corner}`}>↗</div>
            <div className={`card-num project-num ${config.project.num}`}>
              <span
                className={`num-dot project-num-dot ${project.type} ${config.project.numDot}`}
              ></span>
              {project.num}
            </div>
            <div className={`${config.standard.header}`}>{project.title}</div>
            <div className={`${config.standard.desc}`}>{project.desc}</div>
            <div className={`card-stack ${config.standard.stack}`}>
              {project.tags.map((tag) => (
                <span key={tag} className='tag'>
                  {tag}
                </span>
              ))}
            </div>
          </CardAuroraCustome>
        ))}
        <CardAuroraCustome
          className='h-full'
          card='rounded-8! h-full'
        >
          <div className='read-more '>
            <Beam variant='teal' radius={8}>
              <Link
                to='/project-list'
                className='btn-glow glow-rust py-[0.85rem]! btn-hover'
              >
                Other Projects →
              </Link>
            </Beam>
          </div>
        </CardAuroraCustome>
      </div>
    </Sections>
  );
};

export default Projects;
