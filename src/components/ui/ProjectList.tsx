import React from "react";
import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import { useLoaderData } from "react-router";
import type {
  categoryInterface,
  projectInterface,
} from "@components/types/Interface";
import Projects2 from "./Projects2";
import Stats from "./Stats";
const ProjectList: React.FC = () => {
   const { categories, projects } = useLoaderData() as {
    categories: categoryInterface[];
    projects: projectInterface[];
  };
  const { config } = useResponsive();
  return (
    <div className='grid grid-cols-1'>
      <Sections id='projectslist' className={`container-custom ${config.standard.containercustom} h-auto! py-20`}>
        <div className='max-w-3xl'>
          <div className={`section-tag ${config.section.tag}`}>
            <span className={`section-tag-icon ${config.section.icon}`}>
              💻
            </span>
            <span className={`section-tag-text ${config.section.text}`}>
              Portfolio
            </span>
            <span className='section-tag-line'></span>
          </div>
          <h1 className={`portfoliolist ${config.project.portfoliolist} font-black ${config.standard.header}`}>
            Things I've <span className='highlight'>built</span>
          </h1>
          <p className={config.standard.desc}>
            Case studies covering workforce management, restaurant operations,
            and business integrations. Each project outlines its context,
            implementation, and role.
          </p>
        </div>
      </Sections>
      <Projects2 initialCategories={categories} initialProjects={projects} />
      <Sections
        id='portfoliolist'
        className={`default-section ${config.section.default} impact-stats-section`}
      >
        <div className={`section-tag ${config.section.tag}`}>
          <span className={`section-tag-icon ${config.section.icon}`}>💻</span>
          <span className={`section-tag-text ${config.section.text}`}>
            By The Numbers
          </span>
          <span className='section-tag-line'></span>
        </div>
        <h2 className={config.standard.header}>Selected <span className="highlight">delivery metrics</span></h2>
        <p className={config.standard.desc}>
          Reported outcomes from delivered systems and professional experience.
        </p>
        <Divider />
        <Stats />
      </Sections>
    </div>
  );
};

export default ProjectList;
