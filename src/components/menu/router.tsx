import PageTitle from "./Pagetitle";
import { createBrowserRouter } from "react-router";
import MainScreen from "./screen";
import Home from "@components/layouts/Home";
import ProjectBase from "@components/layouts/ProjectBase";

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
            helmet={
              <meta name="description" content="Portfolio akmad nudin" />
            }>
            <ProjectBase />
          </PageTitle>
        ),
      },
    ],
  },
]);
