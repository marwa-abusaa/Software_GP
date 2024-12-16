const router = require("express").Router();
const ContestVoteController = require('../controller/contestVote.controller')

router.post("/cnotestVote",ContestVoteController.addContestVote);
router.post("/cnotestVote/check",ContestVoteController.checkVote);





module.exports = router;