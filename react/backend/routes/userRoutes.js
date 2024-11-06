const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware
const Card = require('../models/Card'); // Assuming Card model is already defined for storing greeting cards

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Greeting history route
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // This comes from the decoded JWT in the authMiddleware
    const cards = await Card.find({ createdBy: userId }); // Find cards created by this user
    res.json({ cards });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching greeting history' });
  }
});

module.exports = router;
