import { renderToString } from "react-dom/server";
import AppProviders from "./AppProviders";

export function render() {
  const html = renderToString(<AppProviders />);

  return { html };
}