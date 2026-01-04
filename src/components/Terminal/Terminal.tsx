import { ReactNode } from 'react';
import './Terminal.css';

interface TerminalProps {
  children: ReactNode;
}

export function Terminal({ children }: TerminalProps) {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button terminal-button-close"></span>
          <span className="terminal-button terminal-button-minimize"></span>
          <span className="terminal-button terminal-button-maximize"></span>
        </div>
        <div className="terminal-title">nit — Matrix Terminal</div>
        <div className="terminal-spacer"></div>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
