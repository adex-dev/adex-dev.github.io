import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
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
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@types": path.resolve(__dirname, "./src/components/types"),
    },
  },
});
