import { useDictionary } from '../contexts/DictionaryContextProvider';
import { useQuiz } from '../contexts/QuizContextProvider';
import { DICTIONARY_API_URL } from '../utilities/config';
import { findSearchTerms, getQuestionsPerLevel } from '../utilities/utilities';
import BoldSearchText from './BoldSearchText';

function ReviewCard({ level: cardLevel, setIsDictionaryOpen, searchText }) {
  const { allQuestions, dispatch } = useQuiz();
  const { image, rank, name, level } = cardLevel;

  const levelQuestions = getQuestionsPerLevel(level, allQuestions);
  const { setWord } = useDictionary();

  return (
    <div className="review-card">
      <header>
        <div className="level-info">
          <figure className="review-card__img">
            <img src={`/images/${image}`} alt={level} />
          </figure>

          <div>
            <h3>Level {`${level}`}</h3>
            <h4>
              {searchText.length ? (
                <BoldSearchText
                  text={rank}
                  searchTerms={findSearchTerms(rank, searchText)}
                />
              ) : (
                rank
              )}
              &nbsp;
              {searchText.length ? (
                <BoldSearchText
                  text={name}
                  searchTerms={findSearchTerms(name, searchText)}
                />
              ) : (
                name
              )}
            </h4>
          </div>
        </div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: 'start-review', payload: level })}
        >
          Go
        </button>
      </header>
      <div className="word-list">
        {levelQuestions.map((q, index) => (
          <a
            href={`${DICTIONARY_API_URL}${q.word}`}
            key={index}
            title={q.word}
            onClick={(e) => {
              e.preventDefault();
              setIsDictionaryOpen(true);
              setWord(q.word);
            }}
            className="word-link"
          >
            {searchText.length ? (
              <BoldSearchText
                text={q.word}
                searchTerms={findSearchTerms(q.word, searchText)}
              />
            ) : (
              q.word
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ReviewCard;
