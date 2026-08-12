import Backend from "@assets/backend.svg?react";
import CodeIcon from "@assets/code.svg?react";
import Data from "@assets/data.svg?react";
import Dev from "@assets/devops.svg?react";
import Shield from "@assets/shild.svg?react";
import { Divider, Sections } from "@components/atom";
import RevealSection from "@components/atom/RevealSection";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";
const skills = [
  {
    icon: <Backend className='w-5 h-5 text-rust' />,
    title: "Backend Architecture",
    desc: "REST API design, authentication, business logic, and database architecture with Rust, Python, and PHP.",
    tags: ["Rust", "Axum", "Python", "FastAPI", "Flask", "Go", "PHP"],
    rustTags: [true, true, false, false, false, false, false],
  },
  {
    icon: <CodeIcon className='w-5 h-5 text-cyan-400' />,
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
    icon: <Data className='w-5 h-5 text-yellow' />,
    title: "Database & Storage",
    desc: " Schema design, query optimization, and data modeling with PostgreSQL and MySQL for scalable applications.",
    tags: ["PostgreSQL", "MySQL"],
    rustTags: [false, false],
  },
  {
    icon: <Shield className='w-5 h-5 text-green-dim' />,
    title: "System Integration",
    desc: "Connecting systems that were never meant to talk to each other.",
    tags: ["Oracle NetSuite", "Odoo", "JWT Auth", "REST API"],
    rustTags: [false, false, false, false],
  },
  {
    icon: <Dev className='w-5 h-5 text-accent-cyan' />,
    title: "DevOps & Deployment",
    desc: "Docker containerization, Linux server management, Nginx configuration, and CI/CD pipeline setup.",
    tags: ["Docker", "CI/CD", "Linux", "Git"],
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
      className={`${config.section.wrapper} skill-section ${config.section.skill}`}
    >
      <div className={`section-tag reveal ${config.section.tag}`}>
        <span className={`section-tag-icon ${config.section.icon}`}>⚙</span>
        <span className={`section-tag-text ${config.section.text}`}>Expertise</span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={`${config.standard.header} reveal reveal-delay-1`}>
        What I can build for you
      </h2>
      <p className={`subtitle ${config.standard.desc}`}>
        Comfortable across the full stack —{" "}
        <strong>backend-heavy by preference</strong>, frontend-capable by
        necessity.
      </p>
      <Divider />
      <RevealSection selector='.tech-card' threshold={0.2} delay={150}>
        <div className={`bg-none skill-grid ${config.skill.box}`}>
          {skills.map((skill, index) => {
            const accentGradients = {
              rust: "linear-gradient(90deg, transparent, #d34516, transparent)",
              teal: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
              yellow:
                "linear-gradient(90deg, transparent, #facc15, transparent)",
              green:
                "linear-gradient(90deg, transparent, #22c55e, transparent)",
            } as const;
            const textColors = {
              rust: "#d34516",
              teal: "#38bdf8",
              yellow: "#ffbd2e",
              green: "#2dd4bf",
            } as const;
            const textCorner = {
              rust: "#d345166e",
              teal: "#38bdf86e",
              yellow: "#ffbd2e6e",
              green: "#2dd4bf6e",
            } as const;

            const color = colors[index % colors.length];
            return (
              <div
                key={index}
                className={`tech-card group ${config.skill.techCard}`}
                style={
                  {
                    "--accent-gradient": accentGradients[color],
                  } as React.CSSProperties
                }
              >
                <div
                  className={`card-corner `}
                  style={
                    {
                      "--accent-color": textCorner[color],
                    } as React.CSSProperties
                  }
                ></div>
                <div
                  className={`card-icon`}
                  style={
                    {
                      color: textColors[color],
                    } as React.CSSProperties
                  }
                >
                  <div
                    style={
                      {
                        backgroundColor: `color-mix(in srgb, ${textColors[color]} 20%, transparent)`,
                      } as React.CSSProperties
                    }
                    className='w-10 h-10 rounded-lg flex items-center justify-center mb-4'
                  >
                    {skill.icon}
                  </div>
                </div>
                <h3 className={`card-title ${config.standard.cardtitle}`}>
                  {skill.title}
                </h3>
                <p className={`card-desc ${config.standard.carddesc}`}>
                  {skill.desc}
                </p>
                <div
                  className={`card-stack reveal reveal-delay-1 ${config.standard.stack}`}
                >
                  {skill.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className={`card-tag ${config.standard.tag} ${tag === "Rust" || tag === "Axum" ? "rust" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </RevealSection>
    </Sections>
  );
};

export default Skills;
