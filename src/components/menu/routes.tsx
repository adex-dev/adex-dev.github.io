import { lazy, Suspense } from "react";
import { getProjectDetail } from "@utils/projectLoader";
import NF404 from "@components/layouts/404";
import { Loadings } from "@components/atom";
import { redirect, type RouteObject } from "react-router";
import PageTitle from "./Pagetitle";
import MainScreen from "./screen";
import { getProjectListData } from "@utils/projectListLoader";
import { getHomeData } from "@utils/homeLoader";
import { getExperienceData } from "@utils/experienceLoader";
const Home = lazy(() => import("@components/layouts/Home"));
const Experience = lazy(() => import("@components/ui/Experience"));
const ProjectList = lazy(() => import("@components/ui/ProjectList"));
const ProjectDetail = lazy(() => import("@components/ui/ProjectDetail"));
function ProjectDetailRoute() {
  return <ProjectDetail />;
}
function AppHydrateFallback() {
  return <Loadings />;
}
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainScreen />,
    children: [
      {
        index: true,
        loader:getHomeData,
        HydrateFallback: AppHydrateFallback,
        element: (
          <Suspense fallback={<Loadings />}>
          <PageTitle
            title="Akmad Nudin | Full Stack Engineer"
            helmet={[
              <meta name="robots" content="index, follow" key="robots" />,
              <meta property="og:title" content="Akmad Nudin | Full Stack Engineer" key="title" />,
              <meta
                name="description"
                content="Akmad Nudin is a full stack engineer building production web systems, REST APIs, HRIS, attendance, and POS platforms."
                key="desc"
              />,
              <meta property="og:description" content="Akmad Nudin is a full stack engineer building production web systems, REST APIs, HRIS, attendance, and POS platforms." key="ogdesc" />,
              <meta name="twitter:title" content="Akmad Nudin | Full Stack Engineer" key="twittertitle" />,
              <meta name="twitter:description" content="Akmad Nudin is a full stack engineer building production web systems, REST APIs, HRIS, attendance, and POS platforms." key="twitterdesc" />,
              <meta property="og:site_name" content="Akmad Nudin" key="site" />,
              <meta property="og:type" content="website" key="type" />,
              <meta
                property="og:url"
                content="https://akmadnudin.com/"
                key="ogurl"
              />,
              <link
                rel="canonical"
                href="https://akmadnudin.com/"
                key="canonical"
              />,
            ]}
            jsons={[
              {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://akmadnudin.com/#person",
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
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://akmadnudin.com/#website",
                name: "Akmad Nudin — Portfolio",
                url: "https://akmadnudin.com/",
                publisher: { "@id": "https://akmadnudin.com/#person" },
              },
            ]}>
            <Home />
          </PageTitle>
          </Suspense>
        ),
      },
      {
        path: "project-list",
        loader: getProjectListData,
        HydrateFallback: AppHydrateFallback,
        element: (
          <Suspense fallback={<Loadings />}>
          <PageTitle
            title="Projects | Akmad Nudin"
            helmet={[
              <meta name="robots" content="index, follow" key="robots" />,
              <meta
                name="description"
                content="Explore production software projects by Akmad Nudin, including attendance and HRIS platforms, restaurant POS systems, and Rust APIs."
                key="desc"
              />,
              <meta property="og:site_name" content="Akmad Nudin" key="site" />,
              <meta property="og:type" content="website" key="type" />,
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
                content="Projects | Akmad Nudin"
                key="title"
              />,
              <meta
                property="og:description"
                content="Explore production software projects by Akmad Nudin, including attendance and HRIS platforms, restaurant POS systems, and Rust APIs."
                key="ogdesc"
              />,
              <meta name="twitter:title" content="Projects | Akmad Nudin" key="twittertitle" />,
              <meta
                name="twitter:description"
                content="Explore production software projects by Akmad Nudin, including attendance and HRIS platforms, restaurant POS systems, and Rust APIs."
                key="twitterdesc"
              />,
            ]}
            jsons={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Akmad Nudin — Portfolio",
              url: "https://akmadnudin.com/project-list",
              description:
                "Portfolio and services of Akmad Nudin, Full Stack Engineer specializing in Python, Go, React, and ERP integration.",
              isPartOf: {
                "@type": "WebSite",
                "@id": "https://akmadnudin.com/#website",
                url: "https://akmadnudin.com/",
              },
            }}>
            <ProjectList />
          </PageTitle>
          </Suspense>
        ),
      },
      {
        path: "experience",
        loader: getExperienceData,
        element: (
          <Suspense fallback={<Loadings />}>
          <PageTitle
            title="Professional Experience | Akmad Nudin"
            helmet={[
              <meta name="robots" content="index, follow" key="robots" />,
              <meta
                name="description"
                content="Review Akmad Nudin's professional experience building business software, web applications, APIs, and integrated production systems."
                key="desc"
              />,
              <meta property="og:site_name" content="Akmad Nudin" key="site" />,
              <meta property="og:type" content="website" key="type" />,
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
                content="Professional Experience | Akmad Nudin"
                key="title"
              />,
              <meta
                property="og:description"
                content="Review Akmad Nudin's professional experience building business software, web applications, APIs, and integrated production systems."
                key="ogdesc"
              />,
              <meta name="twitter:title" content="Professional Experience | Akmad Nudin" key="twittertitle" />,
              <meta
                name="twitter:description"
                content="Review Akmad Nudin's professional experience building business software, web applications, APIs, and integrated production systems."
                key="twitterdesc"
              />,
            ]}
            jsons={{
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Professional Experience | Akmad Nudin",
              url: "https://akmadnudin.com/experience",
              description:
                "Review Akmad Nudin's professional experience building business software, web applications, APIs, and integrated production systems.",
              isPartOf: {
                "@type": "WebSite",
                "@id": "https://akmadnudin.com/#website",
                url: "https://akmadnudin.com/",
              },
            }}>
            <Experience />
          </PageTitle>
          </Suspense>
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
        loader: async ({ params }) => {
          const { stack, id } = params;
          if (!stack || !id) {
            throw redirect("/notfound");
          }
          const result = await getProjectDetail(stack, id);
          if (!result) {
            throw redirect("/notfound");
          }

          return result;
        },
        HydrateFallback: AppHydrateFallback,
        element:  <Suspense fallback={<Loadings />}><ProjectDetailRoute /></Suspense>,
      },
      {
        path: "project-detail",
        loader: () => redirect("/project-list"),
      },
    ],
  },
];
