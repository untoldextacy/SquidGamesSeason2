import React from "react";
import { Link } from "react-router-dom";
import { useAudio } from "./AudioProvider";

const Navbar = () => {
  const { isPlaying, togglePlay } = useAudio();
  return (
    <nav className="bg-[#e4007f] p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-[#00ff00]">
          Squid Games!
        </Link>
        <div className="flex gap-6">
          <Link to="/rock-paper-scissors" className="hover:text-[#00ff00] transition-colors">
            Rock-Paper-Scissors Minus One
          </Link>
          <Link to="/tic-tac-toe" className="hover:text-[#00ff00] transition-colors">
            Tic Tac Toe
          </Link>
            <button
            onClick={togglePlay}
            className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-lg hover:bg-yellow-600"
          >
            {isPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
