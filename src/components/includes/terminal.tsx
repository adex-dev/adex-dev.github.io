import React from "react";

type TerminalProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Terminal: React.FC<TerminalProps> = ({ children }) => {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="dot red" />
        <div className="dot yellow" />
        <div className="dot green" />
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
};
