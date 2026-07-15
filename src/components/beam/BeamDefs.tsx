export default function BeamDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
    >
      <defs>
        {/* =========================
            Rust
        ========================== */}
        <linearGradient
          id="g-rust"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#E07050" />
          <stop offset="100%" stopColor="#C85E3A" />
        </linearGradient>

        {/* =========================
            Teal
        ========================== */}
        <linearGradient
          id="g-teal"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>

        {/* =========================
            Dual
        ========================== */}
        <linearGradient
          id="g-dual"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="45%" stopColor="#0F9E8E" />
          <stop offset="55%" stopColor="#C85E3A" />
          <stop offset="100%" stopColor="#E07050" />
        </linearGradient>
      </defs>
    </svg>
  );
}