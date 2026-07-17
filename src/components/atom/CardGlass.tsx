
type  CardGlassProps ={
  colors?:string;
  logo?:string;
  title?:string;

}
export default function CardGlass({
  colors='teal',
  logo="⚙"
  title=""
}:CardGlassProps){
    return(
   <div className="glass-card teal">
      <div
        className={`aurora-blob blob-tl bg-${colors} blur-2xl opacity-[0.2]`}></div>
      <div className={`card-icon text-${colors} uppercase`}>{logo}</div>
      <div className="card-title capitalize">{title}</div>
      <div className="card-desc">
        REST APIs with Python, Rust/Axum, Go. JWT auth, PostgreSQL.
      </div>
      <div className="card-tag">From RM 800</div>
    </div>
    );
}