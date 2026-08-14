import { TypingAnimation } from "@components/atom/TypingAnimation";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";

const Footer: React.FC = () => {
  const { config } = useResponsive();
  const tahun = new Date().getFullYear();
  return (
    <footer className={config.footer.box}>
      <div className={`footer-copy ${config.footer.label}`}>
        © 2025 - {tahun} Akmad Nudin. All rights reserved.
      </div>
      <div className={`footer-right  ${config.footer.label}`}>
        <TypingAnimation />
      </div>
    </footer>
  );
};

export default Footer;
