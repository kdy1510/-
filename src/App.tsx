import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/IntroScreen';
import MenuPage from './components/MenuScreen';
import GameScreen from './components/GameScreen';
import FlashcardScreen from './components/FlashcardScreen'; // Import FlashcardScreen

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/word-game" element={<GameScreen />} />
        <Route path="/flashcard-game" element={<FlashcardScreen />} /> {/* Add route for FlashcardScreen */}
      </Routes>
    </Router>
  );
}

export default App;
