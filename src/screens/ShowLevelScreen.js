import { useEffect } from 'react';
import LevelProgress from '../components/LevelProgress';
import { useAuth } from '../Contexts/AuthContextProvider';
import { useQuiz } from '../Contexts/QuizContextProvider';

function StartLevelScreen() {
  const { dispatch, status, level: gameLevel } = useQuiz();
  const { levels, user } = useAuth();

  const level = Number(gameLevel ? gameLevel : user.level);
  const { rank, name, description } = levels[level - 1];
  console.log(level, levels.length);

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
        <img src={`/images/${level}.jpg`} alt={name} />
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
