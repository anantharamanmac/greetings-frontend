import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CardDisplay.css'; // Ensure you have this CSS file

const CardDisplay = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);

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

  if (!card) return <div>Loading...</div>;

  return (
    <div className='happy '>
      <h4 >Happy Birthday</h4> {/* Use card title */}
        
       
    <div className="card"> 
      
      <div className="imgBox">
        <div className="bark"></div>
        <img src="https://i.ibb.co/8gYd6Ng/lastofus.jpg" alt="Greeting Card" /> {/* Assuming your card has an imageUrl field */}
      </div>
      <div className="details">
        <h4 className="color1">{card.title}</h4> {/* Use card title */}
        <h4 className="color2 margin">{card.subtitle}</h4> {/* Use card subtitle */}
        <p>Dear {card.recipientName},</p> {/* Assuming recipient name is in the database */}
        <p>{card.message}</p> {/* Use card message */}
        <p className="text-right">Happy Birthday!</p> {/* You can adjust this text */}
        <p className="text-right">♥ {card.sender}</p> {/* Assuming sender's name is in the database */}
      </div>
    </div>
    </div>
  );
};

export default CardDisplay;
