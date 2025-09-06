import { useDictionary } from '../../contexts/DictionaryContextProvider';
import { DICTIONARY_API_URL } from '../../utilities/config';

function WordLink({ word }) {
  const { setWord } = useDictionary();

  if (word.trim().includes(' ')) return <span>{word}</span>;

  function handleClick(e) {
    e.preventDefault();
    setWord(word);
  }

  return (
    <a href={`${DICTIONARY_API_URL}${word}`} onClick={handleClick}>
      {word}
    </a>
  );
}

export default WordLink;
