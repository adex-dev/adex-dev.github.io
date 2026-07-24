import { Beam } from "@components/beam";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-eyebrow">Full Stack Engineer · Indonesia</div>
      <h1 className="hero-name">
        Akmad<span>Nudin</span>
      </h1>
      <p className="hero-role">
        Building systems that <strong>actually work at scale</strong>
      </p>
      <p className="hero-desc">
        5+ years delivering production-grade web systems end to end — from REST
        APIs and ERP integrations to responsive frontends and containerized
        deployments.
      </p>
      <div className="hero-rust-badge">Currently deep-diving Rust + Axum</div>
      <div className="hero-cta">
        <Beam variant="rust">
          <a href="#projects" className="btn-glow glow-rust btn-hero">
            View Projects →
          </a>
          </Beam>
       <Beam variant="dual">
        <a href="#contact" className="btn-outline-grad  btn-hero glow-purple!">
          Let's Work Together
        </a>
        </Beam>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line"></div>
        Scroll to explore
      </div>
    </section>
  );
};

export default Hero;
