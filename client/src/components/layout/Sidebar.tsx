import type { ReactNode } from "react";
import { LogoPlate } from "../hardware/LogoPlate";

interface SidebarProps {
  children: ReactNode;
  onSettingsClick: () => void;
}

export function Sidebar({ children, onSettingsClick }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <LogoPlate />
      </div>
      <div className="sidebar__content">{children}</div>
      <div className="sidebar__footer">
        <button className="sidebar__hint-btn" onClick={onSettingsClick}>
          Upload an image to get started
        </button>
      </div>
    </div>
  );
}
