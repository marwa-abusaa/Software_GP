const router = require("express").Router();
const superChildController = require('../controller/superChild.controller');


router.post("/superChild", superChildController.addSuperChild);
router.post("/superChild/children", superChildController.getAllChildren);
router.post("/superChild/child", superChildController.getChild);



module.exports = router;