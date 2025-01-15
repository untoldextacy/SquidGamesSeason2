import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import playerAImage from "./assets/Seong_Gi-hun.jpg";
import playerBImage from "./assets/recruit.jpg";

const options = ["rock", "paper", "scissors"];

const RockPaperScissorsMinusOne = () => {
  const [playerAChoices, setPlayerAChoices] = useState(["", ""]);
  const [playerBChoices, setPlayerBChoices] = useState(["", ""]);
  const [currentPhase, setCurrentPhase] = useState("select");
  const [timer, setTimer] = useState(5);
  const [playerARemoved, setPlayerARemoved] = useState(false);
  const [playerBRemoved, setPlayerBRemoved] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const getRPSWinner = (choiceA, choiceB) => {
    if (choiceA === choiceB) return "Draw";
    if (
      (choiceA === "rock" && choiceB === "scissors") ||
      (choiceA === "paper" && choiceB === "rock") ||
      (choiceA === "scissors" && choiceB === "paper")
    ) {
      return "Player A";
    }
    return "Player B";
  };

  const handleChoice = (player, option, index) => {
    if (player === "A" && !playerAChoices.includes(option)) {
      const newChoices = [...playerAChoices];
      newChoices[index] = option;
      setPlayerAChoices(newChoices);
    }
  };

  const getRandomChoices = () => {
    setPlayerBChoices([
      options[Math.floor(Math.random() * options.length)],
      options[Math.floor(Math.random() * options.length)],
    ]);
  };

  const startMinusOnePhase = () => {
    setCurrentPhase("minusOne");
    setTimer(5);
  };

  const removeChoice = (player, index) => {
    const newChoices = player === "A" ? [...playerAChoices] : [...playerBChoices];
    newChoices[index] = "";

    if (player === "A") {
      setPlayerAChoices(newChoices);
      setPlayerARemoved(true);
    } else {
      setPlayerBChoices(newChoices);
      setPlayerBRemoved(true);
    }
  };

  useEffect(() => {
    if (currentPhase === "minusOne" && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && currentPhase === "minusOne") {
      if (!playerARemoved) {
        setWinner("Player B Wins!");
      } else {
        const [remainingPlayerA] = playerAChoices.filter(Boolean);
        const [remainingPlayerB] = playerBChoices.filter(Boolean);
        const result = getRPSWinner(remainingPlayerA, remainingPlayerB);

        setWinner(result === "Draw" ? "It's a Draw!" : `${result} Wins!`);
      }
      setIsGameOver(true);
      setCurrentPhase("result");
    }
  }, [timer, currentPhase, playerAChoices, playerBChoices]);

  useEffect(() => {
    if (currentPhase === "select") getRandomChoices();
  }, [currentPhase]);

  const getButtonColor = (option) =>
    playerAChoices.includes(option) ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700";

  const playAgain = () => {
    setPlayerAChoices(["", ""]);
    setPlayerBChoices(["", ""]);
    setCurrentPhase("select");
    setTimer(5);
    setPlayerARemoved(false);
    setPlayerBRemoved(false);
    setIsGameOver(false);
    setWinner(null);
  };

  const renderResultPhase = () => (
    <div className="text-center">
      <motion.h2
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 1 }}
      >
        {winner}
      </motion.h2>
      <div className="flex justify-center items-center gap-8">
        {winner.includes("Player A") && (
          <img
            src={playerAImage}
            alt="Player A"
            className="w-40 h-40 rounded-full border-4 border-green-500"
          />
        )}
        {winner.includes("Player B") && (
          <img
            src={playerBImage}
            alt="Player B"
            className="w-40 h-40 rounded-full border-4 border-red-500"
          />
        )}
      </div>
      <motion.button
        onClick={playAgain}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mt-6"
        whileHover={{ scale: 1.1 }}
      >
        Play Again!
      </motion.button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#111] text-white p-4">
      {currentPhase === "select" && !isGameOver && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Player, Select Your Two Choices:</h2>
          <div className="flex justify-center gap-4 mb-4">
            {options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleChoice("A", option, index)}
                className={`${getButtonColor(option)} text-white font-bold py-2 px-4 rounded-lg`}
                whileHover={{ scale: 1.1 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={startMinusOnePhase}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
            whileHover={{ scale: 1.1 }}
          >
            Start Minus-One Phase
          </motion.button>
        </div>
      )}

      {currentPhase === "minusOne" && !isGameOver && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Remove One Option Within {timer} Seconds:</h2>
          <div className="flex justify-center items-center gap-12 mb-4">
            <div>
              <h3 className="text-lg mb-2">Player A's Choices:</h3>
              <img src={playerAImage} alt="Player A" className="w-32 h-32 rounded-full mb-4" />
              {playerAChoices.map((choice, index) =>
                choice ? (
                  <motion.button
                    key={index}
                    onClick={() => removeChoice("A", index)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {choice}
                  </motion.button>
                ) : null
              )}
            </div>
            <div>
              <h3 className="text-lg mb-2">Recruiter's (Player B) Choices:</h3>
              <img src={playerBImage} alt="Player B" className="w-32 h-32 rounded-full mb-4" />
              {playerBChoices.map((choice, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-600 text-transparent font-bold py-2 px-4 rounded-lg"
                >
                  {choice || "Pick"}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPhase === "result" && isGameOver && renderResultPhase()}
    </div>
  );
};

export default RockPaperScissorsMinusOne;
