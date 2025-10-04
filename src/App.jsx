import { useState } from 'react';
import { Square } from './components/Square';
import {TURNS} from './constants';
import { checkWinnerFrom,checkEndGame } from './logic';

import confetti from 'canvas-confetti';
import { WinnerModal } from './components/WinnerModal';


function App() {
  // board state
  const [board, setBoard] = useState(Array(9).fill(null));
  // turn state
  const [turn, setTurn] = useState(TURNS.X);
  // winner state
  const [winner, setWinner] = useState(null);
  // score state - load from localStorage or initialize
  const [score, setScore] = useState(() => {
    const savedScore = window.localStorage.getItem('triquiScore');
    if (savedScore) {
      return JSON.parse(savedScore);
    }
    return { X: 0, O: 0, draws: 0 };
  });

  
  // send reference of the funtion.
  const updateBoard = (index) => {
    if(board[index] || winner) return; // don't update if the square is already filled.

    const newBoard = [...board]; // structuredClone(board) if we have nested objects/arrays.
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // TODO: new feature save game.
    // TODO: new feature create a list of the last 5 winners.
    // check if there is a winner
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner); // this set is async.
      // update score
      const newScore = { ...score };
      if (newWinner === TURNS.X) {
        newScore.X += 1;
      } else if (newWinner === TURNS.O) {
        newScore.O += 1;
      }
      setScore(newScore);
      window.localStorage.setItem('triquiScore', JSON.stringify(newScore));
    }else if(checkEndGame(newBoard)) {
      setWinner(false); // draw game.
      // update draws count
      const newScore = { ...score, draws: score.draws + 1 };
      setScore(newScore);
      window.localStorage.setItem('triquiScore', JSON.stringify(newScore));
    }
  }

  // reset game state.
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  // reset score
  const resetScore = () => {
    const newScore = { X: 0, O: 0, draws: 0 };
    setScore(newScore);
    window.localStorage.setItem('triquiScore', JSON.stringify(newScore));
  }

  return <main className="board">
    <h1>Triqui Game</h1>
    <section className="score">
      <div>
        <span>{TURNS.X} Wins: {score.X}</span>
        <span>{TURNS.O} Wins: {score.O}</span>
        <span>Draws: {score.draws}</span>
      </div>
    </section>
    <button onClick={resetGame}>Reset Game</button>
    <button onClick={resetScore}>Reset Score</button>
    <section className="game">
      {
        board.map((square, index) => {
          return <Square key={index} index={index} updateBoard={updateBoard}>{square}</Square>
        })
      }
    </section>
    <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
    <WinnerModal winner={winner} resetGame={resetGame} score={score}></WinnerModal>
  </main>
}

export default App
