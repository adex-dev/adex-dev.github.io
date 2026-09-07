import { useContext } from "react";
import type { ResponsiveContextType } from "./ResponsiveProvider";
import { ResponsiveContext } from "./ResponsiveProvider";

export function useResponsive(): ResponsiveContextType {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }
  return context;
}