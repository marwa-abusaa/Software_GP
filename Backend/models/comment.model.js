const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    commentText: {
        type: String,
        required: [true, "commentText is required"],
    },
    rate: {
        type: Number,
        required: [true, "rate is required"],
    },
    bookName: {
        type: String,
        required: [true, "bookName is required"],
    }
}, { timestamps: true });

const commentModel = db.model('comment', commentSchema);
module.exports = commentModel;
