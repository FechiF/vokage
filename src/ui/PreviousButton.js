import { useQuiz } from '../contexts/QuizContextProvider';

function PreviousButton() {
  const { dispatch } = useQuiz();
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'previousQuestion' })}
    >
      Previous
    </button>
  );
}

export default PreviousButton;
