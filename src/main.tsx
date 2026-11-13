import { createRoot, hydrateRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import AppProviders from "./AppProviders";
import "./index.css";

registerSW();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <AppProviders />);
} else {
  createRoot(rootElement).render(<AppProviders />);
}