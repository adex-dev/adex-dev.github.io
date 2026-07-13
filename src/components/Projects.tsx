import React from 'react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-16 bg-[#111827]">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[0.75rem] text-[#2DD4BF] tracking-[0.15em] uppercase mb-3 flex items-center gap-3">
          Work
          <span className="w-10 h-px bg-[#0F766E]" />
        </div>

        <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-4">
          Featured Projects
        </h2>

        <p className="text-[#8B98B0] max-w-[520px] mb-14">
          Systems built for real production environments — not demos.
        </p>

        <div className="grid grid-cols-2 gap-[1.5px] bg-[#1F2D45] border border-[#1F2D45]">
          {/* Featured Project */}
          <div className="col-span-2 bg-[#161D2F] p-10 grid grid-cols-2 gap-12 items-center transition-colors hover:bg-[#1C2540] relative">
            <div>
              <div className="font-mono text-[0.7rem] text-[#8B98B0] tracking-[0.1em] uppercase mb-4">
                Personal Project · 2024
              </div>
              <div className="text-[1.2rem] font-semibold text-[#C85E3A] mb-3">
                REST API Backend — Rust & Axum
              </div>
              <div className="text-[#8B98B0] text-[0.88rem] leading-relaxed mb-6">
                A performant, type-safe REST API backend built with Rust and the Axum framework.
                Features JWT authentication, PostgreSQL integration, and Docker containerization
                for consistent dev-to-prod environments. Built as a deep-dive into systems-level
                backend engineering.
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Rust', 'Axum', 'PostgreSQL', 'JWT', 'Docker'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.68rem] px-2 py-1 rounded tracking-[0.04em] bg-[rgba(200,94,58,0.1)] text-[#C85E3A] border border-[rgba(200,94,58,0.2)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0B0F1A] border border-[#1F2D45] rounded overflow-hidden">
              <div className="bg-[#111827] px-4 py-2.5 flex items-center gap-2 border-b border-[#1F2D45]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="px-6 py-5 font-mono text-[0.75rem] leading-relaxed">
                <div><span className="text-[#8B98B0]">// main.rs — Axum router setup</span></div>
                <div>&nbsp;</div>
                <div><span className="text-[#C85E3A]">async fn</span> <span className="text-[#2DD4BF]">main</span>() {'{'}</div>
                <div>&nbsp; <span className="text-[#C85E3A]">let</span> app = Router::new()</div>
                <div>&nbsp;&nbsp;&nbsp; .route(<span className="text-[#F9C97C]">"/api/auth/login"</span>, post(login))</div>
                <div>&nbsp;&nbsp;&nbsp; .route(<span className="text-[#F9C97C]">"/api/users"</span>, get(get_users))</div>
                <div>&nbsp;&nbsp;&nbsp; .layer(JwtAuthLayer::new());</div>
                <div>&nbsp;</div>
                <div>&nbsp; axum::serve(listener, app)</div>
                <div>&nbsp;&nbsp;&nbsp; .await.unwrap();</div>
                <div>{'}'}</div>
              </div>
            </div>

            <div className="absolute top-6 right-6 text-[#1F2D45] text-[1.2rem]">↗</div>
          </div>

          {/* Other Projects */}
          {[
            {
              title: 'WDMS — Web Data Management System',
              desc: 'Real-time fingerprint data collection from multiple branches into a centralized server, integrated with HRIS. Role-based access, automated reporting.',
              tags: ['Python Flask', 'Tailwind CSS', 'Real-time', 'HRIS Integration'],
              num: 'Production · 2022–2025',
            },
            {
              title: 'HRIS — HR Information System',
              desc: 'Full HR automation: payroll processing, attendance tracking, employee data management. Reduced HR team workload by 30%.',
              tags: ['CodeIgniter', 'Bootstrap', 'MySQL'],
              num: 'Production · 2022',
            },
            {
              title: 'POS System — Isoide & Nahm Restaurant',
              desc: 'Point-of-sale system for two Japanese restaurants. PHP frontend with Python Flask backend, handling orders, payments, and reporting.',
              tags: ['Python Flask', 'PHP', 'MySQL'],
              num: 'Production · 2022',
            },
          ].map((project, index) => (
            <div key={index} className="bg-[#161D2F] p-10 transition-colors hover:bg-[#1C2540] relative">
              <div className="absolute top-6 right-6 text-[#1F2D45] text-[1.2rem]">↗</div>
              <div className="font-mono text-[0.7rem] text-[#8B98B0] tracking-[0.1em] uppercase mb-4">
                {project.num}
              </div>
              <div className="text-[1.2rem] font-semibold text-[#E8EBF0] mb-3">{project.title}</div>
              <div className="text-[#8B98B0] text-[0.88rem] leading-relaxed mb-6">{project.desc}</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.68rem] px-2 py-1 rounded tracking-[0.04em] bg-[rgba(45,212,191,0.08)] text-[#2DD4BF] border border-[rgba(45,212,191,0.15)]"
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

export default Projects;