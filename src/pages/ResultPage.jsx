import React from "react";
import { useLocation, Link } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation();
  const { winner } = state || {};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#111] text-white p-4">
      <h2 className="text-4xl font-bold mb-4">{winner}</h2>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Restart Game
      </Link>
    </div>
  );
};

export default ResultPage;
