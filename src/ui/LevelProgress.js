import { useQuiz } from '../contexts/QuizContextProvider.js';

function LevelProgress() {
  const { level, levels } = useQuiz();

  const NumLevels = levels.length;

  return (
    <header className="progress">
      <progress max={NumLevels} value={level} />

      <aside>
        <strong>{level}</strong>/{NumLevels} levels
      </aside>
    </header>
  );
}

export default LevelProgress;
