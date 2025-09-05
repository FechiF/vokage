import { DICTIONARY_API_URL } from '../../utilities/config';

function Synonyms({ synonyms }) {
  return (
    <div className="word__synonyms">
      <strong>Synonyms:</strong>
      {synonyms.map((synonym, index) => (
        <a href={`${DICTIONARY_API_URL}${synonym}`} key={index}>
          {synonym}
        </a>
      ))}
    </div>
  );
}

export default Synonyms;
