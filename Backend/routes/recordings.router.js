const router = require("express").Router();
const recordingsController = require('../controller/recordings.controller');
router.post("/recordings",recordingsController.addRecord);
router.post("/getRecordings",recordingsController.getAudioRecordsByPdfId);



module.exports = router;