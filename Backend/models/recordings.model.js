const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecordingsSchema = new Schema({
    pdfId: {
        type: String,
        required: [true, "pdfId is required"],

    },
    url: {
        type: String,
        required: [true, "url is required"],

    },  

}, { timestamps: true });

const RecordingsModel = db.model('recordings', RecordingsSchema);
module.exports = RecordingsModel;
