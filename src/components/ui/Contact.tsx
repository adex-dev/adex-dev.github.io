import { Divider, Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import React from "react";

const Contact: React.FC = () => {
  const { config } = useResponsive();
  return (
    <>
      <Sections
        id='contact'
        className={`${config.section.wrapper} h-auto! default-section text-center ${config.section.default}`}
      >
           <div className={`section-tag reveal justify-center ${config.section.tag}`}>
        <span className={`section-tag-icon ${config.section.icon}`}>📩</span>
        <span className={`section-tag-text ${config.section.text}`}>Get in touch</span>
        <span className='section-tag-line'></span>
      </div>
        <h2 className={`contact-big ${config.contact.big}`}>
          Let's build
          <br />
          something <span className='text-rust!'>real</span>
        </h2>

        <p className={`contact-sub ${config.contact.sub}`}>
          Open to freelance projects, contract roles, and full-time
          opportunities.
        </p>

        <div className={`contact-links ${config.contact.link}`}>
          <div className='link-wrapper beam beam-teal'>
            <a href='mailto:akmadnudin.inc@gmail.com' className='contact-link'>
              ✉ akmadnudin.inc@gmail.com
            </a>
          </div>
          <div className='link-wrapper beam beam-teal'>
            <a
              href='https://www.linkedin.com/in/akmadnudin'
              className='contact-link'
            >
              in LinkedIn
            </a>
          </div>
          <div className='link-wrapper beam beam-teal'>
            <a href='https://github.com/adex-dev' className='contact-link'>
              {"{ }"} GitHub
            </a>
          </div>
          <div className='link-wrapper beam beam-teal'>
            <a href='https://akmadnudin.com' className='contact-link'>
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
