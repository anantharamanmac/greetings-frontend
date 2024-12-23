const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cardRoutes = require('./routes/cardRoutes');
const userRoutes = require('./routes/userRoutes');  // Import user routes
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware
app.use(cors({
    //origin: 'http://localhost:3000', // Replace with your frontend URL
    origin: 'https://greetontime.gforx.online', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the HTTP methods you want to allow
    credentials: true // If you need to allow cookies to be sent
}));

app.use(express.json());

// API routes
app.use('/api/cards', cardRoutes);
app.use('/api/users', userRoutes); // Add the user routes for login/signup

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
