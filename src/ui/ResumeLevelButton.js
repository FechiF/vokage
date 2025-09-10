import { useQuiz } from '../contexts/QuizContextProvider';

function ResumeLevelButton({ btnClass }) {
  const { dispatch } = useQuiz();

  return (
    <button
      className={btnClass}
      onClick={() => {
        dispatch({ type: 'resume-level' });
      }}
    >
      Resume <span className="xs-hide">level</span>
    </button>
  );
}

export default ResumeLevelButton;
