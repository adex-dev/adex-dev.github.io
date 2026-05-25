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
      strings: [" me -h"],
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
                @copyright akmadnudin.com 2025
              </div>
            </div>
            <div className="terminal-navbar">
              <button>projects</button>
              <a className="l_nav" href="https://adex-dev.github.io/my-books">Hand book</a>
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
                  <div className="system-info">
                    <div>
                      <span className="label">Akmad Nudin</span>
                    </div>
                    <div className="separator">------------------------</div>
                    <div>Role : Fullstack Engineer</div>
                    <div>
                      Stack : React, Go, Rust (Axum), PHP (CodeIgniter, Native), Python
                      Web (flask)
                    </div>
                    <div>Mobile : Android (Jetpack compose, Flutter)</div>
                    <div>Infra : Docker, Linux, PostgreSQL, MySQL</div>
                    <div>Tools : Git, Zsh, Tailwindcss</div>
                    <div>Focus : Backend System + Automation</div>
                    <div>Learning : Rust & Distributed Systems</div>
                    <div>Currently: Building scalable infrastructure</div>
                    <div>Location : Indonesia</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                    Find Me :{" "}
                    <div className="sosmed-header">
                    <Github />
                    <Linkedin />
                    </div>{" "}
                    </div>
                    <div>Let’s Work Together : <a href="#" download className="user">Download Portfolio</a></div>
                  </div>
                </div>

                <div className="sections">
                  <div
                    className="command-line"
                    style={{ marginBottom: "10px !important" }}>
                    <span className="user">sudo@akmadnudin</span>
                    <span className="separator">:</span>
                    <span className="path">~$ </span>
                    <span>about</span>
                  </div>
                  <div className="section-card">
                    <div className="section-title">[ about ]</div>
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
                   <div
                    className="command-line"
                    style={{ marginBottom: "10px !important",marginTop:"14px" }}>
                    <span className="user">sudo@akmadnudin</span>
                    <span className="separator">:</span>
                    <span className="path">~$ </span>
                    <span>how i work</span>
                  </div>
                  <div className="section-card">
                    <div className="section-title">[ How I Work ]</div>

                    <ol className="process-list">
                      <li>Understand the business problem and workflow</li>
                      <li>Design system architecture and API contracts</li>
                      <li>Build, test, and iterate</li>
                      <li>Deliver and provide support</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
