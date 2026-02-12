import type { ReactNode } from "react";
import { LogoPlate } from "../hardware/LogoPlate";
import { SettingsKnob } from "../hardware/SettingsKnob";
import { VentSlots } from "../hardware/VentSlots";

interface SidebarProps {
  children: ReactNode;
  onSettingsClick: () => void;
}

export function Sidebar({ children, onSettingsClick }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <LogoPlate />
        <SettingsKnob size={30} onClick={onSettingsClick} />
      </div>
      <div className="sidebar__divider">
        <span className="sidebar__divider-label">Photo & Video Effects</span>
        <span className="sidebar__divider-line" />
      </div>
      <div className="sidebar__content">{children}</div>
      <div className="sidebar__footer">
        <VentSlots count={4} width={50} height={14} />
      </div>
    </div>
  );
}
