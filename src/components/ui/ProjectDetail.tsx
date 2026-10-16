import React from "react";
import { Sections } from "@components/atom";
import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { useResponsive } from "@responsive/useResponsive";
const ProjectDetail: React.FC = () => {
  const { config } = useResponsive();
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title>Wdms</title>
        <meta
          name="description"
          content="Detailed case studies: WDMS, HRIS, POS System, Rust REST API. Challenges, solutions, tech stack, and measurable results."
          key="desc"
        />
        <meta
          name="keywords"
          content="akmadnudin,Project Detail,Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia"
          key="kw"
        />
        ,
      </Helmet>
      <div className="breadcrump-project">
        <Link to="/">Home</Link>
        <span className="breadcrump-sep">/</span>
        <Link to="/project-list">Project</Link>
        <span className="breadcrump-sep">/</span>
        <span id="bc-title">WDMS — Web Data Management System</span>
      </div>
      <Sections
        id="projectsDetail"
        className={`default-section ${config.section.default} detail-hero-project`}>
        <div className="box-eyebrow-poject">
          <div className="eyebrow-project-left">
            <div className="eyebrow-project-type">
              <span className="project-type-dot prod" id="p-type-dot"></span>
              <span id="p-type">Production · PT. Sanggar Catur Utama</span>
            </div>
            <h2 className={`${config.standard.header} mb-0.5! tracking-[-0.03em]! text-[2rem]!`}>WDMS — Web Data Management System</h2>
            <p className={`${config.standard.desc} text-xs! max-w-[600px]! leading-1.7`}>
              Real-time fingerprint data collection from 20+ branches into a centralized server — integrated with HRIS for attendance and payroll processing.
            </p>
          </div>
          <div className="eyebrow-project-status">
            <span>Live in Production</span>
          </div>
        </div>
      </Sections>
    </>
  );
};

export default ProjectDetail;
