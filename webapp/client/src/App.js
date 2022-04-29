import React, { useState, useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';

export default function App() {
  // const [data, setData] = useState([]);
  const [voiceCommand, setVoiceCommand] = useState('');

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // useEffect(() => {
  //   try {
  //     fetch('http://localhost:8000/api/commands')
  //       .then((res) => res.json())

  //       .then((data) => setData(data));
  //   } catch (error) {
  //     console.log('Error fetching data: ' + error);
  //   }
  // }, []);
  console.log(voiceCommand);

  // useEffect(() => {
  //   try {
  //     fetch('http://localhost:8000/api/commands', {
  //       method: 'POST',

  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(voiceCommand),
  //     })
  //       .then((res) => res.json())
  //       .then((myRes) => console.log(myRes));
  //   } catch (error) {
  //     console.log('Error posting data: ' + error);
  //   }
  // }, [voiceCommand]);

  // console.log(data);
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className='min-h-screen flex justify-center items-center bg-indigo-400'>
      <div className='flex flex-col justify-center'>
        <h1 className='uppercase text-3xl bold text-white text-center'>
          Recording: {isRecording.toString()}
        </h1>
        <button
          className='bg-white text-indigo-400 px-4 py-2 rounded border-white border-2 transition hover:bg-indigo-400 hover:text-white'
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <ul>
          {results.map((result) => {
            try {
              fetch('http://localhost:8000/api/commands', {
                method: 'POST',

                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: result.transcript }),
              })
                .then((res) => res.json())
                .then((myRes) => console.log(myRes));
            } catch (error) {
              console.log('Error posting data: ' + error);
            }
            return <li key={result.timestamp}>{result.transcript}</li>;
          })}
          {interimResult && <li>{interimResult}</li>}
        </ul>
      </div>
    </div>
  );
}
