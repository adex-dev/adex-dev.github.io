import { createServer } from "vite";
import path from "node:path";
import fs from "node:fs/promises";

async function prerender() {
  const root = process.cwd();
  const distDir = path.resolve(root, "dist");

  const vite = await createServer({
    configFile: path.resolve(root, "vite.config.ts"),
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const projectRoutes = await getProjectRoutes();
    const routes = ["/", "/project-list",...projectRoutes];

    const template = await fs.readFile(
      path.resolve(distDir, "index.html"),
      "utf-8",
    );

    for (const route of routes) {
      const result = await render(route);
      const html = template
        .replace('<div id="root"></div>', `<div id="root">${result.html}</div>`)
        .replace("</head>", `${result.head}\n</head>`);
      const outputDir =
        route === "/" ? distDir : path.resolve(distDir, route.slice(1));
      await fs.mkdir(outputDir, { recursive: true });

      await fs.writeFile(path.resolve(outputDir, "index.html"), html, "utf-8");
    }
    console.log(`Prerender berhasil: ${route}`);
  } finally {
    await vite.close();
  }
}

prerender().catch((error) => {
  console.error("Prerender gagal:", error);
  process.exit(1);
});
