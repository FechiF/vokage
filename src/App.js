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

function App() {
  const { questions, status, index } = useQuiz();
  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status.includes('startingLevel') && <ShowLevelScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            {index < questions.length - 1 && <NextButton />}
            {index === questions.length - 1 && <FinishButton />}
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
