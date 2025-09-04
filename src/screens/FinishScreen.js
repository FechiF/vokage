import { useQuiz } from '../Contexts/QuizContextProvider.js';
function FinishScreen() {
  const { points, questions, highScore, dispatch } = useQuiz();
  const maxPossiblePoints = questions.reduce(
    (sum, question) => sum + (question.points ?? 1),
    0
  );

  const percentage = Math.round((points / maxPossiblePoints) * 100, 0);

  return (
    <>
      <p className="result">
        {points > 8 && `You're almost there!`}You scored{' '}
        <strong>{points}</strong> out of {maxPossiblePoints} ({percentage}%)
      </p>
      <p className="highscore">( Highscore: {highScore} points )</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Try again
      </button>
    </>
  );
}

export default FinishScreen;
