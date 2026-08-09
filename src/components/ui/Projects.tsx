import { CardGlass, Divider, Sections } from "@components/atom";
import { Terminal } from "@components/includes/terminal";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";
const Projects: React.FC = () => {
  const { config } = useResponsive();
  const projectMaps = [
    {
      title: "WDMS — Web Data Management System",
      desc: "Real-time fingerprint data collection from multiple branches into a centralized server, integrated with HRIS. Role-based access, automated reporting.",
      tags: ["Python Flask", "Tailwind CSS", "Real-time", "HRIS Integration"],
      num: "2022–2025",
      type: "Production",
    },
    {
      title: "HRIS — HR Information System",
      desc: "Full HR automation: payroll processing, attendance tracking, employee data management. Reduced HR team workload by 30%.",
      tags: ["CodeIgniter", "Bootstrap", "MySQL"],
      num: "2022",
      type: "Production",
    },
    {
      title: "POS System — Isoide & Nahm Restaurant",
      desc: "Point-of-sale system for two Japanese restaurants. PHP frontend with Python Flask backend, handling orders, payments, and reporting.",
      tags: ["Python Flask", "PHP", "MySQL"],
      num: "2022",
      type: "Production",
    },
  ];
  return (
    <Sections
      id='projects'
      className={`default-section ${config.section.default}`}
    >
      <div className='section-tag'>
        <span className='section-tag-icon'>💻</span>
        <span className={`section-tag-text`}>Work</span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={config.standard.header}>Featured Work</h2>
      <p className={config.standard.desc}>
        Systems built for real production environments — not demos.
      </p>
      <Divider />
      <div className='projects-grid'>
        <div className={`project-card ${config.project.pFeature}`}>
          <div
            className={`project-card featured rust-project ${config.project.pFeatureCard}`}
          >
            <div>
              <div className={`project-num ${config.project.num}`}>
                <span
                  className={`project-num-dot personal ${config.project.numDot}`}
                ></span>
                Personal Project · 2024
              </div>
              <div className={`project-name`}>
                REST API Backend — Rust & Axum
              </div>
              <div className={`project-desc`}>
                A performant, type-safe REST API backend built with Rust and the
                Axum framework. Features JWT authentication, PostgreSQL
                integration, and Docker containerization for consistent
                dev-to-prod environments. Built as a deep-dive into
                systems-level backend engineering.
              </div>
              <div className={`card-stack`}>
                {["Rust", "Axum", "PostgreSQL", "JWT", "Docker"].map((tag) => (
                  <span
                    key={tag}
                    className={`card-tag ${tag === "Rust" || tag === "Axum" ? "rust" : ""}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Terminal>
              <div>
                <span className='t-comment'>
                  // main.rs — Axum router setup
                </span>
              </div>
              <div>&nbsp;</div>
              <div>
                <span className='t-key'>async fn</span>{" "}
                <span className='text-green'>main</span>() {"{"}
              </div>
              <div>
                &nbsp; <span className='t-key'>let</span> app = Router::new()
              </div>
              <div>
                &nbsp;&nbsp;&nbsp; .route(
                <span className='t-string'>"/api/auth/login"</span>,
                post(login))
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
        </div>
      </div>
      <div className='project-box'>
        {projectMaps.map((project, index) => (
          <CardGlass tag={project.tags} desc={project.desc} title={project.title} corner={project.type} period={project.num} key={index}>
          </CardGlass>
        ))}
      </div>
      <div className='inline-flex items-end justify-end w-full mt-2'>
        <a
          href='projects.html'
          className='font-mono text-sm text-accent-cyan hover:text-accent-orange transition-colors reveal reveal-delay-2'
        >
          View All Projects &rarr;
        </a>
      </div>
    </Sections>
  );
};

export default Projects;
