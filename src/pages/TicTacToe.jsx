import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GiHun from './assets/Seong_Gi-hun.jpg'
import frontman from './assets/frontman.jpg'


const characters = [
  { name: "Player", image: GiHun, marker: "X" },
  { name: "Antagonist", image: frontman, marker: "O" },
];

const TicTacToe = () => {
  const [turn, setTurn] = useState(null); // Player or Antagonist
  const [grid, setGrid] = useState(Array(9).fill(null)); // 3x3 grid
  const [winner, setWinner] = useState(null);
  const [timer, setTimer] = useState(30); // 30 seconds countdown for each turn
  const [isGameOver, setIsGameOver] = useState(false);

  // Function to check for a winner
  const checkWinner = (newGrid) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newGrid[a] && newGrid[a] === newGrid[b] && newGrid[a] === newGrid[c]) {
        setWinner(newGrid[a]);
        setIsGameOver(true);
        return true;
      }
    }
    return false;
  };

  // Handle a cell click
  const handleClick = (index) => {
    if (grid[index] || winner || isGameOver || turn.name === "Antagonist") return;

    const newGrid = [...grid];
    newGrid[index] = turn.marker;

    setGrid(newGrid);
    if (!checkWinner(newGrid)) {
      setTurn(characters[1]); // Switch to Antagonist's turn
    }
  };

  // Function to simulate Antagonist's move (random move)
  const antagonisticMove = () => {
    const availableCells = grid
      .map((cell, index) => (cell === null ? index : null))
      .filter(index => index !== null);

    if (availableCells.length === 0) return; // No more moves available

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const newGrid = [...grid];
    newGrid[randomIndex] = characters[1].marker;

    setGrid(newGrid);
    if (!checkWinner(newGrid)) {
      setTurn(characters[0]); // Switch back to Player's turn
    }
  };

  // Timer logic
  useEffect(() => {
    if (timer === 0 && !isGameOver) {
      setTurn(turn.name === "Player" ? characters[1] : characters[0]); // switch turn
      setTimer(30); // Reset timer
    }

    const interval = setInterval(() => {
      if (timer > 0 && !isGameOver) setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isGameOver, turn]);

  // Automatically trigger Antagonist's turn if it's the Antagonist's turn
  useEffect(() => {
    if (turn && turn.name === "Antagonist" && !isGameOver) {
      setTimeout(() => {
        antagonisticMove();
      }, 1000); // Delay to simulate the Antagonist's turn
    }
  }, [turn, grid, isGameOver]);

  return (
    <div className="flex flex-col items-center bg-[#0a0a0a] text-white min-h-screen p-4">
      {/* Roulette Spin Button */}
      <motion.button
        onClick={() => {
          const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
          setTurn(randomCharacter);
          setTimer(30); // Reset the timer after a new turn
          setIsGameOver(false);
        }}
        className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-lg mt-6 hover:bg-red-700 transition"
        whileTap={{ scale: 0.9 }}
      >
        Spin Roulette
      </motion.button>

      {/* Display the selected character */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-4 text-center"
      >
        {turn && (
          <div>
            <img
              src={turn.image}
              alt={turn.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-red-600"
            />
            <h2 className="text-xl font-semibold mt-2">{turn.name}'s Turn ({turn.marker})</h2>
          </div>
        )}
      </motion.div>

      {/* Timer */}
      <div className="mt-4 text-2xl font-bold">
        Time Left: {timer} seconds
      </div>

      {/* Tic-Tac-Toe Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {grid.map((cell, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 flex items-center justify-center border-2 border-gray-300 cursor-pointer bg-[#1c1c1c] hover:bg-[#333] transition-all"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl font-bold">{cell}</span>
          </motion.div>
        ))}
      </div>

      {/* Winner or Draw message */}
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-xl font-semibold"
        >
          {winner} Wins!
        </motion.div>
      )}
      {grid.every(cell => cell) && !winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-xl font-semibold"
        >
          It's a Draw!
        </motion.div>
      )}

      {/* Restart Game Button */}
      {(winner || grid.every(cell => cell)) && (
        <motion.button
          onClick={() => {
            setGrid(Array(9).fill(null));
            setWinner(null);
            setTurn(null);
            setTimer(30);
            setIsGameOver(false);
          }}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-6 hover:bg-blue-700 transition"
        >
          Restart Game
        </motion.button>
      )}
    </div>
  );
};

export default TicTacToe;
