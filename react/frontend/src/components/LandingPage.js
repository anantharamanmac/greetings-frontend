import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { quantum } from 'ldrs';
import './LandingPage.css';

quantum.register();

const LandingPage = () => {
  const [yourname, setYourName] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadPage);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cards/create-card`, { yourname, name, message });
      const cardId = response.data.cardId;
      navigate(`/card/${cardId}`);
    } catch (error) {
      console.error("Error creating card", error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <h1>Greeting Card Creator</h1>

      {loading || formLoading ? (
        <l-quantum size="45" speed="1.75" color="black"></l-quantum>
      ) : (
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={yourname} 
            onChange={(e) => setYourName(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <textarea 
            placeholder="Your Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
          <button type="submit">Create Card</button>
        </form>
      )}
    </div>
  );
};

export default LandingPage;
