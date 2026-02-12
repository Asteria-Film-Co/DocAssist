import type { ReactNode } from "react";
import { Led } from "../hardware/Led";
import { Scanlines } from "../hardware/Scanlines";

interface ChatPanelProps {
  children: ReactNode;
}

export function ChatPanel({ children }: ChatPanelProps) {
  return (
    <div className="chat-panel">
      <div className="chat-panel__bezel">
        {/* Header bar with LED and title */}
        <div className="chat-panel__header">
          <Led color="green" size={10} />
          <h2 className="chat-panel__title">Atlas</h2>
          <span className="chat-panel__status">Online</span>
        </div>

        {/* The "screen" area */}
        <div className="chat-panel__screen">
          <Scanlines />
          <div className="chat-panel__screen-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
