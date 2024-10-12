const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    yourname: { type: String, required: true },
    message: { type: String, required: true },
    cardId: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
