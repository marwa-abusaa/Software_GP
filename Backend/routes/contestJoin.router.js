const router = require("express").Router();
const ContestJoinController = require('../controller/contestJoin.controller')

router.post("/cnotestJoin",ContestJoinController.addContestJoin);
router.get("/cnotestJoin",ContestJoinController.getContestJoinByName);
router.delete("/cnotestJoin",ContestJoinController.deleteAllContestJoin);
router.get("/cnotestJoin/details",ContestJoinController.getContestJoinDetailsByNameAndEmail);
router.patch("/cnotestJoin",ContestJoinController.updateContestVote);



module.exports = router;