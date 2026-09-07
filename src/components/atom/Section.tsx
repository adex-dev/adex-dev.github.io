import React from "react";
import { useResponsive } from "@responsive/useResponsive";
type SectionsProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Sections: React.FC<SectionsProps> = ({
  children,
  className = "",
  ...props
}) => {
   const { config } = useResponsive();
  return (
    <section {...props} className={`${config.section.wrapper} ${className}`}>
    {children}
    </section>
  );
};

export default Sections