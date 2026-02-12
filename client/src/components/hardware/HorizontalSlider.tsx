interface HorizontalSliderProps {
  width?: number;
  height?: number;
}

export function HorizontalSlider({ width = 180, height = 16 }: HorizontalSliderProps) {
  const trackY = height / 2;
  const thumbWidth = 20;
  const thumbHeight = height;
  // Position thumb at about 60% along track
  const thumbX = width * 0.58;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="horizontal-slider">
      <defs>
        <linearGradient id="slider-track-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#888" />
          <stop offset="50%" stopColor="#aaa" />
          <stop offset="100%" stopColor="#999" />
        </linearGradient>
        <linearGradient id="slider-thumb-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0eee8" />
          <stop offset="40%" stopColor="#e0ddd5" />
          <stop offset="100%" stopColor="#c8c5bc" />
        </linearGradient>
      </defs>

      {/* Track groove */}
      <rect
        x="10"
        y={trackY - 1.5}
        width={width - 20}
        height="3"
        rx="1.5"
        fill="#666"
      />
      {/* Track highlight */}
      <rect
        x="10"
        y={trackY - 0.5}
        width={width - 20}
        height="1"
        rx="0.5"
        fill="rgba(255,255,255,0.15)"
      />

      {/* Thumb / slider knob */}
      <rect
        x={thumbX - thumbWidth / 2}
        y={trackY - thumbHeight / 2}
        width={thumbWidth}
        height={thumbHeight}
        rx="3"
        fill="url(#slider-thumb-grad)"
        stroke="#b0ada5"
        strokeWidth="0.5"
      />
      {/* Thumb center groove */}
      <line
        x1={thumbX}
        y1={trackY - 3}
        x2={thumbX}
        y2={trackY + 3}
        stroke="#a09d95"
        strokeWidth="0.8"
      />
    </svg>
  );
}
