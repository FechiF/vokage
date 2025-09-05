import { useEffect } from 'react';
import LevelProgress from '../ui/LevelProgress';
import { useQuiz } from '../contexts/QuizContextProvider';

function StartLevelScreen() {
  const { dispatch, status, level, levels } = useQuiz();
  const { rank, name, description } = levels[level - 1];
  const imgName = `${rank.toLowerCase().replaceAll(' ', '-')}-${name
    .toLowerCase()
    .replaceAll(' ', '-')}`;

  useEffect(
    function () {
      document.body.className = rank.toLowerCase();

      if (level === levels.length) {
        document.body.classList.add('final');
      }
    },
    [level, levels.length, rank]
  );

  return (
    <div className="level">
      <LevelProgress />

      {Number(level) === levels.length && (
        <div className="congrats">
          <h2>Congratulations!</h2>
          <p>You are now a legendary Vocabulary Hokage!</p>
        </div>
      )}

      <h3>
        Level {level}: {rank} {name}
      </h3>
      <figure>
        <img src={`/images/${imgName}.jpg`} alt={name} />
      </figure>

      {(status === 'startingLevel-up' || Number(level) === levels.length) && (
        <p>{description}</p>
      )}
      {level < levels.length && (
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({
              type: 'start',
              payload: level,
            })
          }
        >
          Start Level {level}
        </button>
      )}
    </div>
  );
}

export default StartLevelScreen;
