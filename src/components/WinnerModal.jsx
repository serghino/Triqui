import {Square} from './Square'
import { TURNS } from '../constants';

export function WinnerModal({ winner, resetGame, scores }) {
    if (winner === null) return null;

    const winnerText = winner === false ? 'Draw' : 'Winner';

    return (
        <section className="winner">
            <div className="text">
                <h2>{
                    winnerText
                }
                </h2>
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>
                
                <div className="modal-scores">
                    <h3>Current Scores</h3>
                    <div className="score-display">
                        <div className="player-score">
                            <Square>{TURNS.X}</Square>
                            <span>{scores.X}</span>
                        </div>
                        <div className="player-score">
                            <Square>{TURNS.O}</Square>
                            <span>{scores.O}</span>
                        </div>
                    </div>
                </div>
                
                <footer>
                    <button onClick={resetGame}> Start Again</button>
                </footer>
            </div>
        </section>
    )
}