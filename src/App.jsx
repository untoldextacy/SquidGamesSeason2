import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import RockPaperScissors from './pages/RockPaperScissors';
import Navbar from './component/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
      </Routes>
    </Router>
  );
};

export default App;
