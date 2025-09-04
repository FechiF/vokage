import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContextProvider';
import { NUMBER_OF_QUESTIONS_PER_LEVEL } from '../utilities/config';

function FinishButton() {
  const { dispatch, points, level } = useQuiz();

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
            points === NUMBER_OF_QUESTIONS_PER_LEVEL ? 'nextLevel' : 'finish',
        })
      }
    >
      Finish
    </button>
  );
}

export default FinishButton;
