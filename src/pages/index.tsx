import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import Typed from "typed.js";
import Github from "../../static/img/github.svg?react";
import Linkedin from "../../static/img/linkedin.svg?react";

export default function Home(): JSX.Element {
  const typedElement = useRef<HTMLSpanElement | null>(null);

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!typedElement.current) return;
    const typed = new Typed(typedElement.current, {
      strings: [" whois akmadnudin -h"],
      typeSpeed: 45,
      startDelay: 800,
      showCursor: true,
      contentType: "null",
      cursorChar: "█",
      onComplete: () => {
        setTimeout(() => {
          setShowDetails(true);
        }, 1200);
      },
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Layout title="sudo Akmad Nudin" description="Terminal style portfolio">
      <main className="terminal-page">
        <div className="terminal-window">
          <div className="terminal-header">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="terminal-actions">
                <span className="red" />
                <span className="yellow" />
                <span className="green" />
              </div>

              <div className="terminal-title">
                <span>Akmad Nudin</span>
              </div>
            </div>
            <div className="terminal-navbar">
              <button>projects</button>
              <a className="l_nav" href="https://adex-dev.github.io/my-books">
                Hand book
              </a>
            </div>
          </div>

          {/* body */}
          <div className="terminal-body">
            <div className="command-line">
              <span className="user">sudo@akmadnudin</span>
              <span className="separator">:</span>
              <span className="path">~$ </span>
              <span ref={typedElement} />
            </div>
            {showDetails && (
              <div className="terminal-content fade-in">
                <div className="neofetch-wrapper">
                  <div className="logo-wrapper">
                    <img
                      src="/img/logo.svg"
                      alt="sudo heimey"
                      className="logo-image"
                    />
                  </div>
                  <article className="system-info">
                    <div>
                      <span className="label">Akmad Nudin</span>
                    </div>
                    <div className="separator">------------------------</div>
                    <div className="specs">
                      <h3 className="label">Role</h3>
                      <p className="value">Fullstack Engineer</p>
                      <h3 className="label">Experience</h3>
                      <p className="value">6+ Years</p>
                      <h3 className="label">Frontend</h3>
                      <p className="value">React,Tailwindcss</p>
                      <h3 className="label">Backend</h3>
                      <p className="value">
                        Go, Rust (Axum), PHP (CodeIgniter, Native), Python Web
                        (flask)
                      </p>
                      <h3 className="label">Mobile</h3>
                      <p className="value">
                        Android (Jetpack Compose, Flutter)
                      </p>
                      <h3 className="label">AI LLM</h3>
                      <p className="value">Ollama</p>
                      <h3 className="label">Database</h3>
                      <p className="value">PostgreSQL, MySQL</p>
                      <h3 className="label">DevOps</h3>
                      <p className="value">Docker, Linux, Windows</p>
                      <h3 className="label">Tools</h3>
                      <p className="value">Git, Zsh</p>
                      <h3 className="label">Focus</h3>
                      <p className="value">Backend System + Automation</p>
                      <h3 className="label">Learning</h3>
                      <p className="value">Rust & Distributed Systems</p>
                      <h3 className="label">Currently</h3>
                      <p className="value">Building Scalable Infrastructure</p>
                      <h3 className="label">Location</h3>
                      <p className="value">Indonesia</p>
                      <h3 className="label">Find Me</h3>
                      <div className="value sosmed-header">
                        <Github
                          onClick={() =>
                            (window.location.href =
                              "https://github.com/adex-dev")
                          }
                        />
                        <Linkedin
                          onClick={() =>
                            (window.location.href =
                              "https://www.linkedin.com/in/akmadnudin/")
                          }
                        />
                      </div>
                      <h3 className="label">Lets Work Together</h3>
                      <p className="value">
                        <a href="#" download className="user">
                          Download Portfolio
                        </a>
                      </p>
                    </div>
                  </article>
                </div>

                <article className="sections">
                  <div className="section-card">
                    <h3 className="section-title">[ about ]</h3>
                    <p>
                      I’m Akmad Nudin, a Fullstack Engineer focused on building
                      scalable backend and web systems. My work spans system
                      design, API development, and application delivery for
                      real-world use cases.
                      <br /> Here you’ll find case studies, technical projects,
                      and my professional background.
                    </p>
                    <p>
                      I build web, backend, and Android applications with a
                      strong focus on system reliability.
                    </p>
                  </div>
                  <div className="section-card">
                    <h3 className="section-title">[ Experience ]</h3>
                    <div className="experience">
                      <div className="experience-item">
                        <h4 className="company">PT Example Teknologi</h4>

                        <p className="position">
                          Senior Fullstack Engineer
                        </p>
                        <p className="period">Jan 2023 - Present</p>
                        <ul>
                          <li>
                            Built scalable backend services using Go and
                            PostgreSQL.
                          </li>

                          <li>Reduced API response time by 40%.</li>

                          <li>Designed CI/CD pipelines with Docker.</li>
                        </ul>
                      </div>
                      <div className="experience-item">
                        <h3 className="company">PT Startup Indonesia</h3>

                        <h4 className="position">Backend Engineer</h4>

                        <p className="period">2021 - 2023</p>

                        <ul>
                          <li>Developed RESTful APIs with Node.js.</li>

                          <li>Managed PostgreSQL databases.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="section-card">
                    <h3 className="section-title">[ What I Do ]</h3>
                    <ol className="process-list">
                      <li>
                        Understand the business problem and workflow
                        <h4 className="position">
                          {" "}
                          Business systems, admin dashboards, and internal
                          tools.
                        </h4>
                      </li>
                      <li>
                        Backend & APIs
                        <h4 className="position">
                          Business systems, admin dashboards, and internal
                          tools.
                        </h4>
                      </li>
                      <li>
                        Android Applications
                        <h4 className="position">
                          Operational and client-facing Android apps..
                        </h4>
                      </li>
                    </ol>
                  </div>
                  <div className="section-card">
                    <h3 className="section-title">[ How I Work ]</h3>
                    <ol className="process-list">
                      <li>Understand the business problem and workflow</li>
                      <li>Design system architecture and API contracts</li>
                      <li>Build, test, and iterate</li>
                      <li>Deliver and provide support</li>
                    </ol>
                  </div>
                  <div className="section-card">
                    <h3 className="section-title">[ Education ]</h3>
                    <div className="experience">
                      <div className="experience-item">
                        <h4 className="company">
                          Universitas Indonesia Membangun (INABA)
                        </h4>
                        <p className="position">
                          Bachelor degree, Computer Science | Grade: 3.42 / 148
                          Credit
                        </p>
                        <p className="period">Sep 2018 – Feb 2022</p>
                      </div>
                      <div className="experience-item">
                        <h3 className="company">
                          [1] Designing an E-Commerce Information System for
                          Motorcycle Repair Small and Medium Enterprises (SMEs)
                        </h3>
                        <h4 className="position">Backend Engineer</h4>
                        <p className="period">Undergraduate Thesis, 2023</p>
                      </div>
                      <div className="experience-item">
                        <h3 className="company">[2] Publication URL:</h3>
                        <p className="position">
                          <a
                            href="https://www.researchgate.net/publication/372970069_SISTEM_INFORMASI_E-COMMERCE_untuk_UMKM_SEPEDA_MOTOR_BERBASIS_WEB"
                            target="_blank">
                            https://www.researchgate.net/publication/372970069_SISTEM_INFORMASI_E-COMMERCE_untuk_UMKM_SEPEDA_MOTOR_BERBASIS_WEB
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
