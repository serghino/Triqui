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

  return <main className="board">
    <h1>Triqui Game</h1>
    <button onClick={resetGame}>Reset Game</button>
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
    <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
  </main>
}

export default App
