import { useQuiz } from '../contexts/QuizContextProvider.js';

function Progress() {
  const { index, questions, points, answer } = useQuiz();

  const numQuestions = questions.length;

  const totalPoints = questions.reduce(
    (sum, question) => sum + (question.points ?? 1),
    0
  );

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <aside>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </aside>

      <aside>
        <strong>{points}</strong>/{totalPoints} points
      </aside>
    </header>
  );
}

export default Progress;
