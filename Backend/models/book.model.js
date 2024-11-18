const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
    },
    Description: {
        type: String,
        required: [true, "Description is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    rate: {
        type: Number,
        required: [true, "rate is required"],
    },
    review: {
        type: Number,
        required: [true, "review is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
    pdfLink:{
        type: String
    }

}, { timestamps: true });

const bookModel = db.model('book', bookSchema);
module.exports = bookModel;
