const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user: user || null,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(204).json();
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { _id: id } = req.user;
  const {
    name, email, password, confirmPassword,
  } = req.body;

  if (password || confirmPassword) return next(new AppError('You cannot update your password from this route. Please use /update route'));

  // if name or email is undefined, those fields will not be updated
  const updatedUser = await User.findByIdAndUpdate(id, { name, email }, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
