import {Square} from './Square'
import {TURNS} from '../constants'

export function WinnerModal({ winner, resetGame, score }) {
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
                {score && (
                    <div className="score-display">
                        <p>{TURNS.X} Wins: {score.X}</p>
                        <p>{TURNS.O} Wins: {score.O}</p>
                        <p>Draws: {score.draws}</p>
                    </div>
                )}
                <footer>
                    <button onClick={resetGame}> Start Again</button>
                </footer>
            </div>
        </section>
    )
}