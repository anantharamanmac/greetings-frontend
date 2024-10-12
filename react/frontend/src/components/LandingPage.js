import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cards/create-card`, { name, message });
      const cardId = response.data.cardId; // Ensure this is capturing the card ID returned from the server

      // Navigate to the card display page
      navigate(`/card/${cardId}`); // This should be the correct route to view the card
    } catch (error) {
      console.error("Error creating card", error);
    }
  };

  return (
    <div className="landing-container">
      <h1>Greeting Card Creator</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default LandingPage;
