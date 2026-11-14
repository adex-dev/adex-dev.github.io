import {
  createContext,
  useEffect,
  useState,
} from "react";

import { getBreakpoint } from "./matcher";
import { theme } from "./theme";
import { mergeTheme } from "./utils";

export interface ResponsiveContextType {
  width: number;
  height: number;
  breakpoint: string;
  config: any;
}

export const ResponsiveContext =
  createContext<ResponsiveContextType | null>(null);

export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep server output and the first client render on the same mobile-first preset.
  const [screen, setScreen] = useState({
    width: 390,
    height: 844,
  });

  useEffect(() => {
    const resize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const breakpoint = getBreakpoint(
    screen.width,
    screen.height,
  );

  const config = mergeTheme(
    theme.base,
    theme[breakpoint as keyof typeof theme] ?? {},
  );

  // Keep the full desktop link row from squeezing into tablet widths. The
  // same accessible menu used on phones also works better on small tablets.
  if (screen.width <= 1023) {
    config.navbar = {
      ...config.navbar,
      nav: "compact",
      displayText: "hidden",
      displayImage: "static top-0",
      hamburger: "hamburger-short",
    };
  }

  return (
    <ResponsiveContext.Provider
      value={{
        width: screen.width,
        height: screen.height,
        breakpoint,
        config,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}
