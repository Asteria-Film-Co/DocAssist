import type { ReactElement } from "react";

interface SettingsKnobProps {
  size?: number;
  onClick?: () => void;
}

export function SettingsKnob({ size = 48, onClick }: SettingsKnobProps) {
  const id = `knob-${Math.random().toString(36).slice(2, 7)}`;
  const c = size / 2;
  const outerR = c * 0.92;
  const faceR = c * 0.72;

  // Knurled edge ticks
  const ticks: ReactElement[] = [];
  const tickCount = 36;
  for (let i = 0; i < tickCount; i++) {
    const angle = (i / tickCount) * Math.PI * 2;
    const x1 = c + (outerR - 0.5) * Math.cos(angle);
    const y1 = c + (outerR - 0.5) * Math.sin(angle);
    const x2 = c + (outerR - 3) * Math.cos(angle);
    const y2 = c + (outerR - 3) * Math.sin(angle);
    ticks.push(
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#b0ada5"
        strokeWidth="0.6"
      />
    );
  }

  return (
    <button
      className="settings-knob"
      onClick={onClick}
      title="Settings"
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          {/* Brushed aluminum gradient — linear to simulate brushed metal */}
          <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8e6e0" />
            <stop offset="25%" stopColor="#d5d2ca" />
            <stop offset="50%" stopColor="#e0ddd6" />
            <stop offset="75%" stopColor="#ccc9c0" />
            <stop offset="100%" stopColor="#d8d5cd" />
          </linearGradient>
          <radialGradient id={`${id}-edge-shadow`} cx="50%" cy="55%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
          </radialGradient>
          {/* Specular highlight */}
          <radialGradient id={`${id}-highlight`} cx="38%" cy="35%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Drop shadow */}
        <circle cx={c} cy={c + 1.5} r={outerR} fill="rgba(0,0,0,0.08)" />

        {/* Outer rim */}
        <circle cx={c} cy={c} r={outerR} fill="#a09d95" />

        {/* Knurled edge ticks */}
        {ticks}

        {/* Face with brushed aluminum */}
        <circle cx={c} cy={c} r={faceR} fill={`url(#${id}-face)`} />
        <circle cx={c} cy={c} r={faceR} fill={`url(#${id}-edge-shadow)`} />

        {/* Specular highlight */}
        <circle cx={c} cy={c} r={faceR} fill={`url(#${id}-highlight)`} />

        {/* Rim edge */}
        <circle cx={c} cy={c} r={faceR} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

        {/* Pointer notch — red indicator */}
        <line
          x1={c}
          y1={c - faceR + 3}
          x2={c}
          y2={c - faceR + 8}
          stroke="#c4413a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
