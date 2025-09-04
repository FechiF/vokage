import { useQuiz } from '../Contexts/QuizContextProvider';

function NextButton() {
  const { dispatch, answer } = useQuiz();
  return (
    <button
      disabled={!answer}
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  );
}

export default NextButton;
