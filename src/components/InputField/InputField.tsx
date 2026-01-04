import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import './InputField.css';

interface InputFieldProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export function InputField({ onSubmit, disabled = false }: InputFieldProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input on mount and when enabled
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="input-field">
      <span className="input-prompt">nit@matrix:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? 'Awaiting response...' : 'Enter command...'}
        spellCheck={false}
        autoComplete="off"
        className="input-text"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        className="input-submit"
        aria-label="Send message"
      >
        ⏎
      </button>
    </div>
  );
}
