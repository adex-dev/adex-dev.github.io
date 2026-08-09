type CardGlassProps = {
  corner?: string;
  period?: string;
  title?: string;
  desc?: string;
  tag?: string[];
  // children?: React.ReactNode;
};
export default function CardGlass({
  corner = "",
  period = "",
  title = "",
  desc = "",
  tag = [],
  ...props
}: CardGlassProps) {
  return (
    <div className={`glass-card group reveal`} {...props}>
      <div className='glass-card-top-glow'></div>
      <div className='glass-card-eyetag'>
        <span
          className={`glass-card-corner ${corner.toLocaleLowerCase() === "production" ? "rust" : "teal"}`}
        >
          {corner}
        </span>
        <span className='glass-card-period'>{period}</span>
      </div>
      <h3 className='glass-title'>{title}</h3>
      <p className='glass-desc' dangerouslySetInnerHTML={{ __html: desc }} />
      <div className='card-stack'>
        {tag.map((tg, i) => (
          <span className='card-tag' key={i}>
            {tg}
          </span>
        ))}
      </div>
    </div>
  );
}
