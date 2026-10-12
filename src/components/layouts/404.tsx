// import { useResponsive } from "@responsive/useResponsive";
import { Link } from "react-router";
function NF404() {
//   const { config } = useResponsive();
  return (
    <div className="container overflow-hidden">
      <div className="nf-box">
          <div className="nf-inner">
                <div className="nf-eyebrow">
                    <span className="nf-dot"></span> Error 404 — Page Not Found<span className="nf-line"></span>
                </div>
                <h1 className="nf-code">
                    4<em>0</em>4
                </h1>
                <h2 className="nf-title">Ups, you are lost.</h2>
                <p className="nf-sub">
                    The page you're looking for doesn't exist, has been relocated, or may not be forged yet. Return to the homepage, or explore the projects that are already complete.
                </p>

                <div className="nf-actions">
                     <Link
                      className='nf-btn primary'
                      to={`/`}>
                      ← Back to Home
                    </Link>
                     <Link
                      className='nf-btn ghost'
                      to={`/project-list`}>
                      Explore Project
                    </Link>
                </div>
                </div>
      </div>
    </div>
  );
}

export default NF404;
