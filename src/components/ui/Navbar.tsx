import logo from "@assets/logo.svg";
import logo_an from "@assets/logo_an.svg";
import { useResponsive } from "@responsive/useResponsive";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
const Navbar: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [navlinks, setNavlinks] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY > 2;
      setIsFixed((prev) => (prev !== shouldBeFixed ? shouldBeFixed : prev));
    };
    if (hamburger) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHamburger(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hamburger]);

  const handlerClick = (pointing: string) => {
    setHamburger(false);
    navigate(pointing);
  };

  const { config } = useResponsive();
  return (
    <nav
      className={clsx(
        isFixed ? "fixed top-0 left-0 px-6!" : "relative ",
        config.navbar.nav,
      )}>
      <div className="nav-logo cursor-pointer" onClick={() => navigate(`/`)}>
        <div className={`logo-text ${config.navbar.displayText}`}>
          <img
            src={logo_an}
            className={`${config.navbar.logoTextImage}`}
            alt="logo"
          />
          <span className="nav-brand-an">AN</span>
          <span className="nav-brand-rest">&nbsp;//&nbsp;dev</span>
          <span className="nav-brand-line"></span>
        </div>
        <div className={config.navbar.displayImage}>
          <img
            src={logo}
            className={`logoimage ${config.navbar.logoImage}`}
            alt="logo"
          />
        </div>
      </div>
      <div className="navbar">
        <div ref={navRef} className={`${config.navbar.displayText}`}>
          <div
            className={`nav-links  ${config.navbar.NavLinkS} ${navlinks ? "show" : "hide"}`}>
            {["About", "Services", "Projects", "Game", "Contact"].map((item) =>
              item.toLowerCase() !== "game" ? (
                <Link
                  className={config.navbar.navLink}
                  key={item}
                  to={`/#${item.toLowerCase()}`}>
                  {item}
                </Link>
              ) : (
                <a
                  className={config.navbar.navLink}
                  key={item}
                  href="https://game.akmadnudin.com">
                  {item}
                </a>
              ),
            )}
          </div>
          <span
            className={`nav-code-tag animate-[symbol-in_300ms_ease-out] ${config.navbar.displayText}`}
            onClick={() => setNavlinks((prev) => !prev)}>
            {navlinks ? "</\\>" : "< / >"}
          </span>
        </div>
        <div ref={menuRef} className={config.navbar.displayImage}>
          <button
            onClick={() => setHamburger((prev) => !prev)}
            className={`nav-hamburger ${hamburger ? "is-open" : ""} ${config.navbar.hamburger}`}
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
          <div
            className={`nav-mobile-menu ${hamburger ? "is-open" : ""} ${config.navbar.menu}`}
            id="nav-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu">
            <div className="menu-backdrop"></div>
            <div className="menu-inner">
              <div className={`menu-status ${config.navbar.menuEyeBrow}`}>
                <span className="menu-status-dot"></span>
                Open to freelance
              </div>
              <ul className={`menu-links`}>
                <li
                  onClick={() => handlerClick("/")}
                  className={`menu-link ${config.navbar.menuLinkList}`}
                  style={{ "--i": "0.05s" } as React.CSSProperties}>
                  <span className="menu-link-left">
                    <span className="menu-link-icon">[~]</span> Home
                  </span>
                  <span className="menu-link-arrow">›</span>
                </li>
                <li
                  onClick={() => handlerClick("/#services")}
                  className={`menu-link ${config.navbar.menuLinkList}`}
                  style={{ "--i": "0.10s" } as React.CSSProperties}>
                  <span className="menu-link-left">
                    <span className="menu-link-icon">[⚙]</span> Services
                  </span>
                  <span className="menu-link-arrow">›</span>
                </li>
                <li
                  onClick={() => handlerClick("/#projects")}
                  className={`menu-link ${config.navbar.menuLinkList}`}
                  style={{ "--i": "0.15s" } as React.CSSProperties}>
                  <span className="menu-link-left">
                    <span className="menu-link-icon">[◈]</span> Projects
                  </span>
                  <span className="menu-link-arrow">›</span>
                </li>
                <a
                  href="https://akmadnudin.com/minigame"
                  className={`menu-link ${config.navbar.menuLinkList}`}
                  style={{ "--i": "0.20s" } as React.CSSProperties}>
                  <span className="menu-link-left">
                    <span className="menu-link-icon">[≡]</span> Game
                  </span>
                  <span className="menu-link-arrow">›</span>
                </a>
                <li
                  onClick={() => handlerClick("/#contact")}
                  className={`menu-link ${config.navbar.menuLinkList}`}
                  style={{ "--i": "0.25s" } as React.CSSProperties}>
                  <span className="menu-link-left">
                    <span className="menu-link-icon">[✉]</span> Contact
                  </span>
                  <span className="menu-link-arrow">›</span>
                </li>
              </ul>

              <div className="menu-bottom">
                <a
                  href="mailto:akmadnudin.inc@gmail.com"
                  className={`menu-cta-primary ${config.button.buttonCta}`}>
                  ✉ Hire Me
                </a>
                <a
                  href="https://github.com/adex-dev"
                  className={`${config.button.buttonCta} menu-cta-secondary`}>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
