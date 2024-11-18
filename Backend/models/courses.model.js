const db = require('../config/db');
const UserModel = require("./user.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const coursesSchema = new Schema({
    supervisorId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    title: {
        type: String,
        required: true
    },
    courseType: {
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
    score: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
},{timestamps:true});

const CoursesModel = db.model('courses',coursesSchema);
module.exports = CoursesModel;