import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";

const experiences = [
  {
    date: "Jun 2025 – Present",
    company: "PT. Indobara Bahana",
    role: "Full Stack Software Engineer",
    desc: "Maintaining and developing internal systems, managing Oracle NetSuite ERP integration, and implementing new software solutions aligned with business operations.",
    highlights: ["Oracle NetSuite", "ERP Integration", "System Maintenance"],
  },
  {
    date: "2022 – Feb 2025",
    company: "PT. Sanggar Catur Utama",
    role: "Senior Full Stack Programmer",
    desc: "Led development of company-wide management systems. Reduced system load time by 15% through optimization. Implemented POS and HRIS systems that increased operational productivity by 20% and cut manual errors by 20%.",
    highlights: [
      "Python Flask",
      "FastAPI",
      "React",
      "MySQL",
      "POS System",
      "HRIS",
    ],
  },
  {
    date: "2019 – 2022",
    company: "PT. Jaygee Group",
    role: "Senior Programmer",
    desc: "Built attendance realization systems and company website applications for a subsidiary of PT. Sanggar Catur Utama (internal transfer).",
    highlights: ["Web App", "Attendance System"],
  },
];

const Experience: React.FC = () => {
  const tech = ["FastAPI", "Python Flask", "Oracle NetSuite", "React"] as const;
  const { config } = useResponsive();
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
        {experiences.map((exp, index) => {
          return (
            <div key={index} className={`exp-item group ${config.experience.items}`}>
              <div className={`exp-meta ${config.experience.meta}`}>
                <div className={`exp-date ${config.experience.expdate}`}>
                  {exp.date}
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
                  {exp.desc}
                </div>
                <div
                  className={`card-stack ${config.standard.stack}`}
                >
                  {exp.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className={`card-tag ${tech.includes(highlight as (typeof tech)[number]) ? "rust" : ""}`}
                    >
                      {highlight}
                    </span>
                  ))}
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
