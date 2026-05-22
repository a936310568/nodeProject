const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.route('/')
  .post(protect, userController.createUser)
  .get(protect, userController.getUsers);

router.route('/:id')
  .get(protect, userController.getUserById)
  .put(protect, userController.updateUser)
  .delete(protect, userController.deleteUser);

module.exports = router;