const router = require("express").Router();

const favoriteController = require('../controller/favoriteController');

// Add a book to favorites
router.post('/users/favorites', favoriteController.addBookToFavorites);

// Remove a book from favorites
router.delete('/users/favorites', favoriteController.removeBookFromFavorites);

// Get user's favorite books
router.get('/users/favorites', favoriteController.getFavoriteBooks);

router.get('/users/favorites/check', favoriteController.checkFavorite);


module.exports = router;
