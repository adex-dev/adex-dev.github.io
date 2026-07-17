import type { AuroraInterface } from "@components/types/Interface";
export default function CardAurora({
  card = "w-fit rounded-[16px]",
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
      <div className={`aurora-blob blob-tl ${tl  ? tl :'bg-teal'}`}></div>
      <div className={`aurora-blob blob-br  ${tl  ? tl :'bg-teal'}`}></div>
      <div className={`card-icon ${iconclass ? iconclass : 'text-teal'}`}>{icon}</div>
      <div className="card-title capitalize">{title}</div>
      <div className="card-desc">{desc}
      </div>
      {
        tag ? (
            <div className={`card-tag ${tagclass ? tagclass : 'bg-rust-secondary text-rust border-rust-secondary'}`}>
        ${tag}
      </div>
        ):''
      }
    
    </div>
  );
}
