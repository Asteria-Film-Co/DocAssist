interface ToggleSwitchProps {
  size?: number;
}

export function ToggleSwitch({ size = 32 }: ToggleSwitchProps) {
  const w = size;
  const h = size * 2.2;
  const trackW = w * 0.35;
  const trackH = h * 0.65;
  const thumbH = h * 0.22;
  const cx = w / 2;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="toggle-switch">
      <defs>
        <linearGradient id="toggle-track" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#777" />
          <stop offset="50%" stopColor="#999" />
          <stop offset="100%" stopColor="#777" />
        </linearGradient>
        <linearGradient id="toggle-thumb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f3ee" />
          <stop offset="50%" stopColor="#e8e5dd" />
          <stop offset="100%" stopColor="#ccc9c0" />
        </linearGradient>
      </defs>

      {/* Track / slot */}
      <rect
        x={cx - trackW / 2}
        y={(h - trackH) / 2}
        width={trackW}
        height={trackH}
        rx={trackW / 2}
        fill="url(#toggle-track)"
      />
      {/* Track inner shadow */}
      <rect
        x={cx - trackW / 2 + 1}
        y={(h - trackH) / 2 + 1}
        width={trackW - 2}
        height={trackH * 0.3}
        rx={trackW / 3}
        fill="rgba(0,0,0,0.15)"
      />

      {/* Thumb / actuator (in up position) */}
      <rect
        x={cx - trackW / 2 - 2}
        y={(h - trackH) / 2 + 3}
        width={trackW + 4}
        height={thumbH}
        rx="3"
        fill="url(#toggle-thumb)"
        stroke="#b0ada5"
        strokeWidth="0.5"
      />
      {/* Thumb line */}
      <line
        x1={cx - 3}
        y1={(h - trackH) / 2 + 3 + thumbH / 2}
        x2={cx + 3}
        y2={(h - trackH) / 2 + 3 + thumbH / 2}
        stroke="#aaa7a0"
        strokeWidth="0.8"
      />
    </svg>
  );
}
