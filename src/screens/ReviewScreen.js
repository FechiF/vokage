import { useState } from 'react';
import { useQuiz } from '../contexts/QuizContextProvider';
import ReviewCard from '../ui/ReviewCard';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { getQuestionsPerLevel } from '../utilities/utilities';
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

  const reviewLevels = unlockedLevels.filter((level) => {
    const lc_searchText = searchText.toLowerCase();
    const questions = getQuestionsPerLevel(level.level, allQuestions);
    const qwords = questions.filter((q) =>
      q.word.toLowerCase().includes(lc_searchText)
    );

    return (
      qwords?.length ||
      level.rank.toLowerCase().includes(lc_searchText) ||
      level.name.toLowerCase().includes(lc_searchText) ||
      nums?.includes(level.level)
    );
  });

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
