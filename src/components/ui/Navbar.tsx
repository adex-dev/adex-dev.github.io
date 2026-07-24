import React, { useState, useEffect } from "react";
import clsx from "clsx";
import logo_an from "@assets/logo_an.svg";
import { Link, useNavigate } from "react-router";
const Navbar: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY > 2;

      setIsFixed((prev) => (prev !== shouldBeFixed ? shouldBeFixed : prev));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // tampilkan ukuran awal
    console.log(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (hamburger) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
     document.body.classList.remove('no-scroll');
    };
  }, [hamburger]);
  return (
    <nav className={clsx(isFixed ? "fixed top-0 left-0" : "relative")}>
      <div className="nav-logo cursor-pointer" onClick={() => navigate(`/`)}>
        <img src={logo_an} alt="logo" />
        AN // dev
      </div>
      <div className="nav-links desktop">
        {["About", "Services", "Projects", "Game", "Contact"].map((item) =>
          item.toLowerCase() !== "game" ? (
            <Link key={item} to={`/#${item.toLowerCase()}`}>
              {item}
            </Link>
          ) : (
            <a key={item} href="https://akmadnudin.com/minigame">
              {item}
            </a>
          ),
        )}
      </div>
      <div className="">
        <button
        onClick={() => setHamburger((prev) => !prev)}
        className={`nav-hamburger ${hamburger ? "is-open" : ""}`}
        id="nav-ham"
        aria-label="Toggle navigation"
        aria-expanded={hamburger}
        aria-controls="nav-mobile">
        <span className="ham-lines" aria-hidden="true">
          <span className="ham-line"></span>
          <span className="ham-line"></span>
          <span className="ham-line"></span>
        </span>
      </button>
      </div>
       <div
        className={`nav-mobile-menu ${hamburger ? "is-open" : ""}`}
        id="nav-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu">
        <div className="menu-backdrop"></div>
        <div className="menu-inner">
          <div className="menu-status">
            <span className="menu-status-dot"></span>
            Open to freelance
          </div>
          <div className="menu-links">
            <Link to="/" className="menu-link" style={{"--i":"0.05s"} as React.CSSProperties}>
              <span className="menu-link-left">
                <span className="menu-link-icon">[~]</span> Home
              </span>
              <span className="menu-link-arrow">›</span>
            </Link>
            <Link to="/#services" className="menu-link" style={{"--i":"0.10s"} as React.CSSProperties}>
              <span className="menu-link-left">
                <span className="menu-link-icon">[⚙]</span> Services
              </span>
              <span className="menu-link-arrow">›</span>
            </Link>
            <Link to="/#Projects" className="menu-link" style={{"--i":"0.15s"} as React.CSSProperties}>
              <span className="menu-link-left">
                <span className="menu-link-icon">[◈]</span> Projects
              </span>
              <span className="menu-link-arrow">›</span>
            </Link>
            <a href="https://akmadnudin.com/minigame" className="menu-link" style={{"--i":"0.20s"} as React.CSSProperties}>
              <span className="menu-link-left">
                <span className="menu-link-icon">[≡]</span> Game
              </span>
              <span className="menu-link-arrow">›</span>
            </a>
            <Link to="/#contact" className="menu-link"  style={{"--i":"0.25s"} as React.CSSProperties}>
              <span className="menu-link-left">
                <span className="menu-link-icon">[✉]</span> Contact
              </span>
              <span className="menu-link-arrow">›</span>
            </Link>
          </div>

          <div className="menu-bottom">
            <a
              href="mailto:akmadnudin.inc@gmail.com"
              className="menu-cta-primary">
              ✉ Hire Me
            </a>
            <a
              href="https://github.com/adex-dev"
              className="menu-cta-secondary">
              {} GitHub
            </a>
            <div className="menu-social">
              <a href="https://www.linkedin.com/in/akmadnudin">LinkedIn</a>
              <span className="menu-social-dot"></span>
              <a href="https://akmadnudin.com">akmadnudin.com</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
