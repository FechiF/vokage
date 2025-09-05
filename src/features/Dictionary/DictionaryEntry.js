import Meanings from './Meanings';
import Sources from './Sources';

function DictionaryEntry({ entry }) {
  if (!entry) return;

  const { meanings, phonetic, phonetics, sourceUrls: sources } = entry;

  return (
    <div className="dictionary__entry">
      <p className="word__phonetic">{phonetic}</p>

      {phonetics[0]?.audio && (
        <audio className="word__audio" controls>
          <source src={phonetics[0]?.audio} />
        </audio>
      )}

      <Meanings meanings={meanings} />

      {sources?.length && <Sources sources={sources} />}
    </div>
  );
}

export default DictionaryEntry;
