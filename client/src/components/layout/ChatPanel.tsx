import type { ReactNode } from "react";

interface ChatPanelProps {
  children: ReactNode;
}

export function ChatPanel({ children }: ChatPanelProps) {
  return (
    <div className="chat-panel">
      {/* ATLAS header and LED are in the background image */}
      <div className="chat-panel__header-spacer" />
      <div className="chat-panel__screen">
        {children}
      </div>
    </div>
  );
}
