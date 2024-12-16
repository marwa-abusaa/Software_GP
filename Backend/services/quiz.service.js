const QuizModel = require("../models/quiz.model");

class QuizService{
    static async addQuestion(question,answer1,answer2,answer3,courseId,correctAnswer,questionMark,totalMark){
            const addQuestion = new QuizModel({question,answer1,answer2,answer3,courseId,correctAnswer,questionMark,totalMark});
            return await addQuestion.save();
    }

    static async getQuizQuestions(courseId) {
        const questions = await QuizModel.find({courseId})
        return questions;
    }

    static async validateAnswer(questionId, correctAnswer) {
        try {
            // Find the quiz question by questionId
            const quiz = await QuizModel.findOne({ questionId });
            if (!quiz) {
                return { status: false, message: "Question not found" };
            }

            // Check if the provided answer matches the correct answer
            const isCorrect = quiz.correctAnswer === correctAnswer;
            return {
                status: true,
                questionId,
                isCorrect,
                mark: isCorrect ? quiz.questionMark : 0,
                totalMark: quiz.totalMark
            };
        } catch (error) {
            console.error("Error validating answer:", error);
            throw error;
        }
    }

//     static async getCourseDetails(id) {
//         const coursesDetails = await QuizModel.findById(id);
//         return coursesDetails;
//     }
    
//     static async getAllCourses() {
//         const coursesList = await QuizModel.find({});
//         return coursesList;
//     }    


//    static async deleteCourse(id){
//         const deleted = await QuizModel.findByIdAndDelete({_id:id})
//         return deleted;
//    }
}

module.exports = QuizService;