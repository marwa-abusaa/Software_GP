const router = require("express").Router();
const supervisorController = require('../controller/supervisor.controller');


router.patch("/supervisor", supervisorController.updateUserProfile);

router.delete("/supervisor", supervisorController.deleteUser);
router.get("/supervisor", supervisorController.getUserProfile);
router.get("/notActive", supervisorController.getNotActivatedSupervisors);



module.exports = router;