import React from 'react';

const experiences = [
  {
    date: 'Jun 2025 – Present',
    company: 'PT. Indobara Bahana',
    role: 'Full Stack Software Engineer',
    desc: 'Maintaining and developing internal systems, managing Oracle NetSuite ERP integration, and implementing new software solutions aligned with business operations.',
    highlights: ['Oracle NetSuite', 'ERP Integration', 'System Maintenance'],
  },
  {
    date: '2022 – Feb 2025',
    company: 'PT. Sanggar Catur Utama',
    role: 'Senior Full Stack Programmer',
    desc: 'Led development of company-wide management systems. Reduced system load time by 15% through optimization. Implemented POS and HRIS systems that increased operational productivity by 20% and cut manual errors by 20%.',
    highlights: ['Python Flask', 'FastAPI', 'React', 'MySQL', 'POS System', 'HRIS'],
  },
  {
    date: '2019 – 2022',
    company: 'PT. Jaygee Group',
    role: 'Senior Programmer',
    desc: 'Built attendance realization systems and company website applications for a subsidiary of PT. Sanggar Catur Utama (internal transfer).',
    highlights: ['Web App', 'Attendance System'],
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-16 bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[0.75rem] text-[#2DD4BF] tracking-[0.15em] uppercase mb-3 flex items-center gap-3">
          Career
          <span className="w-10 h-px bg-[#0F766E]" />
        </div>

        <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-4">
          Where I've worked
        </h2>

        <p className="text-[#8B98B0] max-w-[520px] mb-14">
          Built real systems for real businesses — from restaurants to enterprise ERP.
        </p>

        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="grid grid-cols-[200px_1fr] gap-x-12 py-10 border-b border-[#1F2D45] relative"
            >
              <div className="absolute left-[193px] top-0 bottom-0 w-px bg-[#1F2D45]" />
              <div className="pt-0.5">
                <div className="font-mono text-[0.72rem] text-[#8B98B0] tracking-[0.06em] uppercase mb-1.5">
                  {exp.date}
                </div>
                <div className="text-[0.8rem] text-[#2DD4BF] font-medium">{exp.company}</div>
              </div>
              <div>
                <div className="text-[1.05rem] font-semibold text-[#E8EBF0] mb-2">{exp.role}</div>
                <div className="text-[#8B98B0] text-[0.9rem] leading-relaxed">{exp.desc}</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="font-mono text-[0.68rem] px-2 py-0.5 border border-[#1F2D45] text-[#8B98B0] rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;