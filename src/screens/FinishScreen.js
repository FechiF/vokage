import { useQuiz } from '../contexts/QuizContextProvider.js';
import ResumeLevelButton from '../ui/ResumeLevelButton.js';
import ReviewLevelsButton from '../ui/ReviewLevelsButton.js';
import { NUMBER_OF_QUESTIONS_PER_LEVEL } from '../utilities/config.js';
function FinishScreen() {
  const { points, questions, highScore, dispatch, storedLevel, level } =
    useQuiz();
  const maxPossiblePoints = questions.reduce(
    (sum, question) => sum + (question.points ?? 1),
    0
  );

  const percentage = Math.round((points / maxPossiblePoints) * 100, 0);

  const isReview = level < storedLevel;

  return (
    <div className="finish-screen">
      <h2>You scored</h2>{' '}
      <h3
        className={`result ${
          points < 0.5 * NUMBER_OF_QUESTIONS_PER_LEVEL ? 'poor' : ''
        } ${points > 0.7 * NUMBER_OF_QUESTIONS_PER_LEVEL ? 'great' : ''}`}
      >
        <strong>{points}</strong> out of {maxPossiblePoints} ({percentage}%)
      </h3>
      {!isReview && points > 0.7 * NUMBER_OF_QUESTIONS_PER_LEVEL && (
        <p>You're almost there!</p>
      )}
      <p className="highscore">( Highscore: {highScore} points )</p>
      <div className="btn-grp">
        <button className="btn" onClick={() => dispatch({ type: 'restart' })}>
          Try again
        </button>

        {isReview && (
          <>
            <ReviewLevelsButton btnClass="btn " />
            <ResumeLevelButton btnClass="btn btn-primary" />
          </>
        )}
      </div>
    </div>
  );
}

export default FinishScreen;
