const router = require("express").Router();
const CoursesController = require('../controller/courses.controller')

router.post("/addCourse",CoursesController.addCourse);

 router.post("/getSupervisorCourses",CoursesController.getSupervisorCourses)

 router.post("/deleteCourse",CoursesController.deleteCourse)

 router.post("/getCourseDetails",CoursesController.getCourseDetails)

 router.get("/getAllCourses",CoursesController.getAllCourses)


module.exports = router;