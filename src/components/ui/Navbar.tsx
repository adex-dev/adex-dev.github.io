import logo from "@assets/logo.svg";
import logo_an from "@assets/logo_an.svg";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
const Navbar: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [hamburger, setHamburger] = useState(false);
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

  return (
    <nav className={clsx(isFixed ? "fixed top-0 left-0" : "relative")}>
      <div className='nav-logo cursor-pointer' onClick={() => navigate(`/`)}>
        <div className='logo-text'>
          <img src={logo_an} alt='logo' />
          AN // dev
        </div>
        <div className='logoimage'>
          <img src={logo} alt='logo' />
        </div>
      </div>
      <div className='navbar'>
        <div className='nav-links'>
          {["About", "Services", "Projects", "Game", "Contact"].map((item) =>
            item.toLowerCase() !== "game" ? (
              <Link key={item} to={`/#${item.toLowerCase()}`}>
                {item}
              </Link>
            ) : (
              <a key={item} href='https://akmadnudin.com/minigame'>
                {item}
              </a>
            ),
          )}
        </div>
        <div ref={menuRef}>
          <button
            onClick={() => setHamburger((prev) => !prev)}
            className={`nav-hamburger ${hamburger ? "is-open" : ""}`}
            id='nav-ham'
            aria-label='Toggle navigation'
            aria-expanded={hamburger}
            aria-controls='nav-mobile'
          >
            <span className='ham-lines' aria-hidden='true'>
              <span className='ham-line'></span>
              <span className='ham-line'></span>
              <span className='ham-line'></span>
            </span>
          </button>
          <div
            className={`nav-mobile-menu ${hamburger ? "is-open" : ""}`}
            id='nav-mobile'
            role='dialog'
            aria-modal='true'
            aria-label='Navigation menu'
          >
            <div className='menu-backdrop'></div>
            <div className='menu-inner'>
              <div className='menu-status'>
                <span className='menu-status-dot'></span>
                Open to freelance
              </div>
              <ul className='menu-links'>
                <li
                  onClick={() => handlerClick("/")}
                  className='menu-link'
                  style={{ "--i": "0.05s" } as React.CSSProperties}
                >
                  <span className='menu-link-left'>
                    <span className='menu-link-icon'>[~]</span> Home
                  </span>
                  <span className='menu-link-arrow'>›</span>
                </li>
                <li
                  onClick={() => handlerClick("/#services")}
                  className='menu-link'
                  style={{ "--i": "0.10s" } as React.CSSProperties}
                >
                  <span className='menu-link-left'>
                    <span className='menu-link-icon'>[⚙]</span> Services
                  </span>
                  <span className='menu-link-arrow'>›</span>
                </li>
                <li
                  onClick={() => handlerClick("/#projects")}
                  className='menu-link'
                  style={{ "--i": "0.15s" } as React.CSSProperties}
                >
                  <span className='menu-link-left'>
                    <span className='menu-link-icon'>[◈]</span> Projects
                  </span>
                  <span className='menu-link-arrow'>›</span>
                </li>
                <a
                  href='https://akmadnudin.com/minigame'
                  className='menu-link'
                  style={{ "--i": "0.20s" } as React.CSSProperties}
                >
                  <span className='menu-link-left'>
                    <span className='menu-link-icon'>[≡]</span> Game
                  </span>
                  <span className='menu-link-arrow'>›</span>
                </a>
                <li
                  onClick={() => handlerClick("/#contact")}
                  className='menu-link'
                  style={{ "--i": "0.25s" } as React.CSSProperties}
                >
                  <span className='menu-link-left'>
                    <span className='menu-link-icon'>[✉]</span> Contact
                  </span>
                  <span className='menu-link-arrow'>›</span>
                </li>
              </ul>

              <div className='menu-bottom'>
                <a
                  href='mailto:akmadnudin.inc@gmail.com'
                  className='menu-cta-primary'
                >
                  ✉ Hire Me
                </a>
                <a
                  href='https://github.com/adex-dev'
                  className='menu-cta-secondary'
                >
                  {} GitHub
                </a>
                <div className='menu-social'>
                  <a href='https://www.linkedin.com/in/akmadnudin'>LinkedIn</a>
                  <span className='menu-social-dot'></span>
                  <a href='https://akmadnudin.com'>akmadnudin.com</a>
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
