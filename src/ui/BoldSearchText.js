function BoldSearchText({ text, searchTerms }) {
  if (!searchTerms || searchTerms.length === 0) {
    return text;
  }

  const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        searchTerms.some(
          (term) => part.toLowerCase() === term.toLowerCase()
        ) ? (
          <strong key={index}>{part}</strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export default BoldSearchText;
