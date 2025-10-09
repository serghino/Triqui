import { Square } from './Square';
import { TURNS } from '../constants';

export function ScoreBoard({ scores, resetScores, currentTurn }) {
  return (
    <section className="scoreboard">
      <h2>Scores</h2>
      <div className="scores">
        <div className="player-score">
          <Square isSelected={currentTurn === TURNS.X}>{TURNS.X}</Square>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="player-score">
          <Square isSelected={currentTurn === TURNS.O}>{TURNS.O}</Square>
          <span className="score-value">{scores.O}</span>
        </div>
      </div>
      <button className="reset-scores-btn" onClick={resetScores}>
        Reset Scores
      </button>
    </section>
  );
}