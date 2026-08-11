export const breakpoints = [
  // Mobile
  {
    name: "mobile-short" as const,
    width: [0, 320]as const,
    height: [0, 568] as const,
  },
  {
    name: "mobile-normal" as const,
    width: [321, 375] as const,
    height: [512, 899] as const,
  },
  {
    name: "mobile-tall" as const,
    width: [0, 767] as const,
    height: [900, 9999] as const,
  },

  // Tablet
  {
    name: "tablet-short" as const,
    width: [768, 1023] as const,
    height: [0, 799] as const,
  },
  {
    name: "tablet-normal" as const,
    width: [768, 1023] as const,
    height: [800, 9999] as const,
  },

  // Desktop
  {
    name: "desktop-1024-short" as const,
    width: [1024, 1279] as const,
    height: [500, 767] as const,
  },
  {
    name: "desktop-1024-medium" as const,
    width: [1024, 1279] as const,
    height: [768, 899] as const,
  },
  {
    name: "desktop-1024-tall" as const,
    width: [1024, 1279] as const,
    height: [900, 9999] as const,
  },

  {
    name: "desktop-1280" as const,
    width: [1280, 1535] as const,
    height: [0, 999] as const,
  },

  {
    name: "desktop-1536" as const,
    width: [1536, 9999] as const,
    height: [0, 999] as const,
  },
]  as const;
export type Breakpoint = typeof breakpoints[number]['name'];
