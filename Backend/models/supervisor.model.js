const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const supervisorSchema = new Schema({
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
 
    cv:{
        type: String
    },
    activated:{
        type: String
    },studentNum:{
        type: Number
    }

}, { timestamps: true });




const supervisorModel = db.model('supervisor', supervisorSchema);
module.exports = supervisorModel;
