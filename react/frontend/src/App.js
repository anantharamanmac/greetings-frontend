import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Your landing page component
import CardForm from './components/CardForm'; // Your card creation form component
import CardDisplay from './components/CardDisplay'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-card" element={<CardForm />} />
      <Route path="/card/:cardId" element={<CardDisplay />} /> {/* Route for the card display */}
    </Routes>
  );
};

export default App;
