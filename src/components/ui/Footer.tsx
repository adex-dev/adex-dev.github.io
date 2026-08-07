import React from 'react';
import { useResponsive } from "@responsive/useResponsive";

const Footer: React.FC = () => {
    const { config } = useResponsive();
  return (
    <footer className={config.footer.box}>
      <div className={`footer-copy ${config.footer.label}`}>
        © 2025 Akmad Nudin. All rights reserved.
      </div>
      <div className={`footer-right ${config.footer.label}`}>
        Built with <span>♥</span>🦀 & Rust in progress
      </div>
    </footer>
  );
};

export default Footer;