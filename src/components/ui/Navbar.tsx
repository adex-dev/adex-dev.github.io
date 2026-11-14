import logo from "@assets/logo.svg";
import logo_an from "@assets/logo_an.svg";
import { useResponsive } from "@responsive/useResponsive";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
const Navbar: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [navlinks, setNavlinks] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [hashPoint, setHash] = useState(
    typeof window === "undefined" ? "" : window.location.hash,
  );
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

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!hamburger) return;
    document.querySelector<HTMLAnchorElement>("#nav-mobile a")?.focus();
  }, [hamburger]);

  const handleMobileMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setHamburger(false);
      document.getElementById("nav-ham")?.focus();
      return;
    }
    if (event.key !== "Tab") return;

    const links = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("a[href]"),
    );
    const first = links[0];
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };


  const { config } = useResponsive();
  return (
    <>
      <nav
        aria-label="Main navigation"
        className={clsx(
          isFixed ? "fixed top-0 left-0 px-6!" : "relative ",
          config.navbar.nav,
        )}>
        <Link to="/" className="nav-logo" aria-label="Akmad Nudin home">
          <div className={`logo-text ${config.navbar.displayText}`}>
            <img loading="lazy"
              src={logo_an}
              className={`${config.navbar.logoTextImage}`}
              alt=""
            />
            <span className="nav-brand-an">AN</span>
            <span className="nav-brand-rest">&nbsp;//&nbsp;dev</span>
            <span className="nav-brand-line"></span>
          </div>
          <div className={config.navbar.displayImage}>
            <img loading="lazy"
              src={logo}
              className={`logoimage ${config.navbar.logoImage}`}
              alt=""
            />
          </div>
        </Link>
        <div className="navbar">
          <div ref={navRef} className={`${config.navbar.displayText}`}>
            <div
              id="nav-links"
              className={`nav-links  ${config.navbar.NavLinkS} ${navlinks ? "show" : "hide"}`}>
              {["About", "Services", "Projects", "Game", "Contact"].map(
                (item) =>
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
                      href="https://game.akmadnudin.com"
                      target="_blank"
                      rel="noopener noreferrer">
                      {item}
                    </a>
                  ),
              )}
            </div>
            <button
              className={`nav-code-tag animate-[symbol-in_300ms_ease-out] ${config.navbar.displayText}`}
              aria-label={navlinks ? "Hide navigation links" : "Show navigation links"}
              aria-expanded={navlinks}
              aria-controls="nav-links"
              onClick={() => setNavlinks((prev) => !prev)}>
              {navlinks ? "</\\>" : "< / >"}
            </button>
          </div>
          <div ref={menuRef} className={config.navbar.displayImage}>
              <div className={`menu-status  ${config.navbar.menuEyeBrow}`}>
                  <span className="menu-status-dot text-xs2"></span>
                  Open to freelance
                </div>
            <button
              onClick={() => setHamburger((prev) => !prev)}
              className={` nav-hamburger ${hamburger ? "is-open" : ""} ${config.navbar.hamburger}`}
              id="nav-ham"
              aria-label={hamburger ? "Close navigation menu" : "Open navigation menu"}
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
              aria-hidden={!hamburger}
              inert={!hamburger}
              role="navigation"
              aria-label="Mobile navigation"
              onKeyDown={handleMobileMenuKeyDown}>
              <div className="menu-backdrop"></div>
              <div className="menu-inner">
                <div className={`menu-status ${config.navbar.menuEyeBrow}`}>
                  <span className="menu-status-dot"></span>
                  Open to freelance
                </div>
                <ul className="menu-links list-none p-0">
                  <li><Link to="/#about" className="menu-link" onClick={() => setHamburger(false)}>
                    <span className="menu-link-left"><span className="menu-link-icon">[≡]</span> About</span><span className="menu-link-arrow">›</span>
                  </Link></li>
                  <li><Link to="/#services" className="menu-link" onClick={() => setHamburger(false)}>
                    <span className="menu-link-left"><span className="menu-link-icon">[≡]</span> Services</span><span className="menu-link-arrow">›</span>
                  </Link></li>
                  <li><Link to="/project-list" className="menu-link" onClick={() => setHamburger(false)}>
                    <span className="menu-link-left"><span className="menu-link-icon">[≡]</span> Projects</span><span className="menu-link-arrow">›</span>
                  </Link></li>
                  <li><Link to="/experience" className="menu-link" onClick={() => setHamburger(false)}>
                    <span className="menu-link-left"><span className="menu-link-icon">[≡]</span> Experience</span><span className="menu-link-arrow">›</span>
                  </Link></li>
                  <li><Link to="/#contact" className="menu-link" onClick={() => setHamburger(false)}>
                    <span className="menu-link-left"><span className="menu-link-icon">[≡]</span> Contact</span><span className="menu-link-arrow">›</span>
                  </Link></li>
                  <li><a
                    href="https://game.akmadnudin.com/"
                    className={`menu-link ${config.navbar.menuLinkList}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ "--i": "0.20s" } as React.CSSProperties}>
                    <span className="menu-link-left">
                      <span className="menu-link-icon">[≡]</span> Game
                    </span>
                    <span className="menu-link-arrow">›</span>
                  </a></li>
                </ul>

                <div className="menu-bottom">
                  <a
                    href="mailto:akmadnudin.inc@gmail.com"
                    className={`menu-cta-primary ${config.button.buttonCta}`}>
                    ✉ Hire Me
                  </a>
                  <a
                    href="https://github.com/adex-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${config.button.buttonCta} menu-cta-secondary`}>
                    {} GitHub
                  </a>
                  <div className="menu-social">
                    <a href="https://www.linkedin.com/in/akmadnudin" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                    <span className="menu-social-dot"></span>
                    <a href="https://akmadnudin.com">akmadnudin.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={`bottom-nav ${config.navbar.displayText==='hidden' ? '' : 'hidden'}`}>
        <div className="mobileNav">
          <Link
            to="/"
            onClick={() => setHash('')}
            className={`mobileNav-item ${hashPoint === "" ? "activeMobile" : ""}`}>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>Overview</span>
          </Link>

          <Link
            to="/#projects"
            onClick={() => setHash('#projects')}
            className={`mobileNav-item ${hashPoint === "#projects" ? "activeMobile" : ""}`}>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <line x1="12" y1="11" x2="12" y2="11" />
              <line x1="16" y1="11" x2="16" y2="11" />
              <line x1="8" y1="11" x2="8" y2="11" />
            </svg>
            <span>Projects</span>
          </Link>

          <Link
            to="/#services"
            onClick={() => setHash('#services')}
            className={`mobileNav-item ${hashPoint === "#services" ? "activeMobile" : ""}`}>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span>Services</span>
          </Link>

          <Link
            to="/#contact"
            onClick={() => setHash('#contact')}
            className={`mobileNav-item ${hashPoint === "#contact" ? "activeMobile" : ""}`}>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Hire Me</span>
          </Link>

          <div className="home-indicator"></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
