interface ScrewHeadProps {
  size?: number;
  type?: "phillips" | "flat";
}

export function ScrewHead({ size = 14, type = "phillips" }: ScrewHeadProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="screw-head">
      {/* Outer ring / countersink */}
      <circle cx="10" cy="10" r="9" fill="none" stroke="#a09888" strokeWidth="0.5" />

      {/* Screw body with metallic gradient */}
      <defs>
        <radialGradient id="screw-metal" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#c8c0b0" />
          <stop offset="40%" stopColor="#a8a090" />
          <stop offset="100%" stopColor="#888070" />
        </radialGradient>
      </defs>

      <circle cx="10" cy="10" r="8" fill="url(#screw-metal)" />

      {/* Inset shadow */}
      <circle cx="10" cy="10.5" r="7.5" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />

      {/* Highlight rim */}
      <circle cx="10" cy="9.5" r="7.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

      {type === "phillips" ? (
        <>
          {/* Phillips cross */}
          <line x1="10" y1="5" x2="10" y2="15" stroke="#706858" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="5" y1="10" x2="15" y2="10" stroke="#706858" strokeWidth="1.2" strokeLinecap="round" />
          {/* Cross shadow */}
          <line x1="10" y1="5.5" x2="10" y2="15.5" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="5" y1="10.5" x2="15" y2="10.5" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Flat slot */}
          <line x1="4" y1="10" x2="16" y2="10" stroke="#706858" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="10.5" x2="16" y2="10.5" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
