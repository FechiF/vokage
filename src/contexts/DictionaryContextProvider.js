import { createContext, useContext, useEffect, useState } from 'react';
import { DICTIONARY_API_URL } from '../utilities/config';

const DictionaryContext = createContext();

function DictionaryProvider({ children }) {
  const [entry, setEntry] = useState(null);
  const [word, setWord] = useState(null);
  const [activeWord, setActiveWord] = useState(null);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  const openDictionary = function (newWord) {
    setIsDictionaryOpen(true);
    setWord(newWord);
    setActiveWord(newWord);
  };

  useEffect(
    function () {
      setEntry(null);
      try {
        async function fetchWord() {
          const response = await fetch(`${DICTIONARY_API_URL}${activeWord}`);
          if (!response) throw new Error('Connection error');
          const data = await response.json();
          data.message ? setEntry(data) : setEntry(data[0]);
        }
        if (activeWord) fetchWord();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },
    [activeWord]
  );

  return (
    <DictionaryContext.Provider
      value={{
        entry,
        setWord,
        word,
        activeWord,
        setActiveWord,
        setIsDictionaryOpen,
        isDictionaryOpen,
        openDictionary,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
}

function useDictionary() {
  const context = useContext(DictionaryContext);
  return context;
}
export { DictionaryProvider, useDictionary };
