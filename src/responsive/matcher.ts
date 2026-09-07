import type { Breakpoint } from './breakpoints';
import { breakpoints } from './breakpoints';
export function getBreakpoint(
  width: number,
  height: number
): Breakpoint {
  const item = breakpoints.find((bp) => {
    return (
      width >= bp.width[0] &&
      width <= bp.width[1] &&
      height >= bp.height[0] &&
      height <= bp.height[1]
    );
  });

  return item?.name ?? "desktop-1536";
}