const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');
const environments = require('../utils/environments');

const signToken = (id) => jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

const createAndSendToken = (user, statusCode, req, res) => {
  const { _id: id } = user;

  const token = signToken(id);

  res.cookie('jwt_token', token, {
    expires: config.cookieExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === environments.production,
    sameSite: true,
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res) => {
  try {
    const {
      name, email, password, confirmPassword,
    } = req.body;
    const user = await User.create({
      name, email, password, confirmPassword,
    });

    user.password = undefined;

    createAndSendToken(user, 201, req, res);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// exports.protect = (req, res) => {

// };
