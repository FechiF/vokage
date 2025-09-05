import { DICTIONARY_API_URL } from '../../utilities/config';

function Antonyms({ antonyms }) {
  return (
    <div className="word__antonyms">
      <strong>Antonyms:</strong>
      {antonyms.map((antonym, index) => (
        <a href={`${DICTIONARY_API_URL}${antonym}`} key={index}>
          {antonym}
        </a>
      ))}
    </div>
  );
}

export default Antonyms;
