// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import {ResponsiveProvider} from '@responsive/ResponsiveProvider'
import "./index.css";

registerSW();

createRoot(document.getElementById("root")!).render(
    <ResponsiveProvider>
      <App />
    </ResponsiveProvider>
);
