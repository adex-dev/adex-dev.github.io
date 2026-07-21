import React from "react";

type SectionsProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Sections: React.FC<SectionsProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <section {...props} className={`section-default card ${className}`}>
    {children}
    </section>
  );
};

export default Sections