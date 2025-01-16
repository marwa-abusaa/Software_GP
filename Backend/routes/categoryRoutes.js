// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Get all categories
router.get('/categories', categoryController.getAllCategories);

// Add a new category
router.post('/categories', categoryController.addCategory);

router.delete('/categories/:id', categoryController.deleteCategory);


module.exports = router;
