import { CardGlass, Sections } from "@components/atom";
import { Beam } from "@components/beam";
import React from "react";
const services = [
  {
    num: "01",
    icon: "{⚙}",
    title: "Backend & API Development",
    desc: "High-performance REST APIs and backend services built for production — secure, scalable, and well-documented.",
    items: [
      "REST API design & development",
      "JWT authentication & authorization",
      "Database design (PostgreSQL / MySQL)",
      "Python (FastAPI, Flask), Go, Rust/Axum",
    ],
    price: "RM 800 / project",
    highlight: false,
  },
  {
    num: "02",
    icon: "[◈]",
    title: "Full Stack Web Application",
    desc: "Complete web systems from database to UI — internal tools, dashboards, management systems, and more.",
    items: [
      "React + Tailwind CSS frontend",
      "Backend API & business logic",
      "Admin dashboard & reporting",
      "Docker deployment & CI/CD setup",
    ],
    price: "RM 1,500 / project",
    highlight: true,
  },
  {
    num: "03",
    icon: "[≡]",
    title: "ERP & System Integration",
    desc: "Connect your business systems — ERP platforms, third-party APIs, and legacy systems that need to talk to each other.",
    items: [
      "Oracle NetSuite integration",
      "Odoo customization & integration",
      "Third-party API integration",
      "Data sync & migration",
    ],
    price: "RM 1,200 / project",
    highlight: false,
  },
  {
    num: "04",
    icon: "[HR]",
    title: "HRIS & POS Systems",
    desc: "Specialized business systems built from real production experience — not generic templates.",
    items: [
      "HR & payroll automation",
      "Attendance tracking system",
      "Point of Sale (POS) system",
      "Multi-branch data management",
    ],
    price: "RM 2,000 / project",
    highlight: false,
  },
  {
    num: "05",
    icon: "[>>]",
    title: "DevOps & Deployment",
    desc: "Set up your infrastructure right from the start — containerized, automated, and ready to scale.",
    items: [
      "Docker containerization",
      "CI/CD pipeline setup",
      "Linux server configuration",
      "Performance optimization",
    ],
    price: "RM 600 / project",
    highlight: false,
  },
  {
    num: "06",
    icon: "[◉]",
    title: "Code Review & Consultation",
    desc: "Get expert eyes on your codebase, architecture decisions, or technical roadmap — before problems become expensive.",
    items: [
      "Code review & refactoring advice",
      "Architecture consultation",
      "Performance audit",
      "Tech stack recommendation",
    ],
    price: "RM 200 / session",
    highlight: false,
  },
];

const serviceIntroMaps = [
  {
    num: "01 — Discover",
    label: "Requirements",
    desc: "We discuss scope, goals, and tech constraints before anything else.",
  },
  {
    num: "02 — Agree",
    label: "Proposal + MOU",
    desc: "Fixed scope, timeline, and price. Signed before work begins.",
  },
  {
    num: "03 — Build",
    label: "Development",
    desc: "Progress updates 2x/week. You can ask questions anytime.",
  },
  {
    num: "04 — Ship",
    label: "Delivery + Handover",
    desc: "Full source code, docs, and 14-day bug warranty on delivery.",
  },
];
const Services: React.FC = () => {
  type BeamVariant = React.ComponentProps<typeof Beam>["variant"];
  const colors = ["rust", "teal", "dual"] as const;
  const masterColor = ["rust", "teal", "yellow", "green"] as const;
  return (
    <Sections id='services' className='section-default card'>
      <div className='card-box before:grid-bg bg-primary'>
        <div className='card-eyebrow text-rust!'>What I Offer</div>

        <h2 className='card-title text-[clamp(2.5rem,5vw,4rem)]!'>Services</h2>

        <p className='card-sub '>
          End-to-end software development — from a single API to a complete
          production system. Every project comes with clean code, proper
          documentation, and a real human to talk to.
        </p>
      </div>
      <div className='border-t border-solid border-border mb-1'>&nbsp;</div>
      <div className='card-eyebrow '>How I work</div>
      <div className='services-intro-grid'>
        <div className='services-intro-left'>
          <h2>
            Simple process,
            <br />
            no surprises
          </h2>
          <p>
            Every freelance project I take on follows the same four steps — so
            you always know what's happening, what's next, and what you're
            paying for. I don't start writing code until we both agree on what's
            being built.
          </p>
        </div>
        <div className='card-right'>
          {serviceIntroMaps.map((sI, i) => {
            const textColors = {
              rust: "!text-rust",
              teal: "!text-teal",
              yellow: "!text-yellow",
              green: "!text-green",
            } as const;

            const bgColors = {
              rust: "rust",
              teal: "teal",
              yellow: "yellow",
              green: "green",
            } as const;

            const variant: BeamVariant = colors[i % colors.length];

            const color = masterColor[i % masterColor.length];

            return (
              <Beam
                classBeam='w-[stretch]! rounded-[100%]!'
                key={i}
                variant={variant}
                radius={0}
              >
                <CardGlass
                  className='w-full p-0! rounded-none bg-card!'
                  colors={`${bgColors[color]}`}
                  textColor={textColors[color]}
                >
                  <div className='process-step '>
                    <div className={`process-num ${textColors[color]}`}>
                      {sI.num}
                    </div>
                    <div className='process-label'>{sI.label}</div>
                    <div className='process-desc'>{sI.desc}</div>
                  </div>
                </CardGlass>
              </Beam>
            );
          })}
        </div>
      </div>
      <div className='section-eyebrow mb-2! '>Service Menu</div>
      <div className='services-grid mt-1!'>
        {services.map((service) => (
          <div
            key={service.num}
            className={`service-card beam  ${service.num === "02" ? "highlight-service beam-teal " : " beam-rust"}`}
          >
            <div className='service-num'>{service.num}</div>
            <div className='service-icon-wrap'>{service.icon}</div>
            <div className='service-title'>{service.title}</div>
            <div className='service-desc'>{service.desc}</div>

            <ul className='service-items'>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className='service-price'>
              <span className='service-price-label'>Starting from</span>
              <span className='service-price-val'>{service.price}</span>
            </div>
          </div>
        ))}
      </div>
    </Sections>
  );
};

export default Services;
