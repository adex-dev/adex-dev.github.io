import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact">
        <span className="section-eyebrow justify-center">
          Get in touch
        </span>

        <h2 className="contact-big">
          Let's build<br />something <span>real</span>
        </h2>

        <p className="contact-sub">
          Open to freelance projects, contract roles, and full-time opportunities.
        </p>

        <div className="contact-links">
          <a
            href="mailto:akmadnudin.inc@gmail.com"
            className="contact-link"
          >
            ✉ akmadnudin.inc@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/akmadnudin"
            className="contact-link"
          >
            in LinkedIn
          </a>
          <a
            href="https://github.com/adex-dev"
            className="contact-link"
          >
            {'{ }'} GitHub
          </a>
          <a
            href="https://akmadnudin.com"
            className="contact-link"
          >
            ↗ akmadnudin.com
          </a>
        </div>
    </section>
  );
};

export default Contact;