import type { ReactNode } from "react";

interface ScreenBezelProps {
  children: ReactNode;
  variant?: "light" | "dark";
}

export function ScreenBezel({ children, variant = "light" }: ScreenBezelProps) {
  const isDark = variant === "dark";

  return (
    <div className={`screen-bezel screen-bezel--${variant}`}>
      {/* Top bezel edge */}
      <div className="screen-bezel__frame">
        {/* Corner screws */}
        <svg className="screen-bezel__corner screen-bezel__corner--tl" width="8" height="8" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="3.5" fill={isDark ? "#2a2825" : "#a8a090"} />
          <circle cx="5" cy="5" r="2.5" fill={isDark ? "#3a3835" : "#b8b0a0"} />
          <line x1="3" y1="5" x2="7" y2="5" stroke={isDark ? "#222" : "#908878"} strokeWidth="0.8" />
        </svg>
        <svg className="screen-bezel__corner screen-bezel__corner--tr" width="8" height="8" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="3.5" fill={isDark ? "#2a2825" : "#a8a090"} />
          <circle cx="5" cy="5" r="2.5" fill={isDark ? "#3a3835" : "#b8b0a0"} />
          <line x1="3" y1="5" x2="7" y2="5" stroke={isDark ? "#222" : "#908878"} strokeWidth="0.8" />
        </svg>
        <svg className="screen-bezel__corner screen-bezel__corner--bl" width="8" height="8" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="3.5" fill={isDark ? "#2a2825" : "#a8a090"} />
          <circle cx="5" cy="5" r="2.5" fill={isDark ? "#3a3835" : "#b8b0a0"} />
          <line x1="3" y1="5" x2="7" y2="5" stroke={isDark ? "#222" : "#908878"} strokeWidth="0.8" />
        </svg>
        <svg className="screen-bezel__corner screen-bezel__corner--br" width="8" height="8" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="3.5" fill={isDark ? "#2a2825" : "#a8a090"} />
          <circle cx="5" cy="5" r="2.5" fill={isDark ? "#3a3835" : "#b8b0a0"} />
          <line x1="3" y1="5" x2="7" y2="5" stroke={isDark ? "#222" : "#908878"} strokeWidth="0.8" />
        </svg>

        {/* Inner content area */}
        <div className="screen-bezel__content">
          {children}
        </div>
      </div>
    </div>
  );
}
