interface LedProps {
  color?: "off" | "red" | "amber" | "green";
  size?: number;
  pulse?: boolean;
}

export function Led({ color = "off", size = 10, pulse = false }: LedProps) {
  const id = `led-${color}-${Math.random().toString(36).slice(2, 7)}`;

  const colors = {
    off: { fill: "#4a4740", glow: "none", highlight: "#5a5750" },
    red: { fill: "#e84038", glow: "#ff4040", highlight: "#ff8080" },
    amber: { fill: "#d4940a", glow: "#ffaa00", highlight: "#ffe080" },
    green: { fill: "#4a8c3a", glow: "#50cc40", highlight: "#90ee80" },
  };

  const c = colors[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={`led led--${color}${pulse ? " led--pulse" : ""}`}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="35%" cy="35%">
          <stop offset="0%" stopColor={c.highlight} stopOpacity="0.9" />
          <stop offset="50%" stopColor={c.fill} />
          <stop offset="100%" stopColor={color === "off" ? "#2a2720" : c.fill} stopOpacity="0.8" />
        </radialGradient>
        {color !== "off" && (
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={c.glow} stopOpacity="0.6" />
            <stop offset="100%" stopColor={c.glow} stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {/* Outer metal bezel ring */}
      <circle cx="10" cy="10" r="9.5" fill="none" stroke="#8a857a" strokeWidth="0.5" />
      <circle cx="10" cy="10" r="9" fill="none" stroke="#6a655a" strokeWidth="0.8" />

      {/* Inset shadow ring */}
      <circle cx="10" cy="10" r="7.5" fill="#1a1816" />
      <circle cx="10" cy="11" r="7" fill="#0a0908" opacity="0.3" />

      {/* The LED dome */}
      <circle cx="10" cy="10" r="6.5" fill={`url(#${id}-bg)`} />

      {/* Glass highlight */}
      <ellipse cx="8" cy="7.5" rx="3" ry="2" fill="white" opacity={color === "off" ? "0.06" : "0.2"} />

      {/* Outer glow */}
      {color !== "off" && (
        <circle cx="10" cy="10" r="10" fill={`url(#${id}-glow)`} />
      )}
    </svg>
  );
}
