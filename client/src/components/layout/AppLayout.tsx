import type { ReactNode } from "react";
import { RadialVent } from "../hardware/RadialVent";
import { HorizontalSlider } from "../hardware/HorizontalSlider";
import { SettingsKnob } from "../hardware/SettingsKnob";
import { ToggleSwitch } from "../hardware/ToggleSwitch";

interface AppLayoutProps {
  sidebar: ReactNode;
  center: ReactNode;
  chat: ReactNode;
}

export function AppLayout({ sidebar, center, chat }: AppLayoutProps) {
  return (
    <div className="app-layout">
      {/* Top hardware bar */}
      <div className="hardware-bar hardware-bar--top">
        <div className="hardware-bar__left">
          <RadialVent size={50} />
          <div className="hardware-bar__crosshair">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <line x1="12" y1="4" x2="12" y2="20" stroke="#c4413a" strokeWidth="1" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="#c4413a" strokeWidth="1" />
              <circle cx="12" cy="12" r="3" fill="none" stroke="#c4413a" strokeWidth="0.5" />
            </svg>
          </div>
          <SettingsKnob size={44} />
        </div>
        <div className="hardware-bar__center">
          <HorizontalSlider width={200} height={14} />
        </div>
        <div className="hardware-bar__right">
          <SettingsKnob size={44} />
          <ToggleSwitch size={18} />
        </div>
      </div>

      {/* Main content area */}
      <div className="app-layout__content">
        <aside className="app-layout__sidebar">
          {sidebar}
        </aside>
        <main className="app-layout__center">
          {center}
        </main>
        <aside className="app-layout__chat">{chat}</aside>
      </div>

      {/* Bottom hardware bar */}
      <div className="hardware-bar hardware-bar--bottom">
        <div className="hardware-bar__left">
          <RadialVent size={50} />
        </div>
        <div className="hardware-bar__center">
          <HorizontalSlider width={200} height={14} />
        </div>
        <div className="hardware-bar__right">
          <SettingsKnob size={44} />
          <ToggleSwitch size={18} />
        </div>
      </div>
    </div>
  );
}
