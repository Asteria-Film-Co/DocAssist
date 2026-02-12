import type { ReactNode } from "react";
import { DotGrid } from "../hardware/DotGrid";
import { ScrewHead } from "../hardware/ScrewHead";

interface CenterPanelProps {
  children: ReactNode;
}

export function CenterPanel({ children }: CenterPanelProps) {
  return (
    <div className="center-panel">
      {/* Screen bezel frame with screws */}
      <div className="center-panel__bezel">
        <div className="center-panel__screws center-panel__screws--top">
          <ScrewHead size={10} type="flat" />
          <ScrewHead size={10} type="flat" />
        </div>
        <div className="center-panel__screen">
          <DotGrid />
          <div className="center-panel__screen-content">
            {children}
          </div>
        </div>
        <div className="center-panel__screws center-panel__screws--bottom">
          <ScrewHead size={10} type="flat" />
          <ScrewHead size={10} type="flat" />
        </div>
      </div>
    </div>
  );
}
