import { CardGlass, Divider, Sections } from "@components/atom";
import { Terminal } from "@components/includes/terminal";
import { useResponsive } from "@responsive/useResponsive";
import {supabase} from "@utils/supabase"
import React,{useState,useEffect} from "react";
import { Link } from "react-router";
import type {projectInterface} from '@components/types/Interface'
const Projects: React.FC = () => {
  const { config } = useResponsive();
  const [projectMaps,setProjectMaps] = useState<projectInterface[]>([]);
  const getData = async () =>{
    try {
      const {data,error} = await supabase.rpc("get_projects").select("id,title_thumbnail,short_desc,stacks,stack_colors,period,status_category").limit(3).returns<projectInterface[]>();
      if (error) throw error;
      const projectData = (Array.isArray(data) ? data : []) as projectInterface[];
      setProjectMaps(projectData);
    } catch (error) {
      setProjectMaps([])
      console.error(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])
  


  // const projectMaps = [
  //   {
  //     title: "WDMS — Web Data Management System",
  //     desc: "Real-time fingerprint data collection from multiple branches into a centralized server, integrated with HRIS. Role-based access, automated reporting.",
  //     tags: ["Python Flask", "Tailwind CSS", "Real-time", "HRIS Integration"],
  //     num: "2022–2025",
  //     type: "Production",
  //   },
  //   {
  //     title: "HRIS — HR Information System",
  //     desc: "Full HR automation: payroll processing, attendance tracking, employee data management. Reduced HR team workload by 30%.",
  //     tags: ["CodeIgniter", "Bootstrap", "MySQL"],
  //     num: "2022",
  //     type: "Production",
  //   },
  //   {
  //     title: "POS System — Isoide & Nahm Restaurant",
  //     desc: "Point-of-sale system for two Japanese restaurants. PHP frontend with Python Flask backend, handling orders, payments, and reporting.",
  //     tags: ["Python Flask", "PHP", "MySQL"],
  //     num: "2022",
  //     type: "Production",
  //   },
  // ];
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
              <div className={`project-name ${config.project.name}`}>
                REST API Backend — Rust & Axum
              </div>
              <div className={`project-desc ${config.project.desc}`}>
                A performant, type-safe REST API backend built with Rust and the
                Axum framework. Features JWT authentication, PostgreSQL
                integration, and Docker containerization for consistent
                dev-to-prod environments. Built as a deep-dive into
                systems-level backend engineering.
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
          <CardGlass tag={listStacks} tagcolor={listStacksColor} desc={project.short_desc} title={project.title_thumbnail} corner={project.status_category} period={project.period} key={project.id}>
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
