interface HorizontalSliderProps {
  width?: number;
  height?: number;
  position?: number; // 0 to 1, where the thumb sits
}

export function HorizontalSlider({ width = 180, height = 14, position = 0.35 }: HorizontalSliderProps) {
  const trackY = height / 2;
  const trackLeft = 0;
  const trackRight = width;
  const thumbX = trackLeft + (trackRight - trackLeft) * position;
  const thumbW = 14;
  const thumbH = height;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="horizontal-slider">
      {/* Dark portion of track (left of thumb) */}
      <line
        x1={trackLeft}
        y1={trackY}
        x2={thumbX}
        y2={trackY}
        stroke="#3a3a38"
        strokeWidth="2"
      />
      {/* Light portion of track (right of thumb) */}
      <line
        x1={thumbX}
        y1={trackY}
        x2={trackRight}
        y2={trackY}
        stroke="#b5b3ad"
        strokeWidth="2"
      />

      {/* Simple flat rectangular thumb — no gradients */}
      <rect
        x={thumbX - thumbW / 2}
        y={trackY - thumbH / 2}
        width={thumbW}
        height={thumbH}
        rx="2"
        fill="#5a5a58"
      />
    </svg>
  );
}
