const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contestJoinSchema = new Schema({
    contestName: {
        type: String,
        required: [true, "contestName is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    bookName: {
        type: String,
        required: [true, "bookName is required"],
    },
    note: {
        type: String,
    },vote: {
        type: Number,
    }
}, { timestamps: true });

const contestJoinModel = db.model('contestJoin', contestJoinSchema);
module.exports = contestJoinModel;
