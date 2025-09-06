import { useQuiz } from '../contexts/QuizContextProvider';
import BoldText from '../ui/BoldText';
import Options from './Options';

function Question() {
  const { questions, index, dispatch, answer } = useQuiz();

  const question = questions[index];

  return (
    <div>
      <h4>
        <BoldText text={question.question} boldText={question.word} />
      </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
