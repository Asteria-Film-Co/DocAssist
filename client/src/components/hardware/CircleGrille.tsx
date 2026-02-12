interface CircleGrilleProps {
  size?: number;
}

export function CircleGrille({ size = 80 }: CircleGrilleProps) {
  const c = size / 2;
  const r = c * 0.9;
  const id = `grille-${Math.random().toString(36).slice(2, 7)}`;

  // Generate horizontal lines that fill the circle
  const lines: { y: number; halfWidth: number }[] = [];
  const lineSpacing = 3;
  const lineWeight = 1.5;

  for (let y = c - r + lineSpacing; y < c + r; y += lineSpacing) {
    // Calculate the half-width at this y position using circle equation
    const dy = y - c;
    const halfWidth = Math.sqrt(r * r - dy * dy);
    if (halfWidth > 2) {
      lines.push({ y, halfWidth });
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="circle-grille">
      <defs>
        <clipPath id={id}>
          <circle cx={c} cy={c} r={r} />
        </clipPath>
      </defs>

      {/* Horizontal lines clipped to circle */}
      <g clipPath={`url(#${id})`}>
        {lines.map((line, i) => (
          <line
            key={i}
            x1={c - line.halfWidth}
            y1={line.y}
            x2={c + line.halfWidth}
            y2={line.y}
            stroke="#2a2a28"
            strokeWidth={lineWeight}
          />
        ))}
      </g>
    </svg>
  );
}
