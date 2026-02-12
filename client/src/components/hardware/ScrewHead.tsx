interface ScrewHeadProps {
  size?: number;
  type?: "phillips" | "flat";
}

export function ScrewHead({ size = 14, type = "phillips" }: ScrewHeadProps) {
  const id = `screw-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="screw-head">
      <defs>
        <radialGradient id={`${id}-metal`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#dddad2" />
          <stop offset="40%" stopColor="#c5c2ba" />
          <stop offset="100%" stopColor="#aaa79f" />
        </radialGradient>
      </defs>

      {/* Outer ring / countersink */}
      <circle cx="10" cy="10" r="9" fill="none" stroke="#c0bdb5" strokeWidth="0.5" />

      {/* Screw body */}
      <circle cx="10" cy="10" r="8" fill={`url(#${id}-metal)`} />

      {/* Inset shadow */}
      <circle cx="10" cy="10.5" r="7.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />

      {/* Highlight rim */}
      <circle cx="10" cy="9.5" r="7.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />

      {type === "phillips" ? (
        <>
          <line x1="10" y1="5.5" x2="10" y2="14.5" stroke="#999690" strokeWidth="1" strokeLinecap="round" />
          <line x1="5.5" y1="10" x2="14.5" y2="10" stroke="#999690" strokeWidth="1" strokeLinecap="round" />
          <line x1="10" y1="6" x2="10" y2="15" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeLinecap="round" />
          <line x1="5.5" y1="10.5" x2="14.5" y2="10.5" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="4.5" y1="10" x2="15.5" y2="10" stroke="#999690" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="4.5" y1="10.5" x2="15.5" y2="10.5" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
