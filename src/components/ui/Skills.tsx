import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";

const skills = [
  {
    icon: "{⚙}",
    title: "Backend Development",
    desc: "REST APIs, business logic, auth systems, and ERP integrations.",
    tags: ["Rust", "Axum", "Python", "FastAPI", "Flask", "Go", "PHP"],
    rustTags: [true, true, false, false, false, false, false],
  },
  {
    icon: "[UI]",
    title: "Frontend Development",
    desc: "Responsive, clean interfaces that connect seamlessly to backend APIs.",
    tags: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "jQuery",
      "CodeIgniter",
    ],
    rustTags: [false, false, false, false, false, false],
  },
  {
    icon: "[DB]",
    title: "Database & Storage",
    desc: "Schema design, query optimization, and data integrity across projects.",
    tags: ["PostgreSQL", "MySQL"],
    rustTags: [false, false],
  },
  {
    icon: "[>>]",
    title: "DevOps & Deployment",
    desc: "Containerized, automated, and stable delivery pipelines.",
    tags: ["Docker", "CI/CD", "Linux", "Git"],
    rustTags: [false, false, false, false],
  },
  {
    icon: "[≡]",
    title: "System Integration",
    desc: "Connecting systems that were never meant to talk to each other.",
    tags: ["Oracle NetSuite", "Odoo", "JWT Auth", "REST API"],
    rustTags: [false, false, false, false],
  },
  {
    icon: "[◈]",
    title: "Mobile",
    desc: "Cross-platform mobile apps with Flutter for rapid delivery.",
    tags: ["Flutter", "Dart"],
    rustTags: [false, false],
  },
];

const Skills: React.FC = () => {
  const { config } = useResponsive();
  const colors = ["rust", "teal", "yellow", "green"] as const;
  return (
    <Sections
      id='skills'
      className={`${config.section.wrapper} ${config.section.skill}`}
    >
      <div className={`eyebrow ${config.standard.eyebrow}`}>Tech Stack</div>
      <h2 className={config.standard.header}>What I build with</h2>
      <p className={config.standard.desc}>
        Comfortable across the full stack — backend-heavy by preference,
        frontend-capable by necessity.
      </p>
      <Divider />
      <div className={`bg-none ${config.skill.box}`}>
        {skills.map((skill, index) => {
          const textColors = {
            rust: "!text-rust",
            teal: "!text-teal",
            yellow: "!text-yellow",
            green: "!text-green",
          } as const;

          const color = colors[index % colors.length];
          return (
            <div key={index} className={`skill-card ${config.skill.card}`}>
              <div className={`icon ${textColors[color]} ${config.standard.icon}`}>{skill.icon}</div>
              <div className={config.standard.header}>{skill.title}</div>
              <p className={`${config.standard.desc}`}>{skill.desc}</p>
              <div className={`card-stack ${config.standard.stack}`}>
                {skill.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className={`tag ${tag === "Rust" || tag === "Axum" ? "rust" : ""}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Sections>
  );
};

export default Skills;
