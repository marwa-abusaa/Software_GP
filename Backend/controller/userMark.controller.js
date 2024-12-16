
const UserMarkService = require('../services/userMark.service');
const CourseModel = require('../models/courses.model');
const QuizModel = require("../models/quiz.model");
const UserModel = require("../models/user.model");
const UserMarkModel = require("../models/userMark.model");



exports.addTotalMark = async (req, res, next) => {
    try {
        const {userEmail,courseId,UserTotalMark} = req.body;

        // Validate if courseId exists
        const courseExists = await CourseModel.find({courseId});
        if (!courseExists) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid courseId: Course does not exist.'
            });
        }

                // Find the quiz question by questionId
                const quiz = await QuizModel.findOne({courseId });
                if (!quiz) {
                    return { status: false, message: "Quiz not found" };
                }
        
                const totalMarkk=quiz.totalMark;

        // Add the total mark
        let markData = await UserMarkService.addTotalMark(
            userEmail,
            courseId,
            UserTotalMark,
            totalMarkk     
        );

        res.json({ status: true, success: markData });
    } catch (error) {
        console.error(error, 'err---->');
        next(error);
    }
};

exports.getChildrenMark = async (req, res, next) => {
    try {
        const { courseId } = req.body;

        // استدعاء الخدمة
        const marks = await UserMarkService.getChildrenMark(courseId);
        if(marks.length>0){
            res.status(200).json({ status: true, success: marks });
        }
        else{
            res.status(400).json({ status: false, message: 'No grades yet.' });
        } 

        res.json({ status: true, success: marks });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.checkUserQuizAttempt = async (req, res, next) => {
    try {
        const { userEmail, courseId } = req.body;

        // استدعاء الخدمة للتحقق
        const existingRecord = await UserMarkService.checkUserAttempt(userEmail, courseId);

        if (existingRecord) {
            return res.status(400).json({ 
                status: false, 
                message: "You can't attempt the quiz again." 
            });
        }

        res.status(200).json({ 
            status: true, 
            message: "You can attempt the quiz." 
        });
    } catch (error) {
        console.error(error, 'err---->');
        next(error);
    }
};

exports.getMyCourseGrade = async (req, res, next) => {
    try {
        const { userEmail, courseId } = req.body;

        // استدعاء الخدمة
        const grade = await UserMarkService.getMyCourseGrade(userEmail, courseId);

        if(grade.length>0){
            res.status(200).json({ status: true, success: grade });
        }
        else{
            res.status(400).json({ status: false, message: 'No grade yet.' });
        }   
     } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.getMyGrades = async (req, res, next) => {
    try {
        const { userEmail } = req.body;

        // استدعاء الخدمة
        const grades = await UserMarkService.getMyGrades(userEmail);
        if(grades.length>0){
            res.status(200).json({ status: true, success: grades });
        }
        else{
            res.status(400).json({ status: false, message: 'No grades yet.' });
        } 

    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};






