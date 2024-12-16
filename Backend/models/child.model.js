const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const childSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email can't be empty"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Email format is not correct",
        ],
        unique: true,
    },
 
    createdStroryNum:{
        type: Number
    },
    contestsNum:{
        type: Number
    },
    coursesNum:{
        type: Number
    },
    points:{
        type: Number
    },
   
   
   

}, { timestamps: true });




const childModel = db.model('child', childSchema);
module.exports = childModel;
