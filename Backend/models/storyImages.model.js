const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const storyImageSchema = new Schema({
    url: {
        type: String,
        required: [true, "Url is required"],

    },
    email: {
        type: String,
        required: [true, "email is required"],

    },
    Description: {
        type: String,
    },
    category: {
        type: String,
    },
    

}, { timestamps: true });

const storyImagesModel = db.model('storyImages', storyImageSchema);
module.exports = storyImagesModel;
