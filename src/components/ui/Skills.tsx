import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import React, { useEffect, useRef } from 'react';
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
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const { config } = useResponsive();
  const colors = ["rust", "teal", "yellow", "green"] as const;
  return (
    <Sections
      id="skills"
      className={`${config.section.wrapper} ${config.section.skill}`}>
      <div className="section-tag">
        <span className="section-tag-icon">⚙</span>
        <span className={`eyebrow ${config.standard.eyebrow}`}>Tech Stack</span>
        <span className="section-tag-line"></span>
      </div>
      <h2 className={config.standard.header}>What I build with</h2>
      <p className={`subtitle ${config.standard.desc}`}>
        Comfortable across the full stack —{" "}
        <strong>backend-heavy by preference</strong>, frontend-capable by
        necessity.
      </p>
      <Divider />
      <div className={`bg-none skill-grid ${config.skill.box}`}>
        {skills.map((skill, index) => {
          const textColors = {
            rust: "text-rust",
            teal: "text-teal",
            yellow: "text-yellow",
            green: "text-green",
          } as const;

          const color = colors[index % colors.length];
          return (
            <div key={index} ref={el => cardsRef.current[index] = el} className={`skill-card ${config.skill.card}`}>
              <div className="card-corner"></div>
              <div
                className={`icon ${textColors[color]} ${config.standard.icon}`}>
                {skill.icon}
              </div>
              <div className={`card-title ${config.standard.cardtitle}`}>
                {skill.title}
              </div>
              <p className={`card-desc ${config.standard.carddesc}`}>
                {skill.desc}
              </p>
              <div className={`card-stack ${config.standard.stack}`}>
                {skill.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className={`tag ${tag === "Rust" || tag === "Axum" ? "rust" : ""}`}>
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
