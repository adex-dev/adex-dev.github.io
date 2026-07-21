import React from "react";

type TerminalProps = {
  url?:string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Terminal: React.FC<TerminalProps> = ({ children,url='' }) => {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="dot red" />
        <div className="dot yellow" />
        <div className="dot green" />
        {
          url ? (
            <span className="terminal-url">{url}</span>
          ):(
            <div className="terminal-username" />
          )
        }
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
};
