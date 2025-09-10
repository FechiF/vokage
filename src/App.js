import { useQuiz } from './contexts/QuizContextProvider.js';

import Main from './Main.js';
import StartScreen from './screens/StartScreen.js';
import ShowLevelScreen from './screens/ShowLevelScreen.js';
import FinishScreen from './screens/FinishScreen.js';

import Question from './features/Question';

import Header from './ui/Header.js';
import Loader from './ui/Loader';
import Error from './ui/Error';
import Progress from './ui/Progress';
import NextButton from './ui/NextButton';
import FinishButton from './ui/FinishButton';
import RestartButton from './ui/RestartButton.js';
import Footer from './ui/Footer.js';

import ReviewScreen from './screens/ReviewScreen.js';
import DictionaryModal from './ui/DictionaryModal.js';
import { useEffect } from 'react';
import { useDictionary } from './contexts/DictionaryContextProvider.js';

function App() {
  const { questions, status, index, answer } = useQuiz();
  const { openDictionary } = useDictionary();
  const currentWord = questions[index]?.word;

  const isInCorrect = answer && answer !== questions[index].answer;

  useEffect(
    function () {
      if (isInCorrect) {
        openDictionary(currentWord);
      }
    },
    [isInCorrect, currentWord]
  );

  return (
    <div className="app">
      <Header />
      {status === 'review' && <ReviewScreen />}
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
      </Main>

      <Footer />
      <DictionaryModal />
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
