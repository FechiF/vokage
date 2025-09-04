import { useQuiz } from '../Contexts/QuizContextProvider.js';
import { useAuth } from '../Contexts/AuthContextProvider.js';

function LevelProgress() {
  const { level } = useQuiz();
  const { levels } = useAuth();

  const NumLevels = levels.length;

  return (
    <header className="progress">
      <progress max={NumLevels} value={level} />

      <p>
        <strong>{level}</strong>/{NumLevels} levels
      </p>
    </header>
  );
}

export default LevelProgress;
