import WordLink from './WordLink';

function Antonyms({ antonyms }) {
  return (
    <div className="word__antonyms">
      <span>Antonyms:</span>
      {antonyms.map((antonym, index) => (
        <WordLink word={antonym} key={index} />
      ))}
    </div>
  );
}

export default Antonyms;
