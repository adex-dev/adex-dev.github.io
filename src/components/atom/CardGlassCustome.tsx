import { useResponsive } from "@responsive/useResponsive";

type CardGlassCustomeProps = {
  corner?: string;
  period?: string;
  impact?: string;
  color?: string;
  title?: string;
  desc?: string;
  tag?: string[];
  onClick: () => void;
  // children?: React.ReactNode;
};
export default function CardGlassCustome({
  corner = "",
  period = "",
  impact = "",
  title = "",
  desc = "",
  color = "",
  onClick,
  tag = [],
  ...props
}: CardGlassCustomeProps) {
  const { config } = useResponsive();

  return (
    <div
      className={`glass-card group reveal ${config.standard.glassCardBoxDetail}`}
      {...props}
      onClick={onClick}
    >
      <div className='glass-card-top-glow'></div>
      <div className='project-card'>
        <div className='project-image'>
          <div className='impact'   style={
            {
              "color": color,
            } as React.CSSProperties
          }>
            {impact.split(" ").map((word, i) => (
              <span
                key={i}
                className='word'
                style={{ transitionDelay: `${50 + i * 70}ms` }}
              >
                {word}
              </span>
            ))}
          </div>
           <div className='impactnone'   style={
            {
              "color": color,
            } as React.CSSProperties
          }>
             {impact}y
          </div>
          <div className='project-image__overlay'></div>
        </div>
        <div className='absolute bottom-4 left-4 flex gap-2'>
          <span className='font-mono text-xs3 px-2 py-1 rounded bg-accent-orange/20 z-10 text-accent-orange border border-accent-orange/30'>
            {corner}
          </span>
        </div>
      </div>
      <div className='p-6'>
        <div className={`glass-card-eyetag  ${config.standard.glassCardEye}`}>
          <h3
            className={`glass-title text-xl! ${config.standard.glassCardTitle}`}
          >
            {title}
          </h3>
          <span
            className={`glass-card-period text-xs! ${config.standard.glassCardPeriod}`}
          >
            {period}
          </span>
        </div>

        <p
          className={`glass-desc ${config.standard.glassCardDesc}`}
          dangerouslySetInnerHTML={{ __html: desc }}
        />
        <div className={`card-stack ${config.standard.stack}`}>
          {tag.map((tg, i) => (
            <span className={`card-tag ${config.standard.tag}`} key={i}>
              {tg}
            </span>
          ))}
        </div>
        <div className='flex w-full items-center justify-between gap-4 mt-5 pt-4 border-t border-text-muted/10'>
          <div className='flex items-center gap-2 text-sm text-text-dim'>
            <svg
              className='w-4 h-4 text-accent-orange'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
              ></path>
            </svg>
            <span>Live System</span>
          </div>
          <div className='flex items-center gap-2 text-sm text-text-dim'>
            <svg
              className='w-4 h-4 text-accent-cyan'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
              ></path>
            </svg>
            <span>Multi-Branch</span>
          </div>
        </div>
      </div>
    </div>
  );
}
