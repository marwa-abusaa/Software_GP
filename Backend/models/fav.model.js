const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book model reference (assuming you already have a Book model)
const Book = require('./book.model');  // Adjust the path to your Book model

// Favorite Schema
const favoriteSchema = new mongoose.Schema({
  email: {
    type: String,  // Store the user's email as a string
    required: true,
    unique: true,  // Each user can have only one favorites document
  },
  fav: [
    {
      type: mongoose.Schema.Types.ObjectId,  // Reference to Book model
      ref: 'book',  // This links to the Book model
    },
  ],
});

// Create the Favorite model
const Favorite = db.model('Favorite', favoriteSchema);

module.exports = Favorite;
