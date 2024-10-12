const Card = require('../models/Card');
const { v4: uuidv4 } = require('uuid');

// Create a new greeting card
const createCard = async (req, res) => {
    const { name,yourname, message } = req.body;
    const cardId = uuidv4(); // Generate a unique ID for the card

    try {
        const card = new Card({ name,yourname, message, cardId });
        await card.save();
        res.status(201).json({ message: 'Card created successfully', cardId });

    } catch (error) {
        res.status(500).json({ message: 'Error creating card', error: error.message });
    }
};

// Retrieve a greeting card by ID
const getCardById = async (req, res) => {
    const { cardId } = req.params;

    try {
        const card = await Card.findOne({ cardId });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createCard,
    getCardById
};
