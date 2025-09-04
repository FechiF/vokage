import Loader from '../ui/Loader.js';
import { useQuiz } from '../contexts/QuizContextProvider.js';
import ShowLevelScreen from '../screens/ShowLevelScreen.js';

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
      <p>
        <strong>Instructions:</strong> To move up in the ninja world, you must
        earn a perfect score on each level. Think of it like training your jutsu
        — you’ve got to master it completely before advancing! You can practice
        as many times as you need — just like Naruto never gives up.
      </p>
      <p>
        With each level you pass, your character grows stronger and ranks up:
        <br />
        Genin → Chunin → Jonin → Hokage → Legendary Ninja
      </p>
      <p>
        Keep training, young shinobi, and see if you can reach Hokage status.
        Believe it!
      </p>
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
