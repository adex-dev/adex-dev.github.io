import { createContext, useEffect, useState } from "react";
import { getBreakpoint } from "./matcher";
import { theme } from "./theme";
import { mergeTheme } from "./utils";

export interface ResponsiveContextType {
  width: number;
  height: number;
  breakpoint: string;
  config: any;
}

export const ResponsiveContext = createContext<ResponsiveContextType | null>(
  null,
);

export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const breakpoint = getBreakpoint(screen.width, screen.height);
  const config = mergeTheme(
    theme.base,
    theme[breakpoint as keyof typeof theme] ?? {},
  );

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
