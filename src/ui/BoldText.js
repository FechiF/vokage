function BoldText({ text, boldText }) {
  const regex = new RegExp(`(${boldText})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part.toLowerCase() === boldText.toLowerCase() ? (
            <strong>{part}</strong>
          ) : (
            <span>{part}</span>
          )}
        </span>
      ))}
    </>
  );
}

export default BoldText;
