import Home from "@components/layouts/Home";
import NF404 from "@components/layouts/404";
import ProjectBase from "@components/layouts/ProjectBase";
import { createBrowserRouter,redirect } from "react-router";
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
                <meta name="description" content="welcome to akmad nudin" />
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
                <meta name="description" content="Portfolio akmad nudin" />,
                <link
                  rel="canonical"
                  href="https://akmadnudin.com/project-list"
                />,
                <meta
                  property="og:url"
                  content="https://akmadnudin.com/project-list"
                />,
              ]}>
              <ProjectBase />
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
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
