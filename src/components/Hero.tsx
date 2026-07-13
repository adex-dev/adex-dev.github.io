import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero">
  <div className="hero-eyebrow">Full Stack Engineer · Indonesia</div>
  <h1 className="hero-name">Akmad<br></br><span>Nudin</span></h1>
  <p className="hero-role">Building systems that <strong>actually work at scale</strong></p>
  <p className="hero-desc">
    5+ years delivering production-grade web systems end to end —
    from REST APIs and ERP integrations to responsive frontends and containerized deployments.
  </p>
  <div className="hero-rust-badge">Currently deep-diving Rust + Axum</div>
  <div className="hero-cta">
    <a href="#projects" className="btn-primary">View Projects →</a>
    <a href="#contact" className="btn-outline">Let's Work Together</a>
  </div>
  <div className="scroll-hint">
    <div className="scroll-line"></div>
    Scroll to explore
  </div>
</section>
  );
};

export default Hero;