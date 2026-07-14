import React,{useState,useEffect} from 'react';
import clsx from "clsx";
import logo_an from '../assets/logo_an.svg'
const Navbar: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
  const handleScroll = () => {
    const shouldBeFixed = window.scrollY > 2;

    setIsFixed((prev) =>
      prev !== shouldBeFixed ? shouldBeFixed : prev
    );
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <nav className={clsx( isFixed ? "fixed top-0 left-0":'static')}>
      <div className='nav-logo'><img src={logo_an} alt="logo" />AN // dev</div>
      <div className='nav-links'>
        {['About', 'Services', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;