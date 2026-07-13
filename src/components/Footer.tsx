import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="px-16 py-8 border-t border-[#1F2D45] flex justify-between items-center">
      <div className="font-mono text-[0.72rem] text-[#8B98B0]">
        © 2025 Akmad Nudin. All rights reserved.
      </div>
      <div className="font-mono text-[0.72rem] text-[#8B98B0]">
        Built with <span className="text-[#C85E3A]">♥</span> & Rust in progress
      </div>
    </footer>
  );
};

export default Footer;