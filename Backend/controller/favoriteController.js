const favoriteService = require('../services/fav.service');

// Add a book to favorites
const addBookToFavorites = async (req, res) => {
  const { email,bookId } = req.body;
  try {
    const message = await favoriteService.addBookToFavorites(email, bookId);
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

// Remove a book from favorites
const removeBookFromFavorites = async (req, res) => {
  const { email, bookId } = req.body;

  try {
    const message = await favoriteService.removeBookFromFavorites(email, bookId);
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

// Get user's favorite books
const getFavoriteBooks = async (req, res) => {
    const { email } = req.query; 
  try 
  {
    console.log("im here")
    const books = await favoriteService.getFavoriteBooks(email);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

// Controller method to check if the book is in favorites
const checkFavorite = async (req, res) => {
    const { email,bookId } = req.query; // Get bookId from query parameter

    try {
      const isFavorite = await favoriteService.isBookInFavorites(bookId, email);
      res.status(200).json({ isFavorite });
    } catch (error) {
      res.status(400).send(`Error: ${error.message}`);
    }
  };



module.exports = {
  addBookToFavorites,
  removeBookFromFavorites,
  getFavoriteBooks,
  checkFavorite,
};
