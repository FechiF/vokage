import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContextProvider';
import { NUMBER_OF_QUESTIONS_PER_LEVEL } from '../utilities/config';

function FinishButton() {
  const { dispatch, points, level, storedLevel } = useQuiz();
  const isReview = level < storedLevel;

  useEffect(
    function () {
      if (points === NUMBER_OF_QUESTIONS_PER_LEVEL) {
        localStorage.setItem('vokage-level', JSON.stringify(+level + 1));
      }
    },
    [level, points]
  );

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type:
            !isReview && points === NUMBER_OF_QUESTIONS_PER_LEVEL
              ? 'nextLevel'
              : 'finish',
        })
      }
    >
      Finish
    </button>
  );
}

export default FinishButton;
