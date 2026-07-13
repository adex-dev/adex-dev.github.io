import React from 'react';

const services = [
  {
    num: '01',
    icon: '{⚙}',
    title: 'Backend & API Development',
    desc: 'High-performance REST APIs and backend services built for production — secure, scalable, and well-documented.',
    items: ['REST API design & development', 'JWT authentication & authorization', 'Database design (PostgreSQL / MySQL)', 'Python (FastAPI, Flask), Go, Rust/Axum'],
    price: 'RM 800 / project',
    highlight: false,
  },
  {
    num: '02',
    icon: '[◈]',
    title: 'Full Stack Web Application',
    desc: 'Complete web systems from database to UI — internal tools, dashboards, management systems, and more.',
    items: ['React + Tailwind CSS frontend', 'Backend API & business logic', 'Admin dashboard & reporting', 'Docker deployment & CI/CD setup'],
    price: 'RM 1,500 / project',
    highlight: true,
  },
  {
    num: '03',
    icon: '[≡]',
    title: 'ERP & System Integration',
    desc: 'Connect your business systems — ERP platforms, third-party APIs, and legacy systems that need to talk to each other.',
    items: ['Oracle NetSuite integration', 'Odoo customization & integration', 'Third-party API integration', 'Data sync & migration'],
    price: 'RM 1,200 / project',
    highlight: false,
  },
  {
    num: '04',
    icon: '[HR]',
    title: 'HRIS & POS Systems',
    desc: 'Specialized business systems built from real production experience — not generic templates.',
    items: ['HR & payroll automation', 'Attendance tracking system', 'Point of Sale (POS) system', 'Multi-branch data management'],
    price: 'RM 2,000 / project',
    highlight: false,
  },
  {
    num: '05',
    icon: '[>>]',
    title: 'DevOps & Deployment',
    desc: 'Set up your infrastructure right from the start — containerized, automated, and ready to scale.',
    items: ['Docker containerization', 'CI/CD pipeline setup', 'Linux server configuration', 'Performance optimization'],
    price: 'RM 600 / project',
    highlight: false,
  },
  {
    num: '06',
    icon: '[◉]',
    title: 'Code Review & Consultation',
    desc: 'Get expert eyes on your codebase, architecture decisions, or technical roadmap — before problems become expensive.',
    items: ['Code review & refactoring advice', 'Architecture consultation', 'Performance audit', 'Tech stack recommendation'],
    price: 'RM 200 / session',
    highlight: false,
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-16 bg-[#111827]">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[0.75rem] text-[#2DD4BF] tracking-[0.15em] uppercase mb-3 flex items-center gap-3">
          What I Offer
          <span className="w-10 h-px bg-[#0F766E]" />
        </div>

        <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-4">
          Our Services
        </h2>

        <p className="text-[#8B98B0] max-w-[520px] mb-14">
          End-to-end software development services — from API design to production deployment.
        </p>

        <div className="grid grid-cols-3 gap-[1.5px] bg-[#1F2D45] border border-[#1F2D45] mt-14">
          {services.map((service) => (
            <div
              key={service.num}
              className={`bg-[#161D2F] p-10 transition-colors hover:bg-[#1C2540] relative ${
                service.highlight ? '' : ''
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#1F2D45] transition-colors group-hover:bg-[#C85E3A]" />
              {service.highlight && (
                <style>{`
                  .group:hover .absolute { background: #2DD4BF; }
                `}</style>
              )}

              <div className="font-mono text-[0.65rem] text-[#8B98B0] tracking-[0.12em] uppercase mb-5">
                {service.num}
              </div>

              <div
                className={`w-11 h-11 border rounded flex items-center justify-center mb-5 font-mono text-base ${
                  service.highlight
                    ? 'text-[#2DD4BF] bg-[rgba(45,212,191,0.07)] border-[rgba(45,212,191,0.2)]'
                    : 'text-[#C85E3A] bg-[rgba(200,94,58,0.07)] border-[#1F2D45]'
                }`}
              >
                {service.icon}
              </div>

              <div className="text-[1.05rem] font-semibold text-[#E8EBF0] mb-3">{service.title}</div>
              <div className="text-[0.87rem] text-[#8B98B0] leading-relaxed mb-5">{service.desc}</div>

              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="text-[0.82rem] text-[#8B98B0] flex items-start gap-2">
                    <span className={service.highlight ? 'text-[#2DD4BF]' : 'text-[#C85E3A]'}>
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-[#1F2D45] flex items-center justify-between">
                <span className="font-mono text-[0.7rem] text-[#8B98B0] uppercase tracking-[0.08em]">
                  Starting from
                </span>
                <span className="font-mono text-[0.85rem] text-[#2DD4BF] font-bold">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;