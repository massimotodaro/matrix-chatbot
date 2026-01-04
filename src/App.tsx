import { MatrixRain } from './components/MatrixRain/MatrixRain';
import { CRTOverlay } from './components/CRTOverlay/CRTOverlay';
import { Terminal } from './components/Terminal/Terminal';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { InputField } from './components/InputField/InputField';
import { useChat } from './hooks/useChat';
import './App.css';

function App() {
  const { messages, isLoading, sendMessage, markTypingComplete } = useChat();

  return (
    <div className="app">
      <MatrixRain />
      <Terminal>
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onTypingComplete={markTypingComplete}
        />
        <InputField onSubmit={sendMessage} disabled={isLoading} />
      </Terminal>
      <CRTOverlay />
    </div>
  );
}

export default App;
