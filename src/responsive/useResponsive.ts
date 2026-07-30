import { useContext } from "react";
import { ResponsiveContext } from "./ResponsiveProvider";

export function useResponsive() {
  return useContext(ResponsiveContext);
}
