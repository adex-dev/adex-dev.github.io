import { useEffect, useState } from "react";

const ClampCalculator = () => {
  // State untuk input
  const [width1] = useState(401);
  const [padding1] = useState(36); // 2.25rem = 36px
  const [width2] = useState(480);
  const [padding2] = useState(56); // 3.5rem = 56px

  useEffect(() => {
    // Hitung VW
    const m = (padding2 - padding1) / (width2 - width1);
    const vw = m * 100;
    const b = padding1 - m * width1;

    // Hasil
    const minRem = padding1 / 16;
    const maxRem = padding2 / 16;
    const clamp = `clamp(${minRem.toFixed(2)}rem, ${vw.toFixed(2)}vw, ${maxRem.toFixed(2)}rem)`;

    // LOG
    console.log("📐 VW =", vw.toFixed(4) + "vw");
    console.log("✅ Clamp =", clamp);
    console.log("📊 Verifikasi:");

    const mid = (width1 + width2) / 2;
    console.log(
      `  ${mid}px → ${(m * mid + b).toFixed(1)}px (≈${((m * mid + b) / 16).toFixed(2)}rem)`,
    );
  }, [width1, padding1, width2, padding2]);
  return (
    <div className='clamp-calculator'>
      <h1>🔢 CSS Clamp Calculator</h1>
    </div>
  );
};

export default ClampCalculator;
