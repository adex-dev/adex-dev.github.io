type CardGlassProps = {
  colors?: string;
  textColor?: string;
  logo?: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
};
export default function CardGlass({
  colors = "teal",
  textColor = "teal",
  className= "",
  children,
  ...props
}: CardGlassProps) {
  return (
    <div className={`glass-card ${colors} ${className}`} {...props}>
      <div
        className={`aurora-blob blob-tl bg-${colors} blur-2xl opacity-[0.2]`}
      ></div>
      {children}
      {/* <div className={`card-icon text-${colors} uppercase`}>{logo}</div>
      <div className="card-title capitalize">{title}</div>
      <div className="card-desc">
        REST APIs with Python, Rust/Axum, Go. JWT auth, PostgreSQL.
      </div>
      <div className="card-tag">From RM 800</div> */}
    </div>
  );
}
