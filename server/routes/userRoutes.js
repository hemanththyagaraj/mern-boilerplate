const express = require('express');
const { signUp } = require('../controllers/authController');
const { getAllUsers } = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', signUp);

router.route('/')
  .get(getAllUsers);

module.exports = router;
