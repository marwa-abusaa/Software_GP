const router = require("express").Router();
const QuizController = require('../controller/quiz.controller')

router.put("/addQuestion",QuizController.addQuestion);

router.post("/getQuizQuestions",QuizController.getQuizQuestions)

router.post("/validateAnswer",QuizController.validateAnswer)

// router.post("/getCourseDetails",CoursesController.getCourseDetails)


// router.post("/deleteCourse",CoursesController.deleteCourse)

// router.post("/getCourseDetails",CoursesController.getCourseDetails)

// router.get("/getAllCourses",CoursesController.getAllCourses)


module.exports = router;