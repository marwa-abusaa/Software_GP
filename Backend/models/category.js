const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Science", "Poetry"
});

const Category = db.model('Category', categorySchema);

module.exports = Category;
