import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CardDisplay.css'; 

const CardDisplay = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cards/${cardId}`);
        setCard(response.data);
      } catch (error) {
        console.error("Error fetching card", error);
      }
    };
    fetchCard();
  }, [cardId]);

  const handleCopyUrl = () => {
    const urlToCopy = window.location.href;

    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch(error => console.error('Error copying to clipboard:', error));
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="card-container">
      {/* Navbar with Home button */}
      <div className="navbar">
        <button onClick={handleNavigateHome} className="home-btn">Home</button>
      </div>

      <div className="header">
        <h4 className='happy'>Happy Birthday</h4>
      </div>

      <div className='happy'>
        <div className="card"> 
          <div className="imgBox">
            <div className="bark"></div>
            <img src="https://i.ibb.co/8gYd6Ng/lastofus.jpg" alt="Greeting Card" />
          </div>
          <div className="details">
            <h4 className="color1">{card.title}</h4>
            <h4 className="color2 margin">{card.subtitle}</h4>
            <p>Dear {card.name},</p>
            <p>{card.message}</p>
            <p className="text-right">Happy Birthday!</p>
            <p className="text-right">♥ {card.yourname}</p>
          </div>
          <button onClick={handleCopyUrl} className="copy-url-btn">Copy URL</button>
        </div>
      </div>

      {showPopup && <div className="popup">URL copied to clipboard!</div>}
    </div>
  );
};

export default CardDisplay;
