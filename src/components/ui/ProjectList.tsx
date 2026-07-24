import React from "react";
import Projects2 from "./Projects2";
import Stats from "./Stats";
import { Sections } from "@components/atom";
const ProjectList: React.FC = () => {
  return (
    <>
      <Sections id="projectslist" className="bg-primary! relative">
             <div className='card-box before:grid-bg bg-primary'>

        <div className="card-eyebrow">Portfolio</div>
        <h1 className="card-title">Projects</h1>

        <p className="card-sub">
          Systems built for real production environments — not demos or side
          experiments. Every project here ran (or still runs) in a real
          business.
        </p>
        </div>
      </Sections>
      <Stats />
      <Projects2 />
    </>
  );
};

export default ProjectList;
