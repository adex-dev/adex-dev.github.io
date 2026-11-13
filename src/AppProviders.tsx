import { HelmetProvider } from "react-helmet-async";
import { ResponsiveProvider } from "@responsive/ResponsiveProvider";
import App from "./App";

export default function AppProviders() {
  return (
    <HelmetProvider>
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    </HelmetProvider>
  );
}