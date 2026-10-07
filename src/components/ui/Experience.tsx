import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import { supabase } from "@utils/supabase";
import React, { useState,useEffect } from "react";
import type { ExperienceInterface } from "@components/types/Interface";

const Experience: React.FC = () => {
  const tech = ["FastAPI", "Python Flask", "Oracle NetSuite", "React"] as const;
  const { config } = useResponsive();
  const [experienceList, setExperienceList] = useState<ExperienceInterface[]>([])

  const fetchData = async () => {
    try {
      const {data,error} = await supabase.rpc("get_experiences").returns<ExperienceInterface[]>();
      if (error) throw error;
      const experienceData = (Array.isArray(data) ? data : []) as ExperienceInterface[];
      setExperienceList(experienceData);
    } catch (error) {
      setExperienceList([])
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <Sections
      id='experience'
      className={`default-section ${config.section.skill}`}
    >
      <div className={`section-tag`}>
        <span className='section-tag-icon'>💼</span>
        <span className={`section-tag-text`}>Career</span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={config.standard.header}>Where I've worked</h2>

      <p className={config.standard.desc}>
        Built real systems for real businesses —{" "}
        <strong>from restaurants to enterprise ERP.</strong>
      </p>
      <Divider className={`${config.experience.divider}!`} />
      <div className={`exp-list ${config.experience.list}`}>
        {experienceList.map((exp) => {
          const listStacks = exp.stacks.split(";");
          return (
            <div key={exp.id} className={`exp-item group ${config.experience.items}`}>
              <div className={`exp-meta ${config.experience.meta}`}>
                <div className={`exp-date ${config.experience.expdate}`}>
                  {exp.join_date}
                </div>
                <div className={`exp-company ${config.experience.company}`}>
                  {exp.company}
                </div>
              </div>
              <div>
                <div className={`exp-role ${config.experience.role}`}>
                  {exp.role}
                </div>
                <div className={`card-desc ${config.experience.desc}`}>
                  {exp.job_desc}
                </div>
                <div
                  className={`card-stack ${config.standard.stack}`}
                >
                  {listStacks.map((highlight,i) => 
                    (highlight !== "e") ? (
                     <span
                      key={i}
                      className={`card-tag ${config.standard.tag} ${tech.includes(highlight as (typeof tech)[number]) ? "rust" : ""}`}
                    >
                      {highlight}
                    </span> 
                    ) :''
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Sections>
  );
};

export default Experience;
