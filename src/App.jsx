import { useState, useEffect } from 'react';
import { Square } from './components/Square';
import {TURNS} from './constants';
import { checkWinnerFrom,checkEndGame } from './logic';

import confetti from 'canvas-confetti';
import { WinnerModal } from './components/WinnerModal';
import { ScoreBoard } from './components/ScoreBoard';


function App() {
  // board state
  const [board, setBoard] = useState(Array(9).fill(null));
  // turn state
  const [turn, setTurn] = useState(TURNS.X);
  // winner state
  const [winner, setWinner] = useState(null);
  // score state
  const [scores, setScores] = useState(() => {
    const savedScores = window.localStorage.getItem('triqui-scores');
    return savedScores ? JSON.parse(savedScores) : { X: 0, O: 0 };
  });

  // Save scores to localStorage whenever scores change
  useEffect(() => {
    window.localStorage.setItem('triqui-scores', JSON.stringify(scores));
  }, [scores]);

  
  // send reference of the funtion.
  const updateBoard = (index) => {
    if(board[index] || winner) return; // don't update if the square is already filled.

    const newBoard = [...board]; // structuredClone(board) if we have nested objects/arrays.
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // TODO: new feature create a list of the last 5 winners.
    // check if there is a winner
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner); // this set is async.
      // Update scores
      setScores(prevScores => ({
        ...prevScores,
        [newWinner === TURNS.X ? 'X' : 'O']: prevScores[newWinner === TURNS.X ? 'X' : 'O'] + 1
      }));
    }else if(checkEndGame(newBoard)) {
      setWinner(false); // draw game.
    }
  }

  // reset game state.
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  // reset scores
  const resetScores = () => {
    const newScores = { X: 0, O: 0 };
    setScores(newScores);
    window.localStorage.setItem('triqui-scores', JSON.stringify(newScores));
  }

  return <main className="board">
    <h1>Triqui Game</h1>
    <ScoreBoard scores={scores} resetScores={resetScores} currentTurn={turn} />
    <button onClick={resetGame}>Reset Game</button>
    <section className="game">
      {
        board.map((square, index) => {
          return <Square key={index} index={index} updateBoard={updateBoard}>{square}</Square>
        })
      }
    </section>
    <WinnerModal winner={winner} resetGame={resetGame} scores={scores}></WinnerModal>
  </main>
}

export default App
