import Meaning from './Meaning';

function Meanings({ meanings }) {
  return (
    <div className="word__meanings">
      {meanings.map((meaning, index) => (
        <Meaning meaning={meaning} key={index} />
      ))}
    </div>
  );
}

export default Meanings;
