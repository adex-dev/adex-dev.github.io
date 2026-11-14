import { createRoot, hydrateRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import AppProviders from "./AppProviders";
import { router } from "@components/menu/router";
import "./index.css";

registerSW();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <AppProviders router={router!} />);
} else {
  createRoot(rootElement).render(<AppProviders router={router!} />);
}
