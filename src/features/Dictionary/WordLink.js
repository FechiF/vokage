import { useDictionary } from '../../contexts/DictionaryContextProvider';
import { DICTIONARY_API_URL } from '../../utilities/config';

function WordLink({ word }) {
  const { setActiveWord } = useDictionary();

  if (word.trim().includes(' ')) return <span>{word}</span>;

  function handleClick(e) {
    e.preventDefault();
    setActiveWord(word);
  }

  return (
    <a
      href={`${DICTIONARY_API_URL}${word}`}
      onClick={handleClick}
      className="word-link"
    >
      {word}
    </a>
  );
}

export default WordLink;
