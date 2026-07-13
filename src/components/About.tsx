import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-16 bg-[#0B0F1A]">
      <div className="grid grid-cols-[380px_1fr] gap-20 items-center max-w-7xl mx-auto">
        {/* Photo */}
        <div className="relative">
          <div className="relative w-[320px] h-[360px]">
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-[#C85E3A] z-20" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-[#2DD4BF] z-20" />

            <div className="w-full h-full bg-[#161D2F] rounded border border-[#1F2D45] flex items-center justify-center overflow-hidden">
              <svg width="260" height="300" viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG content dari HTML asli */}
                <rect width="260" height="300" fill="#161D2F"/>
                <rect x="20" y="220" width="220" height="12" rx="3" fill="#1F2D45"/>
                <rect x="115" y="192" width="30" height="30" rx="2" fill="#1F2D45"/>
                <rect x="60" y="130" width="140" height="90" rx="6" fill="#0B0F1A" stroke="#1F2D45" strokeWidth="2"/>
                <rect x="68" y="138" width="124" height="74" rx="3" fill="#111827"/>
                <rect x="76" y="148" width="50" height="4" rx="2" fill="#C85E3A" opacity="0.8"/>
                <rect x="132" y="148" width="30" height="4" rx="2" fill="#2DD4BF" opacity="0.6"/>
                <rect x="80" y="158" width="70" height="4" rx="2" fill="#8B98B0" opacity="0.5"/>
                <rect x="76" y="168" width="40" height="4" rx="2" fill="#2DD4BF" opacity="0.8"/>
                <rect x="122" y="168" width="50" height="4" rx="2" fill="#C85E3A" opacity="0.5"/>
                <rect x="80" y="178" width="60" height="4" rx="2" fill="#8B98B0" opacity="0.4"/>
                <rect x="76" y="188" width="45" height="4" rx="2" fill="#2DD4BF" opacity="0.6"/>
                <rect x="70" y="234" width="120" height="18" rx="3" fill="#1F2D45"/>
                <rect x="76" y="238" width="14" height="6" rx="1" fill="#0B0F1A"/>
                <rect x="94" y="238" width="14" height="6" rx="1" fill="#0B0F1A"/>
                <rect x="112" y="238" width="14" height="6" rx="1" fill="#0B0F1A"/>
                <rect x="130" y="238" width="14" height="6" rx="1" fill="#0B0F1A"/>
                <rect x="148" y="238" width="14" height="6" rx="1" fill="#0B0F1A"/>
                <rect x="80" y="246" width="100" height="4" rx="1" fill="#0B0F1A"/>
                <rect x="100" y="60" width="60" height="75" rx="8" fill="#1F2D45" stroke="#2D3B55" strokeWidth="1.5"/>
                <ellipse cx="130" cy="52" rx="28" ry="30" fill="#D4A574"/>
                <ellipse cx="130" cy="30" rx="28" ry="15" fill="#2C1810"/>
                <rect x="102" y="22" width="56" height="20" rx="8" fill="#2C1810"/>
                <ellipse cx="102" cy="52" rx="6" ry="8" fill="#C49060"/>
                <ellipse cx="158" cy="52" rx="6" ry="8" fill="#C49060"/>
                <ellipse cx="120" cy="50" rx="5" ry="6" fill="white"/>
                <ellipse cx="140" cy="50" rx="5" ry="6" fill="white"/>
                <ellipse cx="121" cy="51" rx="3" ry="3.5" fill="#2C1810"/>
                <ellipse cx="141" cy="51" rx="3" ry="3.5" fill="#2C1810"/>
                <rect x="112" y="44" width="16" height="13" rx="4" fill="none" stroke="#2DD4BF" strokeWidth="1.5"/>
                <rect x="132" y="44" width="16" height="13" rx="4" fill="none" stroke="#2DD4BF" strokeWidth="1.5"/>
                <line x1="128" y1="50" x2="132" y2="50" stroke="#2DD4BF" strokeWidth="1.5"/>
                <line x1="112" y1="50" x2="108" y2="48" stroke="#2DD4BF" strokeWidth="1.5"/>
                <line x1="148" y1="50" x2="152" y2="48" stroke="#2DD4BF" strokeWidth="1.5"/>
                <path d="M 120 62 Q 130 70 140 62" stroke="#8B5E3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M 90 130 L 85 95 Q 100 85 130 83 Q 160 85 175 95 L 170 130 Z" fill="#1F3864"/>
                <circle cx="130" cy="108" r="8" fill="none" stroke="#C85E3A" strokeWidth="1.5"/>
                <text x="126" y="112" fontFamily="monospace" fontSize="8" fill="#C85E3A">⚙</text>
                <path d="M 85 95 L 72 125 Q 68 130 75 132 L 92 115 Z" fill="#1F3864"/>
                <path d="M 175 95 L 188 125 Q 192 130 185 132 L 168 115 Z" fill="#1F3864"/>
                <ellipse cx="76" cy="133" rx="9" ry="7" fill="#D4A574"/>
                <ellipse cx="184" cy="133" rx="9" ry="7" fill="#D4A574"/>
                <rect x="196" y="210" width="24" height="26" rx="3" fill="#C85E3A"/>
                <path d="M 220 218 Q 228 218 228 223 Q 228 228 220 228" stroke="#8A3D22" strokeWidth="2" fill="none"/>
                <rect x="200" y="206" width="16" height="4" rx="1" fill="#8A3D22"/>
                <path d="M 204 202 Q 206 196 204 190" stroke="#8B98B0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M 210 200 Q 212 194 210 188" stroke="#8B98B0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
                <text x="20" y="80" fontFamily="monospace" fontSize="11" fill="#C85E3A" opacity="0.6">fn()</text>
                <text x="210" y="70" fontFamily="monospace" fontSize="10" fill="#2DD4BF" opacity="0.6">{}</text>
                <text x="15" y="170" fontFamily="monospace" fontSize="9" fill="#2DD4BF" opacity="0.4">async</text>
                <text x="218" y="160" fontFamily="monospace" fontSize="9" fill="#C85E3A" opacity="0.4">⚡</text>
              </svg>
            </div>

            <div className="absolute -bottom-5 -right-5 bg-[#111827] border border-[#1F2D45] px-5 py-3 rounded z-30">
              <div className="font-mono text-[0.65rem] text-[#8B98B0] uppercase tracking-[0.08em] mb-0.5">Status</div>
              <div className="text-base font-bold text-[#2DD4BF]">Open to work</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="font-mono text-[0.75rem] text-[#2DD4BF] tracking-[0.15em] uppercase mb-3 flex items-center gap-3">
            About Me
            <span className="w-10 h-px bg-[#0F766E]" />
          </div>

          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-5">
            Engineer who ships,<br />not just codes
          </h2>

          <p className="text-[#8B98B0] leading-relaxed mb-4 text-[0.97rem]">
            I'm Akmad Nudin, a Full Stack Engineer based in Indonesia with 5+ years of experience
            building systems that run in production for real businesses — not just demos.
          </p>

          <p className="text-[#8B98B0] leading-relaxed mb-4 text-[0.97rem]">
            I started my career as a Senior Programmer at PT. Jaygee Group in 2019, building
            attendance and web systems. From there I grew into leading full product development —
            POS systems for restaurants, HRIS for HR automation, and real-time data pipelines
            across multi-branch companies. Today I work at PT. Indobara Bahana managing
            internal systems and Oracle NetSuite ERP integration.
          </p>

          <p className="text-[#8B98B0] leading-relaxed mb-4 text-[0.97rem]">
            Outside of work hours, I'm deep in Rust and Axum — building type-safe, performant
            REST APIs. That's the direction I'm deliberately heading next.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-8">
            {[
              'Based in Indonesia',
              'Available for remote freelance',
              'Speaks Indonesian & English',
              'Currently learning Rust/Axum',
              'ERP: Oracle NetSuite, Odoo',
              '50% DP to start projects',
            ].map((fact) => (
              <div key={fact} className="flex items-start gap-2.5 text-sm text-[#8B98B0]">
                <span className="text-[#C85E3A] font-mono text-[0.8rem] flex-shrink-0 mt-0.5">▸</span>
                {fact}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;