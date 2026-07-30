import { Beam } from "@components/beam";
import { useResponsive } from "@responsive/useResponsive";
import React, { useEffect } from "react";

const Hero: React.FC = () => {
  const { config,width,height,breakpoint } = useResponsive();
  useEffect(() => {
    console.log({
      width,
      height,
      breakpoint,
    });
  }, [width, height, breakpoint]);
  return (
    <section className={`hero ${config.hero.box} ${config.section.wrapper}`}>
      <div className={`hero-eyebrow ${config.hero.eyebrow}`}>Full Stack Engineer · Indonesia</div>
      <h1 className={`hero-name ${config.hero.title}`}>
        Akmad<span>Nudin</span>
      </h1>
      <p className={`hero-role ${config.hero.subtitle}`}>
        Building systems that <strong>actually work at scale</strong>
      </p>
      <p className={`hero-desc ${config.hero.desc}`}>
        5+ years delivering production-grade web systems end to end — from REST
        APIs and ERP integrations to responsive frontends and containerized
        deployments.
      </p>
      <div className={`hero-rust-badge ${config.hero.rustBadge}`}>Currently deep-diving Rust + Axum</div>
      <div className={`hero-cta ${config.hero.heroCTA}`}>
        <Beam variant="rust">
          <a href="#projects" className={`btn-glow glow-rust ${config.button.buttonHero}`}>
            View Projects →
          </a>
          </Beam>
       <Beam variant="dual">
        <a href="#contact" className={`btn-outline-grad glow-purple! ${config.button.buttonHero}`}>
          Let's Work Together
        </a>
        </Beam>
      </div>
      <div className={`scroll-hint ${config.hero.scrollHint}`}>
        <div className="scroll-line"></div>
        Scroll to explore
      </div>
    </section>
  );
};

export default Hero;
