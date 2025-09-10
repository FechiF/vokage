import { useQuiz } from '../contexts/QuizContextProvider';

function NextButton() {
  const { dispatch, answer } = useQuiz();
  return (
    <button
      disabled={!answer}
      className="btn btn-primary"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  );
}

export default NextButton;
