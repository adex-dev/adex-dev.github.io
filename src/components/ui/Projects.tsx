import { CardGlass, Divider, Sections } from "@components/atom";
import { Terminal } from "@components/includes/terminal";
import { useResponsive } from "@responsive/useResponsive";
import React,{useState} from "react";
import { Link } from "react-router";
import type {projectInterface} from '@components/types/Interface'
interface ProjectsProps {
  initialProjects: projectInterface[];
}
const Projects: React.FC<ProjectsProps> = ({
  initialProjects
}) => {
  const { config } = useResponsive();
  const [projectMaps] = useState(initialProjects);
  return (
    <Sections
      id='projects'
      className={`default-section ${config.section.default}`}
    >
      <div className={`section-tag ${config.section.tag}`}>
        <span className={`section-tag-icon ${config.section.icon}`}>💻</span>
        <span className={`section-tag-text ${config.section.text}`}>Work</span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={config.standard.header}>Featured Work</h2>
      <p className={config.standard.desc}>
        Selected work across workforce operations, restaurant systems, and
        business integrations.
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
                Backend Engineering · Rust
              </div>
              <div className={`project-name ${config.project.name}`}>
                REST API Backend — Rust & Axum
              </div>
              <div className={`project-desc ${config.project.desc}`}>
                A Rust and Axum API project demonstrating authentication,
                PostgreSQL data access, and containerized deployment. It
                highlights practical backend design, from route structure to
                a repeatable development environment.
              </div>
              <div className={`card-stack ${config.standard.stack}`}>
                {["Rust", "Axum", "PostgreSQL", "JWT", "Docker"].map((tag) => (
                  <span
                    key={tag}
                    className={`card-tag ${config.standard.tag} ${tag === "Rust" || tag === "Axum" ? "rust" : ""}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Terminal>
              <div>
                <span className={`t-comment ${config.terminal.comments}`}>
                  // main.rs — Axum router setup
                </span>
              </div>
              <div>&nbsp;</div>
              <div>
                <span className={`t-key ${config.terminal.keys}`}>async fn</span>{" "}
                <span className='text-green'>main</span>() {"{"}
              </div>
              <div>
                &nbsp; <span className={`t-key ${config.terminal.keys}`}>let</span> app = Router::new()
              </div>
              <div>
                &nbsp;&nbsp;&nbsp; .route(
                <span className={`t-string ${config.terminal.tString}`}>"/api/auth/login"</span>,
                post(login))
              </div>
              <div>
                &nbsp;&nbsp;&nbsp; .route(
                <span className={`t-string ${config.terminal.tString}`}>"/api/users"</span>, get(get_users))
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
      <div className={`project-box ${config.project.box}`}>
        {projectMaps.map((project) => {
          const listStacks = project.stacks.split(";");
          const listStacksColor = project.stack_colors.split(";");
         return (
          <CardGlass to={`/project-detail/${project.category}/${project.prefix_url}`} tag={listStacks} tagcolor={listStacksColor} desc={project.short_desc} title={project.title_short} corner={project.status_category} period={project.period} key={project.id}>
          </CardGlass>
        )
      }
      )}
      </div>
      <div className='inline-flex items-end justify-end w-full mt-2'>
        <Link
          to='project-list'
          className={`project-cta reveal reveal-delay-2 ${config.project.btnCTA}`}
        >
          View All Projects &rarr;
        </Link>
      </div>
    </Sections>
  );
};

export default Projects;
