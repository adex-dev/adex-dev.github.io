import Home from "@components/layouts/Home";
import NF404 from "@components/layouts/404";
import ProjectBase from "@components/layouts/ProjectBase";
import Experience from "@components/ui/Experience";
import { createBrowserRouter, redirect, useParams } from "react-router";
import PageTitle from "./Pagetitle";
import MainScreen from "./screen";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainScreen />,
      children: [
        {
          index: true,
          element: (
            <PageTitle
              title="Akmad Nudin"
              helmet={[
                <meta
          property="og:title"
          content="Akmad Nudin"
          key="title"
        />,
                <meta
                  name="description"
                  content="Akmad Nudin,Portfolio of production systems: WDMS fingerprint management, HRIS payroll automation, POS for restaurants, Rust/Axum REST API. Real systems, real results."
                  key="desc"
                />,
                <meta
                  property="og:site_name"
                  content="Akmad Nudin"
                  key="site"
                />,
                <meta
                  name="keywords"
                  content="Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia"
                  key="kw"
                />,
                <meta
                  property="og:url"
                  content="https://akmadnudin.com"
                  key="ogurl"
                />,
                <meta property="og:title" content="Akmad Nudin" key="title" />,
                <link
                  rel="canonical"
                  href="https://akmadnudin.com"
                  key="canonical"
                />,
              ]}
              jsons={{
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Akmad Nudin",
                jobTitle: "Full Stack Engineer",
                description:
                  "Full Stack Engineer with 5+ years experience building production-grade business systems. Specializing in Python, Go, PHP, React, and ERP integration.",
                url: "https://akmadnudin.com",
                email: "akmadnudin.inc@gmail.com",
                telephone: "+62-812-2012-8834",
                image: "https://akmadnudin.com/logo_an.svg",
                sameAs: [
                  "https://www.linkedin.com/in/akmadnudin",
                  "https://github.com/adex-dev",
                  "https://akmadnudin.com",
                ],
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "ID",
                },
                knowsAbout: [
                  "Python",
                  "FastAPI",
                  "Flask",
                  "Go",
                  "PHP",
                  "CodeIgniter",
                  "React",
                  "Tailwind CSS",
                  "JavaScript",
                  "TypeScript",
                  "Flutter",
                  "Dart",
                  "PostgreSQL",
                  "MySQL",
                  "Docker",
                  "CI/CD",
                  "Git",
                  "Linux",
                  "Oracle NetSuite",
                  "Odoo",
                  "REST API",
                  "JWT",
                  "ERP Integration",
                  "HRIS",
                  "POS System",
                  "Full Stack Development",
                  "Backend Development",
                ],
              }}>
              <Home />
            </PageTitle>
          ),
        },
        {
          path: "project-list",
          element: (
            <PageTitle
              title="Portfolio"
              helmet={[
                <meta
                  name="description"
                  content="Project,Akmad Nudin Project Portfolio of production systems: WDMS fingerprint management, HRIS payroll automation, POS for restaurants, Rust/Axum REST API. Real systems, real results."
                  key="desc"
                />,
                <meta
                  property="og:site_name"
                  content="Akmad Nudin"
                  key="site"
                />,
                <meta
                  name="keywords"
                  content="Project,Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia"
                  key="kw"
                />,
                <link
                  rel="canonical"
                  href="https://akmadnudin.com/project-list"
                  key="canonical"
                />,
                <meta
                  property="og:url"
                  content="https://akmadnudin.com/project-list"
                  key="ogurl"
                />,
                <meta
                  property="og:title"
                  content="Akmad Nudin - Project List"
                  key="title"
                />,
              ]}
              jsons={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Akmad Nudin — Portfolio",
                url: "https://akmadnudin.com",
                description:
                  "Portfolio and services of Akmad Nudin, Full Stack Engineer specializing in Python, Go, React, and ERP integration.",
                author: {
                  "@type": "Person",
                  name: "Akmad Nudin",
                  url: "https://akmadnudin.com",
                },
              }}>
              <ProjectBase />
            </PageTitle>
          ),
        },
        {
          path: "experience",
          element: (
            <PageTitle
              title="Experience"
              helmet={[
                <meta
                  name="description"
                  content="Experience,Experience Akmad Nudin Portfolio of production systems: WDMS fingerprint management, HRIS payroll automation, POS for restaurants, Rust/Axum REST API. Real systems, real results."
                  key="desc"
                />,
                <meta
                  property="og:site_name"
                  content="Akmad Nudin"
                  key="site"
                />,
                <meta
                  name="keywords"
                  content="Experience,Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia"
                  key="kw"
                />,
                <link
                  rel="canonical"
                  href="https://akmadnudin.com/experience"
                  key="canonical"
                />,
                <meta
                  property="og:url"
                  content="https://akmadnudin.com/experience"
                  key="ogurl"
                />,
                <meta
                  property="og:title"
                  content="Akmad Nudin - Experience"
                  key="title"
                />,
              ]}
              jsons={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Akmad Nudin — Portfolio",
                url: "https://akmadnudin.com",
                description:
                  "Portfolio and services of Akmad Nudin, Full Stack Engineer specializing in Python, Go, React, and ERP integration.",
                author: {
                  "@type": "Person",
                  name: "Akmad Nudin",
                  url: "https://akmadnudin.com",
                },
              }}
              >
              <Experience />
            </PageTitle>
          ),
        },
        {
          path: "notfound",
          element: <NF404 />,
        },
        {
          path: "*",
          loader: () => redirect("/notfound"),
        },
        {
          path: "project-detail/:stack/:id",
          element: <ProjectDetailRoute />,
        },
        {
          path: "project-detail",
          loader: () => redirect("/project-list"),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

function ProjectDetailRoute() {
  const { stack, id } = useParams();
  const url = `https://akmadnudin.com/project-detail/${stack}/${id}`;

  return (
    <PageTitle
      helmet={[
        <meta property="og:site_name" content="Akmad Nudin" key="site" />,
        <link rel="canonical" href={url} key="canonical" />,
        <meta property="og:url" content={url} key="ogurl" />,
        <meta
          property="og:title"
          content="Akmad Nudin - Project Detail"
          key="title"
        />,
      ]}>
      <ProjectBase endpoint="detail" />
    </PageTitle>
  );
}
