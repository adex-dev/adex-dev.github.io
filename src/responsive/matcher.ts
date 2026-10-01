import type { Breakpoint } from './breakpoints';
import { breakpoints } from './breakpoints';
export function getBreakpoint(
  width: number,
  height: number
): Breakpoint {
  // const item = breakpoints.find((bp) => {
  //   return (
  //     width >= bp.width[0] &&
  //     width <= bp.width[1] &&
  //     height >= bp.height[0] &&
  //     height <= bp.height[1]
  //   );
  // });

  // return item?.name ?? "desktop-1536";
  let item = breakpoints.find(
    (bp) =>
      width >= bp.width[0] &&
      width <= bp.width[1] &&
      height >= bp.height[0] &&
      height <= bp.height[1],
  );
   if (item) return item.name;

    const candidates = breakpoints.filter(
      (bp) => width >= bp.width[0] && width <= bp.width[1],
    );
    if (candidates.length === 0) return "mobile-short";

    const nearest = candidates.reduce((best, bp) => {
      const dist = (b: typeof bp) =>
        height < b.height[0]
          ? b.height[0] - height
          : height > b.height[1]
            ? height - b.height[1]
            : 0;
      return dist(bp) < dist(best) ? bp : best;
    });

    return nearest.name;
}