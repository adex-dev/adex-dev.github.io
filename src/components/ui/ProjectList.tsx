import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";
import Projects2 from "./Projects2";
import Stats from "./Stats";
const ProjectList: React.FC = () => {
  const { config } = useResponsive();
  return (
    <div className='grid grid-cols-1'>
      <Sections id='projectslist' className={`container-custom h-auto! py-20`}>
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
          <h1 className={`text-8xl! font-black ${config.standard.header}`}>
            Things I've <span className='highlight'>built</span>
          </h1>
          <p className={config.standard.desc}>
            A selection of production systems I've designed, built, and shipped.
            From ERP integrations to real-time data pipelines — each one solving
            real business problems.
          </p>
        </div>
      </Sections>
      <Projects2 />
      <Sections
        id='portfoliolist'
        className={`default-section ${config.section.default} px-12!`}
      >
        <div className={`section-tag ${config.section.tag}`}>
          <span className={`section-tag-icon ${config.section.icon}`}>💻</span>
          <span className={`section-tag-text ${config.section.text}`}>
            By The Numbers
          </span>
          <span className='section-tag-line'></span>
        </div>
        <h2 className={config.standard.header}> Impact in <span className="highlight">production</span></h2>
        <p className={config.standard.desc}>
          Real metrics from real systems running in production environments.
        </p>
        <Divider />
        <Stats />
      </Sections>
    </div>
  );
};

export default ProjectList;
