import { createDesktopPreset } from "./desktopPreset";

// 1024–1279px wide and 500–767px tall: compact hero, reduced decoration.
export const desktop1024Short = createDesktopPreset({
  compactArtwork: true,
  shortViewport: true,
});
