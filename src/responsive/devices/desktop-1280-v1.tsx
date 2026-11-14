import { createDesktopPreset } from "./desktopPreset";

// 1280–1535px wide and up to 649px tall: use compact geometry and artwork.
export const desktop1280V1 = createDesktopPreset({
  compactArtwork: true,
  shortViewport: true,
});
