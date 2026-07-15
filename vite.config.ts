import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { fileURLToPath, URL } from "node:url";
// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: true,
    host: "0.0.0.0",
  },
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
