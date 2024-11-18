const db = require('../config/db');
const UserModel = require("./user.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contestSchema = new Schema({
    supervisorId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    supervisorName: {
        type: String,
        required: true
    },
    required_score: {
        type: Number,
        required: true
    },
    submit_date: {
        type: Date,
        required: true
    },
    voting_start_date: {
        type: Date,
        required: true
    },
    voting_end_date: {
        type: Date,
        required: true
    },
},{timestamps:true});

const ContestModel = db.model('contests',contestSchema);
module.exports = ContestModel;