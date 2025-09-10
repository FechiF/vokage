import { useDictionary } from '../contexts/DictionaryContextProvider';
import DictionaryEntry from '../features/Dictionary/DictionaryEntry';
import Loader from './Loader';
import Modal from './Modal';

function DictionaryModal() {
  const {
    entry,
    word,
    activeWord,
    setWord,
    setActiveWord,
    isDictionaryOpen,
    setIsDictionaryOpen,
  } = useDictionary();

  function closeDictionary() {
    setActiveWord(null);
    setWord(null);
    setIsDictionaryOpen(false);
  }

  return (
    <Modal isOpen={isDictionaryOpen} onClose={closeDictionary}>
      {!entry ? (
        <Loader text="Loading dictionary..." />
      ) : (
        <DictionaryEntry entry={entry} />
      )}
      {entry && (
        <div className="btn-grp">
          {word !== activeWord && (
            <button
              className="btn btn-back"
              onClick={() => {
                setActiveWord(word);
              }}
            >
              Back to {word}
            </button>
          )}
          <button className="btn btn-close-modal" onClick={closeDictionary}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}

export default DictionaryModal;
