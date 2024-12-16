const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
    },
    Description: {
        type: String,
    },
   
    status: {
        type: String,
    },
    superComment: {
        type: String,
    },
    image: {
        type: String,
    },
    pdfLink:{
        type: String
    },
    category:{
        type: String
    },
    draftId:{
        type: String
    },
    superEmail:{
        type:String
    }


}, { timestamps: true });

const myBookModel = db.model('myBook', bookSchema);
module.exports = myBookModel;
