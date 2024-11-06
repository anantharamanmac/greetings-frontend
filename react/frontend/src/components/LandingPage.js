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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
  const [userGreetingHistory, setUserGreetingHistory] = useState([]); // New state for user's greeting history
  const [showDropdown, setShowDropdown] = useState(false); // To toggle dropdown visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchGreetingHistory(token);  // Fetch greeting history after login
    }
    const loadPage = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadPage);
  }, []);

  const fetchGreetingHistory = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // Debugging - check what's returned
      setUserGreetingHistory(response.data.cards || response.data); // Adjust depending on API response
    } catch (error) {
      console.error("Error fetching greeting history", error);
    }
  };

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <header className="header">
        <h1>Greeting Card Creator</h1>

        {isLoggedIn && (
          <div className="user-icon-container">
            <img
              src="/path/to/user-icon.png" 
              alt="User Icon"
              className="user-icon"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <h4>Your Greeting History</h4>
                <ul>
                  {userGreetingHistory && userGreetingHistory.length > 0 ? (
                    userGreetingHistory.map((card) => (
                      <li key={card._id} onClick={() => navigate(`/card/${card._id}`)}>
                        {card.title || card.message || 'Untitled Card'}
                      </li>
                    ))
                  ) : (
                    <li>No greetings created yet</li>
                  )}
                </ul>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        )}
      </header>

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
