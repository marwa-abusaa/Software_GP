const db = require('../config/db');
//const UserModel = require("./user.model");
const CourseModel = require("./courses.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const quizSchema = new Schema({
    // questionId: {
    //     type: Number,
    //     unique: true // Ensure questionId is unique
    // },
    question: {
        type: String,
        required: true
    },
    answer1: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    answer3: {
        type: String,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: CourseModel.modelName,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    questionMark: {
        type: Number,
    },
    totalMark: {
        type: Number,
    },
    // supervisorId: {
    //     type: Schema.Types.ObjectId,
    //     ref: UserModel.modelName,
    //     required: true
    // }

}, { timestamps: true });

// Pre-save middleware to auto-increment questionId
// quizSchema.pre('save', async function (next) {
//     if (this.isNew) {
//         try {
//             const lastQuiz = await QuizModel.findOne().sort({ questionId: -1 }).exec(); // Find the highest questionId
//             this.questionId = lastQuiz && lastQuiz.questionId ? lastQuiz.questionId + 1 : 1; // Increment or start at 1
//             next();
//         } catch (err) {
//             next(err);
//         }
//     } else {
//         next();
//     }
// });

// Create the model
const QuizModel = db.model('quizzes', quizSchema);
module.exports = QuizModel;
