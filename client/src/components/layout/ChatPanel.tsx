import type { ReactNode } from "react";

interface ChatPanelProps {
  children: ReactNode;
}

export function ChatPanel({ children }: ChatPanelProps) {
  return (
    <div className="chat-panel">
      <div className="chat-panel__header">
        <h2 className="chat-panel__title">Atlas</h2>
      </div>
      <div className="chat-panel__content">{children}</div>
    </div>
  );
}
