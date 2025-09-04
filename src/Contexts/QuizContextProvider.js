import { createContext, useContext, useEffect, useReducer } from 'react';
import { NUMBER_OF_QUESTIONS_PER_LEVEL } from '../config';
import { shuffle } from '../utilities/utilities';

const QuizContext = createContext();
const initialState = {
  questions: [],
  allQuestions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  level: 0,
};

function getCurrentQuestions(level, allQuestions) {
  const startIndex = level * NUMBER_OF_QUESTIONS_PER_LEVEL;
  const endIndex = startIndex + NUMBER_OF_QUESTIONS_PER_LEVEL;

  const currentQuestions = allQuestions.filter((item, index) => {
    return index >= startIndex && index < endIndex;
  });

  currentQuestions.forEach((question) => {
    question.choices = shuffle(question.choices);
  });

  return shuffle(currentQuestions);
}

function getStoredLevel() {
  const storedLevel = localStorage.getItem('vokage-level');
  return storedLevel ? storedLevel : 0;
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        allQuestions: action.payload,
        level: getStoredLevel(),
        status: 'ready',
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };

    case 'start':
      return {
        ...state,
        questions: getCurrentQuestions(action.payload, state.allQuestions),
        index: 0,
        level: action.payload,
        status: 'active',
      };

    case 'newAnswer':
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question.answer === action.payload
            ? state.points + (question.points ?? 1)
            : state.points,
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case 'nextLevel':
      return {
        ...state,
        answer: null,
        index: 0,
        level: state.level + 1,
        points: 0,
        questions: getCurrentQuestions(state.level + 1, state.allQuestions),
        highScore: 0,
        status: 'startingLevel-up',
      };

    case 'previousQuestion':
      return {
        ...state,
        index: state.index - 1,
        answer: null,
      };

    case 'finish':
      return {
        ...state,
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
        status: 'finished',
      };
    case 'restart':
      return {
        ...state,
        status: state.level > 0 ? 'startingLevel-same' : 'ready',
        index: 0,
        answer: null,
        points: 0,
      };

    default:
      throw new Error('Action unknown');
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, level },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch(`https://vokage-api.vercel.app/questions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        level,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}
export { QuizProvider, useQuiz };
