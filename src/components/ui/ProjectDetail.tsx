import React from "react";
import { Sections, CodeBlock } from "@components/atom";
import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { useResponsive } from "@responsive/useResponsive";
import sample from "@assets/sample.png";
const ProjectDetail: React.FC = () => {
  const { config } = useResponsive();
  const { id } = useParams();
  const features = [
    "JWT-based authentication with token refresh",
    "PostgreSQL via SQLx (async, compile-time checked queries)",
    "Modular router with Axum middleware layers",
    "Structured error handling and request validation",
    "Docker + docker-compose for dev/prod parity",
    "Environment-based config management",
  ];
  const challenges = [
    {
      c: "Rust's borrow checker and async model have a steep learning curve — especially combining Axum extractors with SQLx async queries in the same handler.",
      s: "Broke the problem into small isolated experiments first (just auth → just DB → combined), then integrated progressively. Compiler errors became guides.",
    },
    {
      c: "Structuring a scalable Axum project without ending up with one massive main.rs.",
      s: "Adopted a layered module structure: routes → handlers → services → repositories → models. Each layer has one clear responsibility.",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Wdms</title>
        <meta
          name="description"
          content="Detailed case studies: WDMS, HRIS, POS System, Rust REST API. Challenges, solutions, tech stack, and measurable results."
          key="desc"
        />
        <meta
          name="keywords"
          content="akmadnudin,Project Detail,Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia"
          key="kw"
        />
        ,
      </Helmet>
      <div className="breadcrump-project">
        <Link to="/">Home</Link>
        <span className="breadcrump-sep">/</span>
        <Link to="/project-list">Project</Link>
        <span className="breadcrump-sep">/</span>
        <span id="bc-title">WDMS — Web Data Management System</span>
      </div>
      <Sections
        id="projectsDetail"
        className={`default-section ${config.section.default} detail-hero-project mb-0! pb-0.5! h-auto!`}>
        <div className="box-eyebrow-poject">
          <div className="eyebrow-project-left">
            <div className="eyebrow-project-type">
              <span className="project-type-dot prod" id="p-type-dot"></span>
              <span id="p-type">Production · PT. Sanggar Catur Utama</span>
            </div>
            <h2
              className={`${config.standard.header} mb-0.5! tracking-[-0.03em]! text-[2rem]!`}>
              WDMS — Web Data Management System
            </h2>
            <p
              className={`${config.standard.desc} text-xs! max-w-[600px]! leading-1.7`}>
              Real-time fingerprint data collection from 20+ branches into a
              centralized server — integrated with HRIS for attendance and
              payroll processing.
            </p>
          </div>
          <div className="eyebrow-project-status">
            <span>Live in Production</span>
          </div>
        </div>
        <div className="preview-wrap">
          <div className="browser-chrome">
            <div className="b-dots">
              <div className="b-dot r"></div>
              <div className="b-dot y"></div>
              <div className="b-dot g"></div>
            </div>
            <div className="browser-bar">
              <p>wdms.internal.company.id/dashboard</p>
            </div>
          </div>
          <div className="preview-screens">
            <img
              src={sample}
              className="w-full h-full absolute"
              alt="wdms sample"
            />
          </div>
        </div>
      </Sections>
      <div className="detail-body">
        <div className="detail-main">
          <section>
            <h2>Overview</h2>
            <p>
              A deliberate deep-dive into Rust and the Axum web framework. The
              project implements a full REST API with authentication, database
              persistence, middleware layers, and containerization — all in a
              language that enforces correctness at compile time.
            </p>
          </section>
          <section>
            <h2>Problem Being Solved</h2>
            <p>
              Most backend frameworks abstract away what matters at scale —
              memory, thread safety, and performance. This project was built to
              understand what 'zero-cost abstractions' actually means in
              practice, and to develop real Rust proficiency by shipping
              something.
            </p>
          </section>
          <section>
            <h2>Key Features</h2>
            <ul>
              {features.map((f, fi) => {
                return <li key={fi}>${f}</li>;
              })}
            </ul>
          </section>
          <section>
            <h2>Challenges & Solutions</h2>
            {challenges.map((ch, cc) => {
              return (
                <div key={cc} className="cs-grid">
                  <div className="cs-card">
                    <div className="cs-label c">⚠ Challenge</div>
                    <div className="cs-text">${ch.c}</div>
                  </div>
                  <div className="cs-card">
                    <div className="cs-label s">✓ Solution</div>
                    <div className="cs-text">${ch.s}</div>
                  </div>
                </div>
              );
            })}
          </section>
          <section>
            <h2>Technical Implementation</h2>
            <p>
              Clean separation of concerns across layers — routing, business
              logic, and data access kept deliberately distinct for
              maintainability.
            </p>
            <div className="code-block">
              <div className="code-bar">
                <div className="code-dots">
                  <div className="cd r"></div>
                  <div className="cd y"></div>
                  <div className="cd g"></div>
                </div>
                <span className="code-fname">src/handlers/auth.rs</span>
              </div>
              <div className="code-body">
                <CodeBlock language="python">
                  {`# Normalize fingerprint data from multiple vendors
@app.route('/api/v1/sync', methods=['POST'])
def sync_fingerprint_data():
    payload    = request.get_json()
    branch_id  = payload.get('branch_id')
    dev_type   = payload.get('device_type')
    normalized = DeviceAdapter.normalize(dev_type, payload)
    records    = db.bulk_insert(normalized.records)
    hris_sync.queue_update(branch_id, records)
    return jsonify({'synced': len(records)})`}
                </CodeBlock>
              </div>
            </div>
          </section>
          <section>
            <h2>Results</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-val">3yr</div>
                <div className="metric-label">Maintained</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">All</div>
                <div className="metric-label">Branches covered</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">Auto</div>
                <div className="metric-label">Monthly realization</div>
              </div>
            </div>
            <p style={{ marginTop: "1rem" }}>
              Digitized attendance management across all branches. Monthly
              realization now runs automatically. Maintained 3 years, then
              superseded by the more advanced WDMS+HRIS integration.
            </p>
          </section>
        </div>
        <div className="detail-sidebar">
          <div className="s-card">
            <span className="s-card-title">Project Info</span>
            <div id="p-info">
              <div className="info-row">
                <span className="i-label">Client</span>
                <span className="i-val">PT. Sanggar Catur Utama</span>
              </div>
              <div className="info-row">
                <span className="i-label">Year</span>
                <span className="i-val">2022 — 2025</span>
              </div>
              <div className="info-row">
                <span className="i-label">Duration</span>
                <span className="i-val">3 months build · 3 yrs production</span>
              </div>
              <div className="info-row">
                <span className="i-label">Role</span>
                <span className="i-val">Lead Developer</span>
              </div>
              <div className="info-row">
                <span className="i-label">Category</span>
                <span className="i-val">Full Stack · Integration</span>
              </div>
              <div className="info-row">
                <span className="i-label">Status</span>
                <span className="i-val">
                  <span className="i-val teal">● Live</span>
                </span>
              </div>
            </div>
          </div>
          <div className="s-card">
            <span className="s-card-title">Tech Stack</span>
            <div className="card-stack" id="p-stack">
              <span className={`card-tag ${config.standard.tag} rust`}>
                Python Flask
              </span>
              <span className={`card-tag ${config.standard.tag}`}>
                Tailwind CSS
              </span>
              <span className={`card-tag ${config.standard.tag}`}>MySQL</span>
              <span className={`card-tag ${config.standard.tag}`}>
                IP Public
              </span>
              <span className={`card-tag ${config.standard.tag}`}>Linux</span>
              <span className={`card-tag ${config.standard.tag} gray`}>
                HRIS Sync
              </span>
            </div>
          </div>
          <div className="s-card">
            <span className="s-card-title">Impact</span>
            <div id="p-impact">
              <div className="info-row">
                <span className="i-label">Branches connected</span>
                <span className="i-val teal">20+</span>
              </div>
              <div className="info-row">
                <span className="i-label">HR saved/month</span>
                <span className="i-val teal">8h</span>
              </div>
              <div className="info-row">
                <span className="i-label">Zero major incidents</span>
                <span className="i-val teal">3yr</span>
              </div>
            </div>
          </div>
          <div className="s-card">
            <span className="s-card-title">Interested in similar work?</span>
            <div className="sidebar-cta">
              <a href="mailto:akmadnudin.inc@gmail.com" className="btn-p">
                ✉ Contact Me
              </a>
              <a href="services.html" className="btn-o">
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="related-section">
          <h2>Other Project</h2>
          <div className="related-grid" id="p-related">
            <div className="rc beam beam-rust" onclick="navigate('hris')">
              <div className="rc-type">
                Production · PT. Sanggar Catur Utama
              </div>
              <div className="rc-name">
                HRIS — Human Resources Information System
              </div>
              <div className="card-stack">
                <span className={` card-tag ${config.standard.tag} `}>CodeIgniter</span>
                <span className={` card-tag ${config.standard.tag} `}>Bootstrap</span>
                <span className={` card-tag ${config.standard.tag} `}>MySQL</span>
              </div>
            </div>
            <div className="rc beam beam-rust" onclick="navigate('pos')">
              <div className="rc-type">
                Production · Isoide &amp; Nahm Restaurant
              </div>
              <div className="rc-name">
                POS System — Isoide &amp; Nahm Restaurant
              </div>
              <div className="card-stack">
                <span className={`card-tag ${config.standard.tag}`}>Python Flask</span>
                <span className={`card-tag ${config.standard.tag}`}>PHP</span>
                <span className={`card-tag ${config.standard.tag}`}>MySQL</span>
              </div>
            </div>
            <div className="rc beam beam-rust" onclick="navigate('rust-axum')">
              <div className="rc-type">Personal Project · 2024</div>
              <div className="rc-name">REST API Backend — Rust &amp; Axum</div>
              <div className="card-stack">
                <span className={`card-tag ${config.standard.tag} rust`}>Rust</span>
                <span className={`card-tag ${config.standard.tag} rust`}>Axum</span>
                <span className={`card-tag ${config.standard.tag} `}>PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
