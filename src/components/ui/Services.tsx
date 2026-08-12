import id from "@assets/flags/indonesia.svg";
import malay from "@assets/flags/malaysia.svg";
import sg from "@assets/flags/singapore.svg";
import usa from "@assets/flags/us.svg";
import { Sections } from "@components/atom";
import RevealSection from "@components/atom/RevealSection";
import { useResponsive } from "@responsive/useResponsive";
import React, { useState } from "react";
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
    highlight: false,
  },
];

const flagPrice = [
  {
    prefix: "IDR",
    project: {
      price: [
        "3,500,000",
        "6,500,000",
        "5,000,000",
        "8,500,000",
        "2,500,000",
        "850,000",
      ],
      state: ["project", "project", "project", "project", "project", "session"],
    },
  },
  {
    prefix: "RM",
    project: {
      price: ["950", "1,750", "1,350", "2,300", "680", "230"],
      state: ["project", "project", "project", "project", "project", "session"],
    },
  },
  {
    prefix: "USD",
    project: {
      price: ["215", "400", "310", "520", "155", "52"],
      state: ["project", "project", "project", "project", "project", "session"],
    },
  },
  {
    prefix: "SGD",
    project: {
      price: ["290", "540", "415", "700", "210", "70"],
      state: ["project", "project", "project", "project", "project", "session"],
    },
  },
];

const Services: React.FC = () => {

  const [prefix, setPrefix] = useState("usd");
  const [flag, setFlag] = useState(usa);

  const handleChange = (e: any) => {
    const selectedOption = e.target.selectedOptions[0];
    setPrefix(e.target.value.trim().toLocaleLowerCase());
    let dataflag = usa;
    if (selectedOption.dataset.flag === "id") {
      dataflag = id;
    } else if (selectedOption.dataset.flag === "sg") {
      dataflag = sg;
    } else if (selectedOption.dataset.flag === "my") {
      dataflag = malay;
    } else {
      dataflag = usa;
    }

    setFlag(dataflag);
  };
  const { config } = useResponsive();

  return (
    <Sections
      id='services'
      className={`default-section ${config.section.default}`}
    >
      <div className={`section-tag ${config.section.tag}`}>
        <span className={`section-tag-icon ${config.section.icon}`}>📜</span>
        <span className={`section-tag-text ${config.section.text}`}>service menu</span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={config.standard.header}>What I can build for you</h2>
      <p className={config.standard.desc}>
        End-to-end backend engineering — from architecture to deployment.
      </p>
      <div className='services-grid'>
        <div className='flag-wrapper'>
          <div className='trigger' id='trigger'>
            <span className={`flag-icon ${config.services.icon}`} id='flagIcon'>
              <img src={flag} alt={flag} />
            </span>
            <span className={`arrow`}>▼</span>
          </div>
          <select
            id='languageSelect'
            value={prefix.trim().toLocaleLowerCase()}
            onChange={handleChange}
          >
            <option value='idr' data-flag='id'>
              IDR
            </option>
            <option value='usd' data-flag='usa'>
              US
            </option>
            <option value='rm' data-flag='my'>
              RM
            </option>
            <option value='sgd' data-flag='sg'>
              SGD
            </option>
          </select>
        </div>
      </div>
      <RevealSection selector='.service-card' threshold={0.2} delay={150}>
        <div className={`services-menu-grid ${config.services.menugrid}`}>
          {services.map((service, i) => {
            const priceData = flagPrice.find(
              (item) =>
                item.prefix.trim().toLocaleLowerCase() ===
                prefix.trim().toLocaleLowerCase(),
            );
            return (
              <div
                key={service.num}
                className={`service-card group ${config.services.card} ${service.num === "02" ? "active" : ""}`}
              >
                <div className={`service-header ${config.services.header}`}>
                  <div className={`service-num ${config.services.num}`}>{service.num}</div>
                  <div className={`service-icon ${config.services.numIcon}`}>{service.icon}</div>
                </div>
                <div className={`service-title ${config.services.sTitle}`}>{service.title}</div>
                <div className={`service-desc ${config.services.sDesc}`}>{service.desc}</div>

                <ul className={`service-list ${config.services.sLi}`}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className={`service-price ${config.services.sPrice}`}>
                  <span className={`price-label ${config.services.sPriceLabel}`}>Starting from</span>
                  <span className={`price-value ${config.services.sPriceValue}`}>
                    {`${priceData?.project.price[i]}`}{" "}
                    <span>{`${prefix} / ${priceData?.project.state[i]}`}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </RevealSection>
     
    </Sections>
  );
};

export default Services;
