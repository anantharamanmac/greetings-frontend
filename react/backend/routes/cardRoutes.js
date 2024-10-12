const express = require('express');
const router = express.Router();
const {
    createCard,
    getCardById
} = require('../controllers/cardController');

// Create a new card
router.post('/create-card', createCard);

// Retrieve a card by ID
router.get('/:cardId', getCardById);

module.exports = router;
