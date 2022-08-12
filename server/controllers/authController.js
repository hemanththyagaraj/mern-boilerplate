const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config/config');
const User = require('../models/userModel');
const { catchAsync } = require('../utils/catchAsync');
const { jwtTokenKey } = require('../utils/constants');
const environments = require('../utils/environments');
const AppError = require('../utils/appError');

const signToken = (id) => jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

const createAndSendToken = (user, statusCode, req, res) => {
  const { _id: id } = user;

  const token = signToken(id);

  res.cookie(jwtTokenKey, token, {
    expires: config.cookieExpiresIn,
    httpOnly: true,
    secure: process.env.ENVIRONMENT === environments.production,
    sameSite: true,
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const {
    name, email, password, confirmPassword,
  } = req.body;
  const user = await User.create({
    name, email, password, confirmPassword,
  });

  user.password = undefined;

  createAndSendToken(user, 201, req, res);
});

exports.signOut = catchAsync(async (req, res) => {
  res.clearCookie(jwtTokenKey);
  res.status(200).json({
    message: 'Signed out successfully',
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const { cookies, headers } = req;

  // 1. extract the token
  let token;
  if (cookies[jwtTokenKey]) {
    token = cookies[jwtTokenKey];
  } else {
    const authToken = headers?.authorization?.split('Bearer ');
    token = authToken ? authToken[1] : authToken;
  }

  // 2. if token does not exist, send 401
  if (!token) throw new AppError('Unauthorized. Please sign in again', 401);

  // 3. if token exist, verify if it is valid
  const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

  // 4. if valid get the user based on the jwt payload userId
  const user = await User.findById(decoded.id);

  if (!user) throw new AppError('Unauthorized. User does not exist', 401);
  req.user = user;
  return next();
});
