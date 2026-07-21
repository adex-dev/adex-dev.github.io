import { Divider, Sections } from "@components/atom";
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
  return (
    <Sections id='experience'>
      <div className='card-box before:grid-bg bg-primary'>
        <div className='card-eyebrow'>Career</div>

        <h2 className='card-title'>Where I've worked</h2>

        <p className='card-sub'>
          Built real systems for real businesses — from restaurants to
          enterprise ERP.
        </p>
      </div>
      <Divider />

      <div className='exp-list'>
        {experiences.map((exp, index) => {

          return (
            <div key={index} className='exp-item'>
              <div className='exp-meta'>
                <div className='exp-date'>{exp.date}</div>
                <div className='exp-company'>{exp.company}</div>
              </div>
              <div>
                <div className='exp-role'>{exp.role}</div>
                <div className='exp-desc'>{exp.desc}</div>
                <div className='exp-highlights'>
                  {exp.highlights.map((highlight) => (
                    <span key={highlight} className={`tag ${tech.includes(highlight as (typeof tech)[number]) ? "rust" : ""}`}>
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
