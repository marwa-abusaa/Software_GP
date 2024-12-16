const router = require("express").Router();
const childController = require('../controller/child.controller');


router.patch("/child", childController.updateUserProfile);
router.delete("/child", childController.deleteUser);
router.get("/child", childController.getUserProfile);
router.post("/child/story", childController.incrementCreatedStory);
router.post("/child/contest", childController.incrementContests);
router.post("/child/course", childController.incrementCourses);


module.exports = router;