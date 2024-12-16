const db = require('../config/db');
const UserModel = require("./user.model");
const CourseModel = require("./courses.model");
const QuizModel = require("./quiz.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const UserMarkSchema = new Schema({
    userEmail:{
        type: String,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: CourseModel.modelName,
        required: true
    },
    UserTotalMark: {
        type: Number,
        required: true
    },
    totalMark: {
        type: Number,
        required: true
    },


}, { timestamps: true });


// Create the model
const UserMarkModel = db.model('UserMark', UserMarkSchema);
module.exports = UserMarkModel;
