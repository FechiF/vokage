import { useQuiz } from '../contexts/QuizContextProvider';

function ReviewLevelsButton({ btnClass }) {
  const { dispatch } = useQuiz();
  return (
    <button
      className={btnClass}
      onClick={() => {
        dispatch({ type: 'review' });
      }}
    >
      Review levels
    </button>
  );
}

export default ReviewLevelsButton;
