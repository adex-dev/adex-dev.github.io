import React from "react";
import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";

const Contact: React.FC = () => {
  const { config } = useResponsive();
  return (
    <>
      <Sections id="contact" className={`text-center mt-4 ${config.section.contact}`}>
        <span className={`eyebrow justify-center ${config.standard.eyebrow}`}>
          Get in touch
        </span>
        <h2 className={`contact-big ${config.contact.big}`}>
          Let's build
          <br />
          something <span className="text-rust!">real</span>
        </h2>

        <p className={`contact-sub ${config.contact.sub}`}>
          Open to freelance projects, contract roles, and full-time
          opportunities.
        </p>

        <div className={`contact-links ${config.contact.link}`}>
          <div className="link-wrapper beam beam-teal">
            <a href="mailto:akmadnudin.inc@gmail.com" className="contact-link">
              ✉ akmadnudin.inc@gmail.com
            </a>
          </div>
          <div className="link-wrapper beam beam-teal">
            <a
              href="https://www.linkedin.com/in/akmadnudin"
              className="contact-link">
              in LinkedIn
            </a>
          </div>
          <div className="link-wrapper beam beam-teal">
            <a href="https://github.com/adex-dev" className="contact-link">
              {"{ }"} GitHub
            </a>
          </div>
          <div className="link-wrapper beam beam-teal">
            <a href="https://akmadnudin.com" className="contact-link">
              ↗ akmadnudin.com
            </a>
          </div>
        </div>
        <Divider />
      </Sections>
    </>
  );
};

export default Contact;
