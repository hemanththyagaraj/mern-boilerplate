const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const {
      name, email, password, confirmPassword,
    } = req.body;
    await User.create({
      name, email, password, confirmPassword,
    });
    res.status(200).json({
      status: 'success',
      data: 'User successfully created',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error && error.message ? error.message : 'Something went wrong',
    });
  }
};
