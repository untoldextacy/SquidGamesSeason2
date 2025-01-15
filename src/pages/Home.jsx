import React from 'react';
import { Link } from 'react-router-dom';  // Use React Router for navigation
import recruiterImage from './assets/recruit.jpg'; // Add your image path here

const Home = () => {
  return (
    <div className="flex flex-col items-center bg-[#0a0a0a] text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Squid Game!</h1>
      <p className="text-xl mb-6">Choose your game:</p>

      {/* Option to play Tic-Tac-Toe with the Frontman */}
      <Link to="/tic-tac-toe">
        <button className="bg-pink-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-pink-700 mb-4 transition">
          Play Tic-Tac-Toe with the Frontman
        </button>
      </Link>

      {/* Option to play Rock Paper Scissors Minus One with the Recruiter */}
      <Link to="/rock-paper-scissors">
        <button className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 mb-4 transition">
          Play Rock Paper Scissors with the Recruiter
        </button>
      </Link>

      {/* Display Recruiter Image */}
      <div className="mt-8">
        <img src={recruiterImage} alt="Recruiter" className="w-24 h-24 rounded-full border-4 border-red-600" />
        <h3 className="text-lg mt-2">The Recruiter</h3>
      </div>
    </div>
  );
};

export default Home;
