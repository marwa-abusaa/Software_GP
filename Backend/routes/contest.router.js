const router = require("express").Router();
const ContestsController = require('../controller/contest.controller')

router.post("/addContest",ContestsController.addContest);

 router.post("/getSupervisorContests",ContestsController.getSupervisorContests)

 router.post("/deleteContest",ContestsController.deleteContest)

 router.post("/getContestDetails",ContestsController.getContestDetails)

 router.get("/getAllContests",ContestsController.getAllContests)

 router.patch("/updateContest",ContestsController.updateContest)

module.exports = router;