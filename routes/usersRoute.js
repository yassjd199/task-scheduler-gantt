var express = require('express');
var router = express.Router();

const {
  createUserController,
  getUserByIdController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} = require('./controllers/userControllers');

router.get('/users', getUserByIdController);
router.get('/users/:UserId', getUserByIdController);
router.post('/users', createUserController);
router.put('/users/:UserId', updateUserController);
router.delete('/users/:UserId', deleteUserController);

module.exports = router;

