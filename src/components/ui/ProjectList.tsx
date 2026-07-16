import React from "react";
import Projects2 from './Projects2';
import Stats from './Stats';
const ProjectList: React.FC = () => {
  return (
  <>
    <section id="projectslist" className='bg-primary!'>
      <div className="page-header">
        <div className="section-eyebrow">Portfolio</div>
        <h1 className='section-title'>Projects</h1>

        <p className="section-sub">
          Systems built for real production environments — not demos or side
          experiments. Every project here ran (or still runs) in a real
          business.
        </p>
      </div>
    </section>
      <Stats/>
      <Projects2/>
  </>
  );
};

export default ProjectList;
