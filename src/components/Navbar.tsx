import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className='nav-logo'>AN // dev</div>
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