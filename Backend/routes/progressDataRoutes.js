const router = require("express").Router();
const { getProgressData, addProgressData,incrementProgressData ,getProgressDataByTypeForAdmin} = require('../controller/progressDataController');


// Route to get progress data
router.get('/progress', getProgressData);

// Route to add progress data
router.post('/progress', addProgressData);
router.patch('/progress', incrementProgressData);
router.get('/admin/progress', getProgressDataByTypeForAdmin);








module.exports = router;
