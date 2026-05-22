const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authController');



router.post('/register', async (req, res) => {
  await authController.registerUser(req, res);
});

router.post('/login', async (req, res) => {
  await authController.loginUser(req, res);
});

module.exports = router;