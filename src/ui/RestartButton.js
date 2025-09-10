import { useQuiz } from '../contexts/QuizContextProvider';

function RestartButton() {
  const { dispatch } = useQuiz();
  return (
    <button
      className="btn btn-ui btn-secondary"
      onClick={() => dispatch({ type: 'restart' })}
    >
      Restart
    </button>
  );
}

export default RestartButton;
