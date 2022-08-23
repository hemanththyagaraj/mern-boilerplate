const express = require('express');
const {
  signUp, protect, signOut, signIn,
} = require('../controllers/authController');
const {
  getAllUsers, getUser, deleteUser, updateUser,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', signUp);

router.get('/signout', signOut);

router.post('/signin', signIn);

router.route('/')
  .get(protect, getAllUsers);

router.route('/:id')
  .get(protect, getUser)
  .delete(protect, deleteUser)
  .patch(protect, updateUser);
module.exports = router;
