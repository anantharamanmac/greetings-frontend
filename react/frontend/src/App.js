import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Your landing page component
import CardForm from './components/CardForm'; // Your card creation form component
import CardDisplay from './components/CardDisplay'; 
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-card" element={<CardForm />} />
      <Route path="/card/:cardId" element={<CardDisplay />} /> {/* Route for the card display */}
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
