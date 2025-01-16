const router = require("express").Router();
const dashboardController = require('../controller/dashboard.controller');

router.get('/:collectionName/:role?', dashboardController.getCount);

module.exports = router;