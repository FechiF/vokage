import Header from './ui/Header.js';
import Main from './Main.js';
import Loader from './ui/Loader';
import Error from './ui/Error';
import StartScreen from './screens/StartScreen.js';
import Question from './features/Question';
import NextButton from './ui/NextButton';
import Progress from './ui/Progress';
import FinishScreen from './screens/FinishScreen.js';
import FinishButton from './ui/FinishButton';
import { useQuiz } from './contexts/QuizContextProvider.js';
import ShowLevelScreen from './screens/ShowLevelScreen.js';
import RestartButton from './ui/RestartButton.js';
import Modal from './ui/Modal.js';
import { useEffect, useState } from 'react';
import Footer from './ui/Footer.js';
import DictionaryEntry from './features/Dictionary/DictionaryEntry.js';

function App() {
  const { questions, status, index, answer } = useQuiz();
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [definition, setDefinition] = useState('');

  const closeDictionary = () => setIsDictionaryOpen(false);

  useEffect(
    function () {
      if (answer && answer !== questions[index].answer) {
        setIsDictionaryOpen(true);
        fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${questions[index].word}`
        )
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
        </Modal>
      </Main>

      <Footer />

      <div id="modal-root"></div>
    </div>
  );
}

export default App;
