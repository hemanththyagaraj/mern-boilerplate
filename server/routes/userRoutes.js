const express = require('express');
const { signUp, protect, signOut } = require('../controllers/authController');
const { getAllUsers, getUser } = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', signUp);

router.get('/signout', signOut);

router.route('/')
  .get(protect, getAllUsers);

router.route('/:id')
  .get(getUser);

module.exports = router;
