import type { ReactNode } from "react";
import { RadialVent } from "../hardware/RadialVent";
import { CircleGrille } from "../hardware/CircleGrille";
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
          <HorizontalSlider width={160} height={14} position={0.25} />
        </div>
        <div className="hardware-bar__center">
          <CircleGrille size={70} />
        </div>
        <div className="hardware-bar__right">
          <SettingsKnob size={44} indicator="triangle" />
          <SettingsKnob size={44} indicator="red" />
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
          <HorizontalSlider width={240} height={14} position={0.65} />
        </div>
        <div className="hardware-bar__right">
          <SettingsKnob size={44} indicator="triangle" />
          <ToggleSwitch size={16} />
        </div>
      </div>
    </div>
  );
}
