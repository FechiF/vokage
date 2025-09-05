import Loader from '../ui/Loader.js';
import { useQuiz } from '../contexts/QuizContextProvider.js';
import ShowLevelScreen from '../screens/ShowLevelScreen.js';
import Instructions from '../ui/Instructions.js';

function StartScreen() {
  const { dispatch, level, levels } = useQuiz();

  if (level === null) return <Loader />;

  if (level > 0) {
    return (
      <div className="start">
        {level < levels.length && (
          <>
            <h2>Welcome back!</h2>
            <p>
              Keep training, young shinobi, and see if you can reach Hokage
              status. Your current level is:
            </p>
          </>
        )}

        <ShowLevelScreen />
      </div>
    );
  }

  return (
    <div className="start">
      <h2>Welcome to Vocabulary Hokage!</h2>
      <Instructions />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start', payload: 0 })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
