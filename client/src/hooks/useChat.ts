import { useState, useCallback } from "react";
import type { ChatMessage } from "../types/chat";
import { api } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your documentary research assistant. I can help with historical research, fact-checking, archival sourcing, and storytelling advice. What are you working on?",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string, imageId?: string | null) => {
      const userMessage: ChatMessage = {
        role: "user",
        content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Send full conversation history (without timestamps) to API
        const allMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const result = await api.sendChat(allMessages, imageId);

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: result.response,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to send message";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your documentary research assistant. I can help with historical research, fact-checking, archival sourcing, and storytelling advice. What are you working on?",
        timestamp: Date.now(),
      },
    ]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
