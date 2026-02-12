import type { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
  onSettingsClick: () => void;
}

export function Sidebar({ children, onSettingsClick }: SidebarProps) {
  return (
    <div className="sidebar">
      {/* The "RESTORE" text and decorative hardware are in the background image */}
      {/* We just need a clickable zone for the settings knob */}
      <button
        className="sidebar__settings-hotspot"
        onClick={onSettingsClick}
        title="Settings"
        aria-label="Settings"
      />
      <div className="sidebar__content">{children}</div>
    </div>
  );
}
