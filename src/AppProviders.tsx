import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { ResponsiveProvider } from "@responsive/ResponsiveProvider";
import App from "./App";
import type { DataRouter } from "react-router";
import type { ReactNode } from "react";

export default function AppProviders({
  router,
  helmetContext,
  children,
}: {
  router?: DataRouter;
  helmetContext?: { helmet?: HelmetServerState | null };
  children?: ReactNode;
}) {
  return (
    <HelmetProvider context={helmetContext}>
      <ResponsiveProvider>
        {children ?? (router ? <App router={router} /> : null)}
      </ResponsiveProvider>
    </HelmetProvider>
  );
}
