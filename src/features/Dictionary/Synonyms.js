import WordLink from './WordLink';

function Synonyms({ synonyms }) {
  return (
    <div className="word__synonyms">
      <strong>Synonyms:</strong>
      {synonyms.map((synonym, index) => (
        <WordLink word={synonym} key={index} />
      ))}
    </div>
  );
}

export default Synonyms;
