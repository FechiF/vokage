import { useState } from 'react';
import { useQuiz } from '../contexts/QuizContextProvider';
import ReviewCard from '../ui/ReviewCard';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { getQuestionsPerLevel, findSearchTerms } from '../utilities/utilities';
import Modal from '../ui/Modal';
import { useDictionary } from '../contexts/DictionaryContextProvider';
import Loader from '../ui/Loader';
import DictionaryEntry from '../features/Dictionary/DictionaryEntry';

function getNumbers(text) {
  const numbers = text.match(/\d+/g);
  return numbers?.length ? numbers.map((num) => parseInt(num)) : null;
}

function ReviewScreen() {
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const { levels, allQuestions, storedLevel } = useQuiz();
  const unlockedLevels = levels.filter((l) => l.level < storedLevel);
  const { entry, setWord } = useDictionary();

  const [searchText, setSearchText] = useState('');

  function closeDictionary() {
    setWord(null);
    setIsDictionaryOpen(false);
  }

  //get searched levels
  const nums = getNumbers(searchText);

  const reviewLevels =
    searchText.length > 0
      ? unlockedLevels.filter((level) => {
          const questions = getQuestionsPerLevel(level.level, allQuestions);
          const qwords = questions.filter(
            (q) => findSearchTerms(q.word, searchText).length
          );

          return (
            nums?.includes(level.level) ||
            qwords?.length ||
            findSearchTerms(level.rank, searchText).length ||
            findSearchTerms(level.name, searchText).length
          );
        })
      : unlockedLevels;

  return (
    <div className="reviews">
      <h2>Shinobi Review</h2>
      <div className="review-search">
        <input
          id="search"
          name="search"
          onChange={(e) => setSearchText(e.target.value)}
          className="form__input"
          placeholder="Search unlocked quizzes by word or level"
          value={searchText}
        />
        {searchText ? (
          <button className="btn-close" onClick={() => setSearchText('')}>
            <HiXMark />
          </button>
        ) : (
          <label className="form__label" htmlFor="search">
            <HiMagnifyingGlass />
          </label>
        )}
      </div>

      <div className="review-cards">
        {reviewLevels.map((filteredLevel) => (
          <ReviewCard
            level={filteredLevel}
            key={filteredLevel.level}
            setIsDictionaryOpen={setIsDictionaryOpen}
            searchText={searchText}
          />
        ))}
      </div>

      <Modal isOpen={isDictionaryOpen} onClose={closeDictionary}>
        {!entry ? (
          <Loader text="Loading dictionary..." />
        ) : (
          <DictionaryEntry entry={entry} />
        )}
        {entry && (
          <div className="btn-grp">
            <button className="btn btn-close-modal" onClick={closeDictionary}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ReviewScreen;
