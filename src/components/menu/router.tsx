import Home from "@components/layouts/Home";
import ProjectBase from "@components/layouts/ProjectBase";
import { createBrowserRouter } from "react-router";
import PageTitle from "./Pagetitle";
import MainScreen from "./screen";

export const router = createBrowserRouter([
  {
    element: <MainScreen />,
    children: [
      {
        path: "/",
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
        path: "/project-list",
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
    ],
  },
]);
