interface DesktopPresetOptions {
  heroSize?: "compact" | "standard";
  compactArtwork?: boolean;
  shortViewport?: boolean;
}

export function createDesktopPreset({
  heroSize = "compact",
  compactArtwork = false,
  shortViewport = false,
}: DesktopPresetOptions = {}) {
  const compact = heroSize === "compact";
  const artwork = compactArtwork ? "d1280_v1" : compact ? "d1280" : "default";

  return {
    hero: {
      box: compact ? "d1280" : "default",
      eyebrow: "default",
      title: "default",
      first: compact ? "d1280" : "default",
      last: compact ? "d1280" : "default",
      heroCTA: "gap-4",
      subtitle: compact ? "d1280" : "default",
      desc: compact ? "d1280" : "default",
      rustBadge: "default",
      scrollHint: shortViewport ? "hidden" : "default",
      stackBar: shortViewport ? "hidden" : compact ? "d1280" : "default",
      stackItem: compact ? "d1280" : "default",
      stackIcon: "default",
      stackName: "default",
      right: compact ? "d1280" : "default",
      orb: "default",
      ring: "default",
      ring2: "default",
      termCardBack: artwork,
      termCardBackLeft: artwork,
      termCard: compact ? "d1280" : "default",
      topdots: "default",
      bottomdots: "default",
      centerDots: "default",
      planet: artwork,
      planetRing: compact ? "d1280" : "default",
      orbit: "default",
    },
    section: {
      wrapper: "w-full",
      client: "py-20 px-12",
    },
  };
}
