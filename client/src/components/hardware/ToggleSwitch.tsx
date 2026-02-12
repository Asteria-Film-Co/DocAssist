interface ToggleSwitchProps {
  size?: number;
}

export function ToggleSwitch({ size = 32 }: ToggleSwitchProps) {
  const w = size;
  const h = size * 2.2;
  const trackW = w * 0.3;
  const trackH = h * 0.6;
  const thumbH = h * 0.2;
  const cx = w / 2;
  const trackTop = (h - trackH) / 2;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="toggle-switch">
      {/* Simple flat track — no gradients */}
      <rect
        x={cx - trackW / 2}
        y={trackTop}
        width={trackW}
        height={trackH}
        rx={trackW / 2}
        fill="#8a8880"
      />

      {/* Simple flat thumb (in up position) — no gradients */}
      <rect
        x={cx - trackW / 2 - 2}
        y={trackTop + 3}
        width={trackW + 4}
        height={thumbH}
        rx="2"
        fill="#d5d3cd"
        stroke="#a5a39d"
        strokeWidth="0.5"
      />
    </svg>
  );
}
