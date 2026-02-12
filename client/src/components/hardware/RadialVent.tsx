import type { ReactElement } from "react";

interface RadialVentProps {
  size?: number;
}

export function RadialVent({ size = 48 }: RadialVentProps) {
  const center = size / 2;
  const dots: ReactElement[] = [];

  // Create concentric rings of dots
  const rings = [
    { r: size * 0.08, count: 1 },
    { r: size * 0.16, count: 6 },
    { r: size * 0.24, count: 10 },
    { r: size * 0.32, count: 14 },
    { r: size * 0.40, count: 20 },
    { r: size * 0.48, count: 24 },
  ];

  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 - Math.PI / 2;
      const x = center + ring.r * Math.cos(angle);
      const y = center + ring.r * Math.sin(angle);
      const dotSize = ri === 0 ? 1.2 : 0.9;
      dots.push(
        <circle
          key={`${ri}-${i}`}
          cx={x}
          cy={y}
          r={dotSize}
          fill="#9a9590"
        />
      );
    }
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="radial-vent">
      {dots}
    </svg>
  );
}
