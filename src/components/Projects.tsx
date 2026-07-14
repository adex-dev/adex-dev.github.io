import React from 'react';
import {Terminal} from './includes/terminal'

const Projects: React.FC = () => {
  const projectMaps= [
            {
              title: 'WDMS — Web Data Management System',
              desc: 'Real-time fingerprint data collection from multiple branches into a centralized server, integrated with HRIS. Role-based access, automated reporting.',
              tags: ['Python Flask', 'Tailwind CSS', 'Real-time', 'HRIS Integration'],
              num: 'Production · 2022–2025',
            },
            {
              title: 'HRIS — HR Information System',
              desc: 'Full HR automation: payroll processing, attendance tracking, employee data management. Reduced HR team workload by 30%.',
              tags: ['CodeIgniter', 'Bootstrap', 'MySQL'],
              num: 'Production · 2022',
            },
            {
              title: 'POS System — Isoide & Nahm Restaurant',
              desc: 'Point-of-sale system for two Japanese restaurants. PHP frontend with Python Flask backend, handling orders, payments, and reporting.',
              tags: ['Python Flask', 'PHP', 'MySQL'],
              num: 'Production · 2022',
            },
          ]
  return (
    <section id="projects">
        <div className="section-eyebrow">
          Work
        </div>

        <h2 className="section-title">
          Featured Projects
        </h2>

        <p className="section-sub">
          Systems built for real production environments — not demos.
        </p>

        <div className="projects-grid">
          <div className="project-card featured rust-project">
            <div>
              <div className="project-num">
                Personal Project · 2024
              </div>
              <div className="project-name">
                REST API Backend — Rust & Axum
              </div>
              <div className="project-desc">
                A performant, type-safe REST API backend built with Rust and the Axum framework.
                Features JWT authentication, PostgreSQL integration, and Docker containerization
                for consistent dev-to-prod environments. Built as a deep-dive into systems-level
                backend engineering.
              </div>
              <div className="project-stack">
                {['Rust', 'Axum', 'PostgreSQL', 'JWT', 'Docker'].map((tag) => (
                  <span
                    key={tag}
                    className={`tag ${tag ==='Rust' || tag==='Axum' ? 'rust' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
              <Terminal>
                <div><span className="t-comment">// main.rs — Axum router setup</span></div>
                <div>&nbsp;</div>
                <div><span className="t-key">async fn</span> <span className="text-[#2DD4BF]">main</span>() {'{'}</div>
                <div>&nbsp; <span className="t-key">let</span> app = Router::new()</div>
                <div>&nbsp;&nbsp;&nbsp; .route(<span className="t-string">"/api/auth/login"</span>, post(login))</div>
                <div>&nbsp;&nbsp;&nbsp; .route(<span className="t-string">"/api/users"</span>, get(get_users))</div>
                <div>&nbsp;&nbsp;&nbsp; .layer(JwtAuthLayer::new());</div>
                <div>&nbsp;</div>
                <div>&nbsp; axum::serve(listener, app)</div>
                <div>&nbsp;&nbsp;&nbsp; .await.unwrap();</div>
                <div>{'}'}</div>
              </Terminal>
          </div>

          {/* Other Projects */}
          {projectMaps.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-corner">↗</div>
              <div className="project-num">
                {project.num}
              </div>
              <div className="project-name">{project.title}</div>
              <div className="project-desc">{project.desc}</div>
              <div className="project-stack">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
           <div className="project-card">
            <div className="readmore">
              <a href="#projects" className="btn-primary">View Projects →</a>
            </div>
            </div>
        </div>
    </section>
  );
};

export default Projects;