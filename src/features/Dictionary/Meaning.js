import Antonyms from './Antonyms';
import Synonyms from './Synonyms';

function Meaning({ meaning }) {
  const { definitions, antonyms, synonyms, partOfSpeech } = meaning;
  return (
    <div className="word__meaning">
      <p className="word__definition">
        <strong className="word__partOfSpeech">{partOfSpeech}</strong>&nbsp;
        {definitions[0].definition}
      </p>
      <div className="word__etc">
        {synonyms?.length > 0 && <Synonyms synonyms={synonyms} />}
        {antonyms?.length > 0 && <Antonyms antonyms={antonyms} />}
      </div>
    </div>
  );
}

export default Meaning;
