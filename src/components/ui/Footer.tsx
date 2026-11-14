import { TypingAnimation } from "@components/atom/TypingAnimation";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  const { config } = useResponsive();
  const tahun = new Date().getFullYear();
  return (
    <footer className={config.footer.box}>
      <div className={`footer-copy ${config.footer.label}`}>
        © {tahun} Akmad Nudin. All rights reserved.
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link to="/">Home</Link>
        <Link to="/project-list">Projects</Link>
        <Link to="/experience">Experience</Link>
        <a href="mailto:akmadnudin.inc@gmail.com">Contact</a>
        <a href="https://github.com/adex-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/akmadnudin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
      <div className={`footer-right  ${config.footer.label}`}>
        <TypingAnimation />
      </div>
    </footer>
  );
};

export default Footer;
