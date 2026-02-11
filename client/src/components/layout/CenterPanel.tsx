import type { ReactNode } from "react";

interface CenterPanelProps {
  children: ReactNode;
}

export function CenterPanel({ children }: CenterPanelProps) {
  return <div className="center-panel">{children}</div>;
}
