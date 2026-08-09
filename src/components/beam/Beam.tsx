import React, { useEffect, useRef } from "react";

interface BeamProps {
  variant?: "rust" | "teal" | "dual" | "glass";
  radius?: number;
  strokeWidth?: number;
  className?: string;
  classBeam?: string;
  children: React.ReactNode;
}

export default function Beam({
  variant = "rust",
  radius = 8,
  strokeWidth = 1,
  children,
  className='',
  classBeam='',
}: BeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rect = rectRef.current;

    if (!container || !rect) return;

    const updateRect = () => {
      const { width, height } = container.getBoundingClientRect();

      const style = getComputedStyle(container);

      const borderRadius = radius !== undefined ? radius : parseFloat(style.borderTopLeftRadius);

      rect.setAttribute("x", "0");
      rect.setAttribute("y", "0");

      rect.setAttribute("width", width.toString());
      rect.setAttribute("height", height.toString());

      rect.setAttribute("rx", borderRadius.toString());
      rect.setAttribute("ry", borderRadius.toString());

      requestAnimationFrame(() => {
        const length = rect.getTotalLength();

        rect.style.strokeDasharray = `${length}`;
        rect.style.strokeDashoffset = `${length}`;
        rect.style.opacity = "0";
      });
    };

    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(container);

    const enter = () => {
      const length = rect.getTotalLength();

      rect.style.opacity = "1";
      rect.style.transition = "none";
      rect.style.strokeDashoffset = `${length}`;

      rect.getBoundingClientRect();

      rect.style.transition = "stroke-dashoffset .65s cubic-bezier(.4,0,.2,1)";
      rect.style.strokeDashoffset = "0";
    };

    const leave = () => {
      const length = rect.getTotalLength();

      rect.style.transition =
        "stroke-dashoffset .45s cubic-bezier(.4,0,.2,1), opacity .25s ease .25s";

      rect.style.strokeDashoffset = `${length}`;
      rect.style.opacity = "0";
    };

    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);

    return () => {
      observer.disconnect();

      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
    };
  }, [radius]);

  return (
    <div ref={containerRef} className={`beamborder shadow-2xl shadow-gray-700 ${classBeam}`}>
      <svg className={`beam-svg ${className}`} width="100%" height="100%">
        <rect
          ref={rectRef}
          className={`beam-rect`}
          stroke={`url(#g-${variant})`}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {children}
    </div>
  );
}
