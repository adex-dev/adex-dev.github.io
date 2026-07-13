import React from 'react';

const skills = [
  {
    icon: '{⚙}',
    title: 'Backend Development',
    desc: 'REST APIs, business logic, auth systems, and ERP integrations.',
    tags: ['Rust', 'Axum', 'Python', 'FastAPI', 'Flask', 'Go', 'PHP'],
    rustTags: [true, true, false, false, false, false, false],
  },
  {
    icon: '[UI]',
    title: 'Frontend Development',
    desc: 'Responsive, clean interfaces that connect seamlessly to backend APIs.',
    tags: ['React', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'jQuery', 'CodeIgniter'],
    rustTags: [false, false, false, false, false, false],
  },
  {
    icon: '[DB]',
    title: 'Database & Storage',
    desc: 'Schema design, query optimization, and data integrity across projects.',
    tags: ['PostgreSQL', 'MySQL'],
    rustTags: [false, false],
  },
  {
    icon: '[>>]',
    title: 'DevOps & Deployment',
    desc: 'Containerized, automated, and stable delivery pipelines.',
    tags: ['Docker', 'CI/CD', 'Linux', 'Git'],
    rustTags: [false, false, false, false],
  },
  {
    icon: '[≡]',
    title: 'System Integration',
    desc: 'Connecting systems that were never meant to talk to each other.',
    tags: ['Oracle NetSuite', 'Odoo', 'JWT Auth', 'REST API'],
    rustTags: [false, false, false, false],
  },
  {
    icon: '[◈]',
    title: 'Mobile',
    desc: 'Cross-platform mobile apps with Flutter for rapid delivery.',
    tags: ['Flutter', 'Dart'],
    rustTags: [false, false],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-16 bg-[#111827]">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[0.75rem] text-[#2DD4BF] tracking-[0.15em] uppercase mb-3 flex items-center gap-3">
          Tech Stack
          <span className="w-10 h-px bg-[#0F766E]" />
        </div>

        <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-4">
          What I build with
        </h2>

        <p className="text-[#8B98B0] max-w-[520px] mb-14">
          Comfortable across the full stack — backend-heavy by preference, frontend-capable by necessity.
        </p>

        <div className="grid grid-cols-3 gap-[1.5px] bg-[#1F2D45] border border-[#1F2D45]">
          {skills.map((skill, index) => (
            <div key={index} className="bg-[#161D2F] p-8 transition-colors hover:bg-[#1C2540]">
              <div className="font-mono text-[1.4rem] text-[#C85E3A] mb-4">{skill.icon}</div>
              <div className="text-[0.95rem] font-semibold text-[#E8EBF0] mb-2.5">{skill.title}</div>
              <p className="text-[#8B98B0] text-[0.85rem]">{skill.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {skill.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`font-mono text-[0.68rem] px-2 py-1 rounded tracking-[0.04em] border
                      ${skill.rustTags[tagIndex]
                        ? 'bg-[rgba(200,94,58,0.1)] text-[#C85E3A] border-[rgba(200,94,58,0.2)]'
                        : 'bg-[rgba(45,212,191,0.08)] text-[#2DD4BF] border-[rgba(45,212,191,0.15)]'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;