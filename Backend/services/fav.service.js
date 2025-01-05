const Favorite = require('../models/fav.model');

// Add a book to a user's favorites
const addBookToFavorites = async (email, bookId) => {
  try {
    const favorite = await Favorite.findOne({ email: email });
    if (favorite) {
      // Check if the book is already in favorites
      if (!favorite.fav.includes(bookId)) {
        favorite.fav.push(bookId);
        await favorite.save();
        return 'Book added to favorites';
      } else {
        throw new Error('Book already in favorites');
      }
    } else {
      // If no favorite record exists for the user, create one
      await Favorite.create({ email: email, fav: [bookId] });
      return 'Favorites created and book added';
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Remove a book from a user's favorites
const removeBookFromFavorites = async (userEmail, bookId) => {
  try {
    const favorite = await Favorite.findOne({ email: userEmail });

    if (favorite) {
      const index = favorite.fav.indexOf(bookId);
      if (index > -1) {
        favorite.fav.splice(index, 1);  // Remove the book
        await favorite.save();
        return 'Book removed from favorites';
      } else {
        throw new Error('Book not found in favorites');
      }
    } else {
      throw new Error('Favorites not found for user');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all the favorite books for a user
const getFavoriteBooks = async (userEmail) => {
  try {
    const favorite = await Favorite.findOne({ email: userEmail }).populate('fav');
    if (favorite) {
      return favorite.fav;
    } else {
      throw new Error('Favorites not found for user');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Check if a book is in the user's favorites
const isBookInFavorites = async (bookId, email) => {
    if (!bookId || !email) {
      throw new Error('Book ID and Email are required');
    }
  
    try {
      const favorite = await Favorite.findOne({ email: email });
      if (favorite) {
        // Check if the bookId is in the fav array
        return favorite.fav.includes(bookId);
      } else {
        return false; // If no favorites are found for the user
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

module.exports = {
  addBookToFavorites,
  removeBookFromFavorites,
  getFavoriteBooks,
  isBookInFavorites,
};
