const express = require('express');
const openAiController = require('../controllers/openAiController');
const router = express.Router();

router.post('/', openAiController.getOpenAiResponse);

module.exports = router;