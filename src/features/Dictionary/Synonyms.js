import WordLink from './WordLink';

function Synonyms({ synonyms }) {
  return (
    <div className="word__synonyms">
      <span>Synonyms:</span>
      {synonyms.map((synonym, index) => (
        <WordLink word={synonym} key={index} />
      ))}
    </div>
  );
}

export default Synonyms;
