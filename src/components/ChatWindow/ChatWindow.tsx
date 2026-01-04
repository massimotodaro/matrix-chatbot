import { useAutoScroll } from '../../hooks/useAutoScroll';
import { TypewriterText } from '../TypewriterText/TypewriterText';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import './ChatWindow.css';

export interface Message {
  id: string;
  role: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onTypingComplete?: (messageId: string) => void;
}

export function ChatWindow({
  messages,
  isLoading,
  onTypingComplete,
}: ChatWindowProps) {
  const scrollRef = useAutoScroll<HTMLDivElement>(messages);

  return (
    <div className="chat-window" ref={scrollRef}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message message-${message.role}`}
        >
          <span className="message-prefix">
            {message.role === 'user' && '> '}
            {message.role === 'bot' && '[nit]: '}
            {message.role === 'system' && '[system]: '}
          </span>
          <span className="message-content">
            {message.role === 'bot' && message.isTyping ? (
              <TypewriterText
                text={message.content}
                speed={20}
                onComplete={() => onTypingComplete?.(message.id)}
              />
            ) : (
              message.content
            )}
          </span>
        </div>
      ))}
      {isLoading && (
        <div className="message message-bot">
          <span className="message-prefix">[nit]: </span>
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
}
