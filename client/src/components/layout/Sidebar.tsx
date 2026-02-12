import type { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
  onSettingsClick: () => void;
}

export function Sidebar({ children, onSettingsClick }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">Restore</h1>
        <button
          className="sidebar__settings-btn"
          onClick={onSettingsClick}
          title="Settings"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M16.5 10a1.5 1.5 0 00.9-2.7l-1-1.7a1.5 1.5 0 00-2.6 0l-.1.2a1.5 1.5 0 01-2.1.5 1.5 1.5 0 01-.8-1.3V4.5A1.5 1.5 0 009.5 3h-1A1.5 1.5 0 007 4.5V5a1.5 1.5 0 01-.8 1.3 1.5 1.5 0 01-1.5 0l-.4-.2a1.5 1.5 0 00-2 .5l-.5.9a1.5 1.5 0 00.5 2l.2.1a1.5 1.5 0 01.7 1.3 1.5 1.5 0 01-.7 1.4l-.2.1a1.5 1.5 0 00-.5 2l.5.9a1.5 1.5 0 002 .5l.4-.2a1.5 1.5 0 011.5 0 1.5 1.5 0 01.8 1.3v.4A1.5 1.5 0 008.5 17h1a1.5 1.5 0 001.5-1.5V15a1.5 1.5 0 01.8-1.3 1.5 1.5 0 011.5 0l.4.2a1.5 1.5 0 002-.5l.5-.9a1.5 1.5 0 00-.5-2l-.2-.1A1.5 1.5 0 0115 9.1a1.5 1.5 0 01.7-1.3z" />
          </svg>
        </button>
      </div>
      <div className="sidebar__subtitle">Photo & Video Effects</div>
      <div className="sidebar__content">{children}</div>
    </div>
  );
}
