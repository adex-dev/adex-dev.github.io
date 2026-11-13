import { createBrowserRouter } from "react-router";
import { routes } from "./routes";

const hydrationData = (
  window as Window & {
    __staticRouterHydrationData?: unknown;
  }
).__staticRouterHydrationData;

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
  hydrationData: hydrationData as never,
});