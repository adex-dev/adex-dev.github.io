import { Beam } from "@components/beam";
import { useResponsive } from "@responsive/useResponsive";
import React, { useEffect } from "react";
import php from '@assets/php.svg'
import linux from '@assets/linux.svg'

const Hero: React.FC = () => {
  const { config, width, height, breakpoint } = useResponsive();
  useEffect(() => {
    console.log({
      width,
      height,
      breakpoint,
    });
  }, [width, height, breakpoint]);
  return (
    <section className={`hero ${config.hero.box}`}>
      <div className='bg-dots'></div>
      <div className='bg-dots-br'></div>
      <div className='bg-notches'>
        <span className='bg-notch'></span>
        <span className='bg-notch'></span>
        <span className='bg-notch'></span>
        <span className='bg-notch'></span>
        <span className='bg-notch'></span>
      </div>
      <div className='hero-left'>
        <div className={`hero-eyebrow ${config.hero.eyebrow}`}>
          Full Stack Engineer · Indonesia
        </div>
        <h1 className={`hero-name ${config.hero.title}`}>
          <span className={`hero-name-first ${config.hero.first}`}>Akmad</span>
          <span className={`hero-name-last ${config.hero.last}`}>nudiN</span>
        </h1>
        <p className={`hero-role ${config.hero.subtitle}`}>
          Building systems that <strong>actually work at scale</strong>
        </p>
        <p className={`hero-desc ${config.hero.desc}`}>
          5+ years delivering production-grade web systems end to end — from
          REST APIs and ERP integrations to responsive frontends and
          containerized deployments.
        </p>
        <div className={`hero-rust-badge ${config.hero.rustBadge}`}>
          Currently deep-diving Rust + Axum
        </div>
        <div className={`hero-cta ${config.hero.heroCTA}`}>
          <Beam variant='rust'>
            <a
              href='#projects'
              className={`btn-glow glow-rust ${config.button.buttonHero}`}
            >
              View Projects →
            </a>
          </Beam>
          <Beam variant='teal'>
            <a
              href='#contact'
              className={`btn-outline-grad ${config.button.buttonOutline} border-teal hover:border-transparent  ${config.button.buttonHero}`}
            >
              Let's Work Together
            </a>
          </Beam>
        </div>
      </div>
      <div className={`hero-right ${config.hero.right}`}>
        <div className={`orb ${config.hero.orb}`}></div>
        <div className={`orb-ring ${config.hero.ring}`}></div>
        <div className={`orb-ring-2 ${config.hero.ring2}`}></div>

        <div className={`term-card-back ${config.hero.termCardBack}`}></div>

        <div className={`term-card ${config.hero.termCard}`}>
          <div className='term-bar'>
            <span className='term-dot r'></span>
            <span className='term-dot y'></span>
            <span className='term-dot g'></span>
            <span className='term-title'>akmad@dev ~ bash</span>
          </div>
          <div className='term-body'>
            <div className='type-1'>
              <span className='t-prompt'>›</span>&nbsp;
              <span className='t-cmd'>deploy</span>&nbsp;
              <span className='t-flag'>--prod</span>
            </div>
            <div className='type-2'>
              <span className='t-output info'>▸ Building Docker image...</span>
            </div>
            <div className='type-3'>
              <span className='t-output ok'>✓ Image built in 12.4s</span>
            </div>
            <div className='type-4'>
              <span className='t-output ok'>✓ Container deployed</span>
            </div>
            <div className='type-5'>
              <span className='t-output info'>▸ Running on :3000</span>&nbsp;
              <span className='t-cursor'></span>
            </div>
          </div>
        </div>
      </div>
      <div className={`scroll-hint ${config.hero.scrollHint}`}>
        <div className='scroll-line'></div>
        Scroll to explore
      </div>
      <div className="stack-bar">
    <div className="stack-item">
      <svg className="stack-icon" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="26" fill="#C85E3A"/>
        <text x="26" y="33" fontFamily="monospace" fontSize="18" fontWeight="700"
              fill="white" textAnchor="middle">R</text>
      </svg>
      <span className="stack-name">Rust</span>
    </div>
    <div className="stack-item">
      <svg className="stack-icon" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="26" fill="#0D1220"/>
        <circle cx="26" cy="26" r="4.5" fill="#61DAFB"/>
        <ellipse cx="26" cy="26" rx="20" ry="8" stroke="#61DAFB" strokeWidth="1.8" fill="none"/>
        <ellipse cx="26" cy="26" rx="20" ry="8" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(60 26 26)"/>
        <ellipse cx="26" cy="26" rx="20" ry="8" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(120 26 26)"/>
      </svg>
      <span className="stack-name">React</span>
    </div>
    <div className="stack-item">
      <svg className="stack-icon" viewBox="0 0 52 52" fill="none">
        <rect width="52" height="52" rx="8" fill="#3178C6"/>
        <text x="26" y="35" fontFamily="monospace" fontSize="16" fontWeight="700"
              fill="white" textAnchor="middle">TS</text>
      </svg>
      <span className="stack-name">TypeScript</span>
    </div>
    <div className="stack-item">
      <svg className="stack-icon" viewBox="0 0 52 52" fill="none">
        <rect width="52" height="52" rx="8" fill="#0D1220"/>
        <path d="M8 26 C12 18 24 16 36 20 C42 22 46 28 44 34"
              stroke="#2496ED" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="16" y="22" width="7" height="6" rx="1.5" fill="#2496ED"/>
        <rect x="24" y="22" width="7" height="6" rx="1.5" fill="#2496ED"/>
        <rect x="20" y="16" width="7" height="6" rx="1.5" fill="#2496ED"/>
      </svg>
      <span className="stack-name">Docker</span>
    </div>
    <div className="stack-item">
      <svg className="stack-icon" viewBox="0 0 52 52" fill="none">
        <rect width="52" height="52" rx="8" fill="#0D1220"/>
        <ellipse cx="26" cy="18" rx="13" ry="5" stroke="#336791" strokeWidth="2" fill="#336791" fillOpacity="0.3"/>
        <path d="M13 18 L13 34 C13 37 19 40 26 40 C33 40 39 37 39 34 L39 18"
              stroke="#336791" strokeWidth="2" fill="none"/>
        <ellipse cx="26" cy="18" rx="13" ry="5" stroke="#336791" strokeWidth="2" fill="none"/>
      </svg>
      <span className="stack-name">PostgreSQL</span>
    </div>
    <div className="stack-item">
      <svg className="stack-icon" viewBox="0 0 52 52" fill="none">
        <rect width="52" height="52" rx="8" fill="#0D1220"/>
        <path d="M20 10 C16 10 14 13 14 16 L14 22 L26 22 L26 24 L10 24 C10 24 6 25 6 32 C6 39 10 40 14 40 L18 40 L18 34 C18 31 20 28 26 28 L36 28 C40 28 42 25 42 22 L42 16 C42 13 40 10 36 10 Z" fill="#3776AB" fillOpacity="0.7"/>
        <path d="M32 42 C36 42 38 39 38 36 L38 30 L26 30 L26 28 L42 28 C42 28 46 27 46 20 C46 13 42 12 38 12 L34 12 L34 18 C34 21 32 24 26 24 L16 24 C12 24 10 27 10 30 L10 36 C10 39 12 42 16 42 Z" fill="#FFD43B" fillOpacity="0.7"/>
        <circle cx="20.5" cy="16" r="2" fill="#FFD43B"/>
        <circle cx="31.5" cy="36" r="2" fill="#3776AB"/>
      </svg>
      <span className="stack-name">Python</span>
    </div>
    <div className="stack-item">
      <img className="stack-icon" src={php} alt="php" />
      <span className="stack-name">Php</span>
    </div>
    <div className="stack-item">
      <img className="stack-icon" src={linux} alt="php" />
      <span className="stack-name">Linux</span>
    </div>

  </div>
    </section>
  );
};

export default Hero;
