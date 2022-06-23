import React, { useEffect,useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Blob from './script/components/blob';
import Answer from './script/components/answer';

const App = () => {
  const [allowed, setAllowed] = useState<boolean>(true);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({
        continuous: true,
        language: 'ru-RU',
      })
    }
    else {
      alert('Ваш браузер не поддерживает Web Speech API')
    }
    setAllowed(false)
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout = setTimeout(() => {
      if (allowed) {
        if (transcript.split(' ')[transcript.split(' ').length - 1].toLocaleLowerCase() === 'подскажи') {
          setAnswer(true)
          setTimeout(() => {
            setAnswer(false)
          }, 2000)
        }
        setAllowed(false);
      }
    }, 2000);
    if (!allowed && transcript.toLocaleLowerCase().includes('лиля')) {
      setAllowed(true);
      resetTranscript();
    }
    return () => clearTimeout(timer)
  }, [transcript])

  return (
    <div className="App">
      {answer && <Answer />}
      <Blob ready={allowed} />
      <div>
        {allowed ? 'Текст ' + transcript : `Скажите 'Лиля'`}
      </div>
    </div>
  );
}

export default App;