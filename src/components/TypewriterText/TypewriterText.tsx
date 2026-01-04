import { useTypewriter } from '../../hooks/useTypewriter';
import './TypewriterText.css';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 30,
  onComplete,
  showCursor = true,
}: TypewriterTextProps) {
  const { displayedText, isComplete } = useTypewriter(text, {
    speed,
    onComplete,
  });

  return (
    <span className="typewriter-text">
      {displayedText}
      {showCursor && !isComplete && <span className="typewriter-cursor">▌</span>}
    </span>
  );
}
