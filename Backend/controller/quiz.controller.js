
const QuizService = require('../services/quiz.service');
const CourseModel = require('../models/courses.model');

exports.addQuestion = async (req, res, next) => {
    try {
        const {question, answer1, answer2, answer3, courseId, correctAnswer, questionMark, totalMark } = req.body;

        // Validate if courseId exists
        const courseExists = await CourseModel.findById(courseId);
        if (!courseExists) {
            return res.status(400).json({ 
                status: false, 
                message: courseId
            });
        }
        console.log(courseId);
        // Add the question
        let questionData = await QuizService.addQuestion(
            question,
            answer1,
            answer2,
            answer3,
            courseId,
            correctAnswer,
            questionMark,
            totalMark
        );

        res.json({ status: true, success: questionData });
    } catch (error) {
        console.error(error, 'err---->');
        next(error);
    }
};

exports.getQuizQuestions = async (req, res, next) => {
    try {
        const { courseId } = req.body;
        let questions = await QuizService.getQuizQuestions(courseId);

        // إذا كانت الاستجابة تحتوي على أسئلة
        if (questions && questions.length > 0) {
            // شريط 3 أسئلة عشوائية
            const randomQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
            res.json({ status: true, success: randomQuestions });
        } else {
            res.status(400).json({ status: false, message: 'No questions found for this course.' });
        }
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.validateAnswer = async (req, res, next) => {
    try {
        const { questionId, correctAnswer } = req.body;

        // Validate the answer using the QuizService
        const result = await QuizService.validateAnswer(questionId, correctAnswer);

        if (!result.status) {
            return res.status(404).json({ status: false, message: result.message });
        }

        res.json({
            status: true,
            success: {
                questionId: result.questionId,
                isCorrect: result.isCorrect,
                mark: result.mark,
                totalMark: result.totalMark
            }
        });
    } catch (error) {
        console.error("Error in validateAnswer:", error);
        next(error);
    }
};


