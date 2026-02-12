export function LogoPlate() {
  return (
    <div className="logo-plate">
      <svg width="140" height="28" viewBox="0 0 140 28" className="logo-plate__svg">
        <defs>
          <linearGradient id="logo-emboss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </linearGradient>
          <linearGradient id="logo-text-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a3530" />
            <stop offset="100%" stopColor="#a83830" />
          </linearGradient>
        </defs>

        {/* Embossed plate background */}
        <rect x="0" y="4" width="140" height="20" rx="3" fill="rgba(0,0,0,0.04)" />
        <rect x="0" y="3.5" width="140" height="20" rx="3" fill="url(#logo-emboss)" />

        {/* Text — using SVG text for crisp rendering */}
        <text
          x="70"
          y="19"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="14"
          fontWeight="800"
          letterSpacing="4"
          fill="url(#logo-text-fill)"
        >
          RESTORE
        </text>

        {/* Text shadow for embossed effect */}
        <text
          x="70"
          y="19.7"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="14"
          fontWeight="800"
          letterSpacing="4"
          fill="rgba(0,0,0,0.08)"
        >
          RESTORE
        </text>
      </svg>
    </div>
  );
}
