import Home from "@components/layouts/Home";
import NF404 from "@components/layouts/404";
import ProjectBase from "@components/layouts/ProjectBase";
import Experience from "@components/ui/Experience";
import { createBrowserRouter,redirect,useParams } from "react-router";
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
              helmet={
                [
                <meta name="description" content="Akmad Nudin,Portfolio of production systems: WDMS fingerprint management, HRIS payroll automation, POS for restaurants, Rust/Axum REST API. Real systems, real results." key="desc" />,
                <meta property="og:site_name" content="Akmad Nudin" key="site" />,
                <meta name="keywords" content="Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia" key="kw" />,
                <meta property="og:url" content="https://akmadnudin.com" key="ogurl" />,
                <meta property="og:title" content="Akmad Nudin" key="title" />,
                <link rel="canonical" href="https://akmadnudin.com" key="canonical" />,
                ]
              }>
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
                <meta name="description" content="Project,Akmad Nudin Project Portfolio of production systems: WDMS fingerprint management, HRIS payroll automation, POS for restaurants, Rust/Axum REST API. Real systems, real results." key="desc" />,
                <meta property="og:site_name" content="Akmad Nudin" key="site" />,
                <meta name="keywords" content="Project,Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia" key="kw" />,
                <link rel="canonical" href="https://akmadnudin.com/project-list" key="canonical" />,
                <meta property="og:url" content="https://akmadnudin.com/project-list" key="ogurl" />,
                <meta property="og:title" content="Akmad Nudin - Project List" key="title" />,
              ]}>
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
                <meta name="description" content="Experience,Experience Akmad Nudin Portfolio of production systems: WDMS fingerprint management, HRIS payroll automation, POS for restaurants, Rust/Axum REST API. Real systems, real results." key="desc" />,
                <meta property="og:site_name" content="Akmad Nudin" key="site" />,
                <meta name="keywords" content="Experience,Akmad Nudin,Full Stack Engineer Indonesia, Freelance Python Developer Malaysia, Rust Developer, ERP Integration Oracle NetSuite, FastAPI Developer, React Developer, Docker CI/CD, PostgreSQL, Backend Developer Indonesia" key="kw" />,
                <link rel="canonical" href="https://akmadnudin.com/experience" key="canonical" />,
                <meta property="og:url" content="https://akmadnudin.com/experience" key="ogurl" />,
                <meta property="og:title" content="Akmad Nudin - Experience" key="title" />,
              ]}>
             <Experience />
            </PageTitle>
          ),
        },
        {
          path: "notfound",
          element:<NF404/>,
        },
        {
          path: "*",
          loader: () => redirect("/notfound"),
        },
        {
          path: "project-detail/:id",
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
  const { id } = useParams();
  const url = `https://akmadnudin.com/project-detail/${id}`;

  return (
    <PageTitle
      title="Project Detail"
      helmet={[
              <meta property="og:site_name" content="Akmad Nudin" key="site" />,
              <link rel="canonical" href={url} key="canonical" />,
              <meta property="og:url" content={url} key="ogurl" />,
              <meta property="og:title" content="Akmad Nudin - Project Detail" key="title" />,
      ]}
    >
      <ProjectBase endpoint='detail' />
    </PageTitle>
  );
}
