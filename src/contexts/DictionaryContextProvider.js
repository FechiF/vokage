import { createContext, useContext, useEffect, useState } from 'react';
import { DICTIONARY_API_URL } from '../utilities/config';

const DictionaryContext = createContext();

function DictionaryProvider({ children }) {
  const [entry, setEntry] = useState(null);
  const [word, setWord] = useState(null);

  useEffect(
    function () {
      setEntry(null);
      try {
        async function fetchWord() {
          const response = await fetch(`${DICTIONARY_API_URL}${word}`);
          if (!response) throw new Error('Connection error');
          const data = await response.json();
          data.message ? setEntry(data) : setEntry(data[0]);
        }
        if (word) fetchWord();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },
    [word]
  );

  return (
    <DictionaryContext.Provider
      value={{
        entry,
        setWord,
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
