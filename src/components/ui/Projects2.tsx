import { Sections } from "@components/atom";
import CardGlassCustome from "@components/atom/CardGlassCustome";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";
import { useNavigate } from "react-router";
const Projects2: React.FC = () => {
  const navigate = useNavigate();
  const projectMaps = [
    {
      id: "wdms",
      title: "WDMS — Web Data Management System",
      desc: "Real-time fingerprint data collection from multiple branches into a centralized server, integrated with HRIS. Role-based access, automated reporting.",
      tags: ["Python Flask", "Tailwind CSS", "Real-time", "HRIS Integration"],
      num: "2022–2025",
      year: "2022-2025",
      type: "Production",
      impact: "Attended · Integration",
    },
    {
      id: "hris",
      title: "HRIS — HR Information System",
      desc: "Full HR automation: payroll processing, attendance tracking, employee data management. Reduced HR team workload by 30%.",
      tags: ["CodeIgniter", "Bootstrap", "MySQL", "Bootstrap"],
      num: "2022",
      year: "2022",
      type: "Production",
      impact: "↓ 30% HR Workload",
    },
    {
      id: "posisoide",
      title: "POS System — Isoide & Nahm Restaurant",
      desc: "Point-of-sale system for two Japanese restaurants. PHP frontend with Python Flask backend, handling orders, payments, and reporting.",
      tags: ["Python Flask", "PHP", "MySQL", "Tailwind CSS"],
      num: "2022",
      year: "2022",
      type: "Production",
      impact: "Full Stack · POS",
    },
    {
      id: "archive",
      title: "Archive — Bookkeeping & Inventory System",
      desc: `Automated bookkeeping and inventory tracking application to reduce
            manual data entry errors. Replaced a manual spreadsheet-based
            workflow.`,
      tags: ["Python Flask", "Docker", "MySQL", "Bootstrap"],
      num: "2021",
      year: "2021",
      type: "Production",
      impact: "Full Stack · Finance",
    },
    {
      id: "attendance",
      title: "Attendance Realization System",
      desc: `Company-wide attendance tracking and realization system built for
            PT. Jaygee Group. Handles daily attendance data, monthly
            realization, and branch-level reporting.`,
      tags: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
      num: "2019–2022",
      year: "2019–2022",
      type: "Production",
      impact: "Full Stack · HR",
    },
  ];
  const handlerclick = (link: string) => {
    navigate(`/project-detail?id${link}`);
  };
  const { config } = useResponsive();
  const colors = ["rust", "teal", "yellow", "green","purple"] as const;
  const textCorner = {
    rust: "#d34516",
    teal: "#38bdf8",
    yellow: "#ffbd2e",
    green: "#2dd4bf",
    purple: "#6366f1",
  } as const;

  return (
    <Sections
      id='portfoliolist'
      className={`default-section ${config.section.default} px-12!`}
    >
      <div className='flex flex-wrap gap-3 mb-12 reveal'>
        <button className='filter-btn active'>All</button>
        <button className='filter-btn'>Backend</button>
        <button className='filter-btn'>Full Stack</button>
        <button className='filter-btn'>ERP</button>
        <button className='filter-btn'>Rust</button>
      </div>
      <div className={`project-box ${config.project.box}`}>
        {projectMaps.map((project, index) => {
          const color = colors[index % colors.length];
          return (
            <CardGlassCustome
              onClick={() => handlerclick(project.id)}
              color={textCorner[color]}
              tag={project.tags}
              desc={project.desc}
              title={project.title}
              corner={project.type}
              period={project.num}
              impact={project.impact}
              key={index}
            ></CardGlassCustome>
          );
        })}
      </div>
    </Sections>
  );
};

export default Projects2;
