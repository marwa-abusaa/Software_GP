const router = require("express").Router();
const UserMarkController = require('../controller/userMark.controller')

router.post("/addTotalMark",UserMarkController.addTotalMark);
router.post("/getChildrenMark",UserMarkController.getChildrenMark)

router.post("/checkUserQuizAttempt",UserMarkController.checkUserQuizAttempt)
router.post("/getMyCourseGrade",UserMarkController.getMyCourseGrade)
router.post("/getMyGrades",UserMarkController.getMyGrades)






module.exports = router;