import { useSpeechSynthesis } from 'react-speech-kit';

export default function App() {
  const value = 'Good morning';
  const { speak } = useSpeechSynthesis();

  return (
    <div>
      <button onClick={() => speak({ text: value })}>Speak</button>
    </div>
  );
}
