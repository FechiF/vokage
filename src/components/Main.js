import Loader from './Loader';
import Error from './Error';
import StartScreen from '../screens/StartScreen.js';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from '../screens/FinishScreen.js';
import FinishButton from './FinishButton';
import { useQuiz } from '../Contexts/QuizContextProvider.js';
import ShowLevelScreen from '../screens/ShowLevelScreen.js';

function Main() {
  const { questions, status, index } = useQuiz();
  return (
    <main>
      <main>
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
      </main>
    </main>
  );
}

export default Main;
