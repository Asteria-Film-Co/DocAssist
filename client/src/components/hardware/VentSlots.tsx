interface VentSlotsProps {
  count?: number;
  width?: number;
  height?: number;
}

export function VentSlots({ count = 5, width = 60, height = 20 }: VentSlotsProps) {
  const slotHeight = height / (count * 2 - 1);
  const slotWidth = width * 0.85;
  const startX = (width - slotWidth) / 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="vent-slots">
      {Array.from({ length: count }).map((_, i) => {
        const y = i * slotHeight * 2;
        return (
          <g key={i}>
            {/* Shadow beneath slot */}
            <rect
              x={startX}
              y={y + 0.5}
              width={slotWidth}
              height={slotHeight}
              rx={slotHeight / 2}
              fill="rgba(0,0,0,0.2)"
            />
            {/* The slot */}
            <rect
              x={startX}
              y={y}
              width={slotWidth}
              height={slotHeight}
              rx={slotHeight / 2}
              fill="#9a9488"
            />
            {/* Inner shadow */}
            <rect
              x={startX + 1}
              y={y}
              width={slotWidth - 2}
              height={slotHeight * 0.4}
              rx={slotHeight / 4}
              fill="rgba(0,0,0,0.12)"
            />
          </g>
        );
      })}
    </svg>
  );
}
