import type { AuroraInterface } from "@components/types/Interface";
import type React from "react";
export default function CardAurora({
  card = "w-[stretch] rounded-[16px]",
  tl = "",
  icon = "*",
  iconclass = "",
  title = "",
  desc = "",
  tag = "",
  tagclass = "",
}: AuroraInterface) {
  return (
    <div className={`aurora-card ${card}`}>
      <div className={`aurora-blob blob-tl ${tl ? tl : "bg-teal"}`}></div>
      <div className={`aurora-blob blob-br  ${tl ? tl : "bg-teal"}`}></div>
      <div className={`card-icon ${iconclass ? iconclass : "text-teal"}`}>
        {icon}
      </div>
      <div className='card-title capitalize'>{title}</div>
      <div className='card-desc'>{desc}</div>
      {tag ? (
        <div
          className={`card-tag ${tagclass ? tagclass : "bg-rust-secondary text-rust border-rust-secondary"}`}
        >
          ${tag}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
type AuroraProps = {
  children: React.ReactNode;
  card?: string;
  tl?: string;
  tag?: string;
  tagClass?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function CardAuroraCustome({
  card = "w-[stretch] rounded-[16px]",
  tl = "",
  tag = "",
  tagClass = "",
  children,
  ...props
}: AuroraProps) {
  return (
    <div className='wrap relative' {...props}>
      <div className={`aurora-card ${card}`}>
        <div className={`aurora-blob blob-tl ${tl ? tl : "bg-teal"}`}></div>
        <div className={`aurora-blob blob-br  ${tl ? tl : "bg-teal"}`}></div>
        {children}
        {tag ? (
          <div
            className={`card-tag ${tagClass ? tagClass : "bg-rust-secondary text-rust border-rust-secondary"}`}
          >
            ${tag}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
