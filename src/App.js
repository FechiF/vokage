import { useEffect, useState } from 'react';

import { useQuiz } from './contexts/QuizContextProvider.js';

import Main from './Main.js';
import StartScreen from './screens/StartScreen.js';
import ShowLevelScreen from './screens/ShowLevelScreen.js';
import FinishScreen from './screens/FinishScreen.js';

import Question from './features/Question';
import DictionaryEntry from './features/Dictionary/DictionaryEntry.js';

import Header from './ui/Header.js';
import Loader from './ui/Loader';
import Error from './ui/Error';
import Progress from './ui/Progress';
import NextButton from './ui/NextButton';
import FinishButton from './ui/FinishButton';
import RestartButton from './ui/RestartButton.js';
import Modal from './ui/Modal.js';
import Footer from './ui/Footer.js';

import { useDictionary } from './contexts/DictionaryContextProvider.js';

function App() {
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const { questions, status, index, answer } = useQuiz();
  const { entry, setWord } = useDictionary();

  const currentWord = questions[index]?.word;

  function closeDictionary() {
    setWord(null);
    setIsDictionaryOpen(false);
  }

  useEffect(
    function () {
      if (answer && answer !== questions[index].answer) {
        setIsDictionaryOpen(true);
        setWord(currentWord);
      }
    },
    [answer, index, questions, currentWord, setWord]
  );

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status.includes('startingLevel') && <ShowLevelScreen />}
        {(status === 'active' || status === 'godMode') && (
          <>
            <Progress />
            <Question />

            {index < questions.length - 1 && (
              <div className="btn-grp">
                <RestartButton />
                <NextButton />
              </div>
            )}
            {index === questions.length - 1 && <FinishButton />}
          </>
        )}
        {status === 'finished' && <FinishScreen />}

        <Modal isOpen={isDictionaryOpen} onClose={closeDictionary}>
          {!entry ? (
            <Loader text="Loading dictionary..." />
          ) : (
            <DictionaryEntry entry={entry} />
          )}
          {entry && (
            <div className="btn-grp">
              {entry?.word !== currentWord && (
                <button
                  className="btn btn-back"
                  onClick={() => {
                    setWord(currentWord);
                  }}
                >
                  Back to {currentWord}
                </button>
              )}
              <button className="btn btn-close-modal" onClick={closeDictionary}>
                Close
              </button>
            </div>
          )}
        </Modal>
      </Main>

      <Footer />

      <div id="modal-root"></div>
    </div>
  );
}

export default App;
