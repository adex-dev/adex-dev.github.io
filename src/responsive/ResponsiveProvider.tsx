import { createContext, useEffect, useState } from "react";

import { getBreakpoint } from "./matcher";
import { mergeTheme } from "./utils";
import { theme } from "./theme";

export const ResponsiveContext = createContext<any>(null);

export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screen, setScreen] = useState({
    width: window.visualViewport?.width ?? window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
  });

  useEffect(() => {
    const resize = () => {
      setScreen({
      width: window.visualViewport?.width ?? window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);
  const breakpoint = getBreakpoint(screen.width, screen.height);
  const config = mergeTheme(theme.base, theme[breakpoint] ?? {});

  return (
    <ResponsiveContext.Provider
      value={{
        width: screen.width,
        height: screen.height,
        breakpoint,
        config,
      }}>
      {children}
    </ResponsiveContext.Provider>
  );
}
