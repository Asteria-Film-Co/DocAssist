interface SettingsKnobProps {
  size?: number;
  onClick?: () => void;
  indicator?: "triangle" | "red";
}

export function SettingsKnob({ size = 48, onClick, indicator = "triangle" }: SettingsKnobProps) {
  const c = size / 2;
  const r = c * 0.88;

  // Triangle pointer position (points up/toward 12 o'clock by default, rotated to ~10 o'clock)
  const pointerR = r - 6;
  // For "triangle" style, small filled triangle
  // For "red" style, small red rectangle/dash

  return (
    <button
      className="settings-knob"
      onClick={onClick}
      title="Settings"
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Simple thin circle outline — no fill, no gradients */}
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="#8a8880"
          strokeWidth="1"
        />

        {indicator === "triangle" ? (
          /* Small filled triangle pointer near the top */
          <polygon
            points={`${c},${c - pointerR} ${c - 3},${c - pointerR + 5} ${c + 3},${c - pointerR + 5}`}
            fill="#3a3a38"
          />
        ) : (
          /* Small red indicator dash near the top */
          <rect
            x={c - 1.5}
            y={c - pointerR - 1}
            width="3"
            height="6"
            rx="1"
            fill="#c4413a"
          />
        )}
      </svg>
    </button>
  );
}
