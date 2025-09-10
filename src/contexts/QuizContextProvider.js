import { createContext, useContext, useEffect, useReducer } from 'react';
import { NUMBER_OF_QUESTIONS_PER_LEVEL } from '../utilities/config';
import { shuffle, getStoredItem } from '../utilities/utilities';

const QuizContext = createContext();
const initialState = {
  allQuestions: [],
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  levels: [],
  level: 0,
  storedLevel: 0,
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

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      const storedLevel = Number(getStoredItem('vokage-level', 0));
      return {
        ...state,
        allQuestions: action.payload.questions,
        levels: action.payload.levels,
        level: storedLevel,
        storedLevel: storedLevel,
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
        level: Number(action.payload),
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
        storedLevel: state.level + 1,
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

    case 'review':
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highScore: 0,
        status: 'review',
      };
    case 'start-review':
      return {
        ...state,
        answer: null,
        index: 0,
        level: Number(action.payload),
        points: 0,
        questions: getCurrentQuestions(action.payload, state.allQuestions),
        highScore: 0,
        status: 'startingLevel-same',
      };
    case 'resume-level':
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highScore: 0,
        level: state.storedLevel,
        status: 'ready',
      };
    case 'godMode':
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highScore: 0,
        questions: shuffle(state.allQuestions),
        status: 'godMode',
      };

    default:
      throw new Error('Action unknown');
  }
}

function QuizProvider({ children }) {
  const [
    {
      allQuestions,
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      level,
      levels,
      storedLevel,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    const urls = [
      'https://vokage-api.vercel.app/levels',
      'https://vokage-api.vercel.app/questions',
    ];

    const fetchPromises = urls.map((url) => fetch(url));

    Promise.all(fetchPromises)
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((data) => {
        const quizData = {};
        data.forEach((set) => {
          if (set[0].rank) {
            quizData.levels = set;
          }
          if (set[0].answer) {
            quizData.questions = set;
          }
        });
        dispatch({ type: 'dataReceived', payload: quizData });
      })
      .catch((error) => {
        dispatch({ type: 'dataFailed' });
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        allQuestions,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        level,
        levels,
        storedLevel,
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
