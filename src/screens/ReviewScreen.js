import { useState } from 'react';
import { useQuiz } from '../contexts/QuizContextProvider';
import ReviewCard from '../ui/ReviewCard';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { getQuestionsPerLevel, hasSearchTerm } from '../utilities/utilities';

function getNumbers(text) {
  const numbers = text.match(/\d+/g);
  return numbers?.length ? numbers.map((num) => parseInt(num)) : null;
}

function ReviewScreen() {
  const { levels, allQuestions, storedLevel } = useQuiz();
  const unlockedLevels = levels.filter((l) => l.level < storedLevel);

  const [searchText, setSearchText] = useState('');

  //get searched levels
  const nums = getNumbers(searchText);

  const reviewLevels =
    searchText.length > 0
      ? unlockedLevels.filter((level) => {
          const questions = getQuestionsPerLevel(level.level, allQuestions);
          const qwords = questions.filter((q) =>
            hasSearchTerm(q.word, searchText)
          );

          return (
            nums?.includes(level.level) ||
            qwords?.length ||
            hasSearchTerm(level.rank, searchText) ||
            hasSearchTerm(level.name, searchText)
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
            searchText={searchText}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewScreen;
