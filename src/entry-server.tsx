import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { StaticRouterProvider } from "react-router";
import AppProviders from "./AppProviders";
import { createStaticRoute, staticHandler } from "@components/menu/router";

export async function render(url: string) {
  const request = new Request(new URL(url, "http://localhost"));
  const context = await staticHandler.query(request);
  if (context instanceof Response) {
    return { html: "", head: "" };
  }
  const router = createStaticRoute(staticHandler.dataRoutes, context);
  const helmetContext: { helmet?: import("react-helmet-async").HelmetServerState | null } = {};
  const html = await new Promise<string>((resolve, reject) => {
    const chunks: string[] = [];
    const output = new PassThrough();
    output.on("data", (chunk: Buffer) => chunks.push(chunk.toString()));
    output.on("end", () => resolve(chunks.join("")));
    const stream = renderToPipeableStream(
      <AppProviders helmetContext={helmetContext}>
        <StaticRouterProvider router={router} context={context} />
      </AppProviders>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error("SSR render error:", error);
        },
      },
    );
  });
  const helmet = helmetContext.helmet;
  const head = helmet
    ? [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()].join("\n")
    : "";

  return { html, head };
}
