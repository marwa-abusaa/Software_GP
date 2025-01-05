const router = require("express").Router();
const { getProgressData, addProgressData,incrementProgressData } = require('../controller/progressDataController');


// Route to get progress data
router.get('/progress', getProgressData);

// Route to add progress data
router.post('/progress', addProgressData);
router.patch('/progress', incrementProgressData);


module.exports = router;
