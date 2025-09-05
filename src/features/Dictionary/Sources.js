function Sources({ sources }) {
  return (
    <div className="word__sources">
      <strong>Sources:</strong>{' '}
      {sources.map((source, index) => (
        <a href={source} key={index}>
          {source}
        </a>
      ))}
    </div>
  );
}

export default Sources;
