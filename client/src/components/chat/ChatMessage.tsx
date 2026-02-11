import type { ChatMessage as ChatMessageType } from "../../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`chat-message chat-message--${message.role}`}>
      <div className="chat-message__bubble">{message.content}</div>
    </div>
  );
}
