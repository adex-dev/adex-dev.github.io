import React from "react";
import { useResponsive } from "@responsive/useResponsive";
type TerminalProps = {
  url?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Terminal: React.FC<TerminalProps> = ({ children, url = "" }) => {
  const { config } = useResponsive();
  return (
    <div className={`terminal ${config.terminal.box}`}>
      <div className={`terminal-bar ${config.terminal.bar}`}>
        <div className={`dot red ${config.terminal.dot}`} />
        <div className={`dot yellow ${config.terminal.dot}`} />
        <div className={`dot green ${config.terminal.dot}`} />
        {url ? (
          <span className={`terminal-url ${config.terminal.url}`}>{url}</span>
        ) : (
          <div className={`terminal-username ${config.terminal.username}`} />
        )}
      </div>
      <div className={`terminal-body ${config.terminal.body}`}>{children}</div>
    </div>
  );
};
