function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.choices.map((option) => (
        <button
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: option })}
          className={`btn btn-option ${option === answer ? 'answer' : ''}  ${
            hasAnswered
              ? option === question.answer
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
