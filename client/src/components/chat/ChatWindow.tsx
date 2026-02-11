import { useEffect, useRef } from "react";
import type { ChatMessage as ChatMessageType } from "../../types/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (content: string) => void;
}

export function ChatWindow({
  messages,
  isLoading,
  error,
  onSendMessage,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      <div className="chat-window__messages">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {isLoading && (
          <div className="chat-message chat-message--assistant">
            <div className="chat-message__bubble chat-message__bubble--loading">
              <span className="dot-pulse" />
            </div>
          </div>
        )}
        {error && <div className="chat-window__error">{error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
}
