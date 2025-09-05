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

import { DICTIONARY_API_URL } from './utilities/config.js';

function App() {
  const { questions, status, index, answer } = useQuiz();
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [definition, setDefinition] = useState(null);

  function closeDictionary() {
    setIsDictionaryOpen(false);
    setDefinition(null);
  }

  useEffect(
    function () {
      if (answer && answer !== questions[index].answer) {
        setIsDictionaryOpen(true);
        fetch(`${DICTIONARY_API_URL}${questions[index].word}`)
          .then((res) => res.json())
          .then((data) => {
            setDefinition(data[0]);
          });
      }
    },
    [answer, index, questions]
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

        <Modal
          isOpen={isDictionaryOpen}
          onClose={closeDictionary}
          title={questions[index]?.word}
        >
          <DictionaryEntry entry={definition} />

          <button
            className="btn btn-close-dictionary"
            onClick={closeDictionary}
          >
            Close
          </button>
        </Modal>
      </Main>

      <Footer />

      <div id="modal-root"></div>
    </div>
  );
}

export default App;
