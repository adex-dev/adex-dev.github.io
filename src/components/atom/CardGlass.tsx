import { useResponsive } from "@responsive/useResponsive";

type CardGlassProps = {
  corner?: string;
  period?: string;
  title?: string;
  desc?: string;
  tag?: string[];
  tagcolor?: string[];
  // children?: React.ReactNode;
};
export default function CardGlass({
  corner = "",
  period = "",
  title = "",
  desc = "",
  tag = [],
  tagcolor = ["#38bdf8"],
  ...props
}: CardGlassProps) {
  const { config } = useResponsive();
  return (
    <div
      className={`glass-card group reveal ${config.standard.glassCardBox}`}
      {...props}
    >
      <div className='glass-card-top-glow'></div>
      <div className={`glass-card-eyetag ${config.standard.glassCardEye}`}>
        <span
          className={`glass-card-corner ${config.standard.glassCardCorner} ${corner.toLocaleLowerCase() === "production" ? "rust" : "teal"}`}
        >
          {corner}
        </span>
        <span
          className={`glass-card-period ${config.standard.glassCardPeriod}`}
        >
          {period}
        </span>
      </div>
      <h3 className={`glass-title ${config.standard.glassCardTitle}`}>
        {title}
      </h3>
      <p
        className={`glass-desc ${config.standard.glassCardDesc}`}
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <div className={`card-stack ${config.standard.stack}`}>
        {tag.map((tg, i) => {
          const raw = tagcolor[i] ?? tagcolor[0];
          const hasil = raw[0];
          const color = !raw || (hasil != "#") ? "#38bdf8 !important" : raw;
          return (
          <span className={`card-tag ${config.standard.tag}`} key={i}
          style={
            {
                color: (color),
                borderColor: (color),
            } as React.CSSProperties
          } 
          >
            {tg}
          </span>
        )
        }
      )
      }
      </div>
    </div>
  );
}
