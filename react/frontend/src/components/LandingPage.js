import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  const [yourname, setYourName] = useState(''); // Sender's name
  const [name, setName] = useState(''); // Recipient's name
  const [message, setMessage] = useState(''); // Message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending the sender's name, recipient's name, and message to the API
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cards/create-card`, { yourname, name, message });
      const cardId = response.data.cardId; // Capture the card ID returned from the server

      // Navigate to the card display page
      navigate(`/card/${cardId}`); // Navigate to the card display route
    } catch (error) {
      console.error("Error creating card", error);
    }
  };

  return (
    <div className="landing-container">
      <h1>Greeting Card Creator</h1>
      <form onSubmit={handleSubmit}>
        {/* Input for Sender's Name */}
        <input 
          type="text" 
          placeholder="Your Name" 
          value={yourname} 
          onChange={(e) => setYourName(e.target.value)} // Set sender's name
          required 
        />
        {/* Input for Recipient's Name */}
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} // Set recipient's name
          required 
        />
        {/* Textarea for the Message */}
        <textarea 
          placeholder="Your Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} // Set message
          required 
        />
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default LandingPage;
