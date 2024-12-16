const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contestVoteSchema = new Schema({
    contestName: {
        type: String,
        required: [true, "contestName is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    }
}, { timestamps: true });

const contestVoteModel = db.model('contestVote', contestVoteSchema);
module.exports = contestVoteModel;
