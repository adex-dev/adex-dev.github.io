import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-16 bg-[#0B0F1A] text-center relative overflow-hidden">
      <div className="absolute -bottom-72 -right-48 w-[600px] h-[600px] bg-radial-gradient from-[rgba(45,212,191,0.07)] to-transparent pointer-events-none" />

      <div className="relative">
        <div className="font-mono text-[0.75rem] text-[#2DD4BF] tracking-[0.15em] uppercase mb-3 flex items-center justify-center gap-3">
          Get in touch
          <span className="w-10 h-px bg-[#0F766E]" />
        </div>

        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
          Let's build<br />something <span className="text-[#2DD4BF]">real</span>
        </h2>

        <p className="text-[#8B98B0] mb-12">
          Open to freelance projects, contract roles, and full-time opportunities.
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <a
            href="mailto:akmadnudin.inc@gmail.com"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#1F2D45] text-[#8B98B0] no-underline font-mono text-[0.8rem] tracking-[0.05em] rounded transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
          >
            ✉ akmadnudin.inc@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/akmadnudin"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#1F2D45] text-[#8B98B0] no-underline font-mono text-[0.8rem] tracking-[0.05em] rounded transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
          >
            in LinkedIn
          </a>
          <a
            href="https://github.com/adex-dev"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#1F2D45] text-[#8B98B0] no-underline font-mono text-[0.8rem] tracking-[0.05em] rounded transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
          >
            {'{ }'} GitHub
          </a>
          <a
            href="https://akmadnudin.com"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#1F2D45] text-[#8B98B0] no-underline font-mono text-[0.8rem] tracking-[0.05em] rounded transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
          >
            ↗ akmadnudin.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;