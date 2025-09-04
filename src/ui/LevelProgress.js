import { useQuiz } from '../contexts/QuizContextProvider.js';

function LevelProgress() {
  const { level, levels } = useQuiz();

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
