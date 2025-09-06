import { Fragment } from 'react/jsx-runtime';

function BoldText({ text, boldText }) {
  const parts = text.split(boldText);

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index !== parts.length - 1 && <strong>{boldText}</strong>}
        </Fragment>
      ))}
    </>
  );
}

export default BoldText;
