export default function Loader({ text = 'Loading questions...' }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>{text}</p>
    </div>
  );
}
