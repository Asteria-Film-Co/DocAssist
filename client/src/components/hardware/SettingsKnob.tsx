interface SettingsKnobProps {
  size?: number;
  onClick?: () => void;
}

export function SettingsKnob({ size = 32, onClick }: SettingsKnobProps) {
  return (
    <button
      className="settings-knob"
      onClick={onClick}
      title="Settings"
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40">
        <defs>
          <radialGradient id="knob-face" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#d8d0c0" />
            <stop offset="50%" stopColor="#b8b0a0" />
            <stop offset="100%" stopColor="#989080" />
          </radialGradient>
          <radialGradient id="knob-shadow" cx="50%" cy="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </radialGradient>
        </defs>

        {/* Drop shadow */}
        <circle cx="20" cy="21" r="16" fill="rgba(0,0,0,0.12)" />

        {/* Outer rim */}
        <circle cx="20" cy="20" r="16" fill="#706858" />

        {/* Knurled edge ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = 20 + 15.5 * Math.cos(angle);
          const y1 = 20 + 15.5 * Math.sin(angle);
          const x2 = 20 + 13.5 * Math.cos(angle);
          const y2 = 20 + 13.5 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#585048"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Face */}
        <circle cx="20" cy="20" r="13" fill="url(#knob-face)" />

        {/* Edge shadow for depth */}
        <circle cx="20" cy="20" r="13" fill="url(#knob-shadow)" />

        {/* Top highlight */}
        <ellipse cx="17" cy="16" rx="6" ry="4" fill="white" opacity="0.12" />

        {/* Pointer notch */}
        <line
          x1="20"
          y1="8"
          x2="20"
          y2="13"
          stroke="#504838"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Notch shadow */}
        <line
          x1="20"
          y1="8.5"
          x2="20"
          y2="13.5"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
