import { createDesktopPreset } from "./desktopPreset";

// 1536px and wider, 651–999px tall: use the full-size desktop composition.
export const desktop1536 = createDesktopPreset({ heroSize: "standard" });
