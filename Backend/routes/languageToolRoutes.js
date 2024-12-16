// routes/languageToolRoutes.js
const express = require('express');
const router = express.Router();
const languageToolController = require('../controller/languageToolController');

// مسار للتحقق من النصوص
router.post('/check-text', languageToolController.checkText);
router.post("/check-spelling", languageToolController.checkSpelling);


module.exports = router;
