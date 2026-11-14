import { createBrowserRouter, createStaticHandler, createStaticRouter } from "react-router";
import { routes } from "./routes";

export const router = typeof window !== "undefined"
  ? createBrowserRouter(routes, {
      basename: import.meta.env.BASE_URL,
      hydrationData: (window as Window & { __staticRouterHydrationData?: unknown })
        .__staticRouterHydrationData as never,
    })
  : null;

export const staticHandler = createStaticHandler(routes);
export const createStaticRoute = createStaticRouter;
