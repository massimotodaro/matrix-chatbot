import { useState, useCallback } from 'react';
import { sendMessage as apiSendMessage } from '../services/api';
import { mockSendMessage } from '../services/mockApi';
import type { Message } from '../components/ChatWindow/ChatWindow';

// Set to false to use real API, true for mock responses
const USE_MOCK = false;

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'system',
  content: 'Connection established. Welcome to the Matrix. Type a message to begin...',
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      let reply: string;

      if (USE_MOCK) {
        reply = await mockSendMessage(content);
      } else {
        const response = await apiSendMessage({ message: content });
        reply = response.reply;
      }

      // Add bot message with typing state
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'bot',
        content: reply,
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);

      // Add error message to chat
      const errorBotMessage: Message = {
        id: crypto.randomUUID(),
        role: 'system',
        content: `Error: ${errorMessage}. The Matrix is experiencing interference.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markTypingComplete = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isTyping: false } : msg
      )
    );
  }, []);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    markTypingComplete,
    clearChat,
  };
}
