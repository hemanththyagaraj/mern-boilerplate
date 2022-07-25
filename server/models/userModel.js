const mongoose = require('mongoose');
const constants = require('../utils/constants');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A user must have a name!'],
  },
  email: {
    type: String,
    trim: true,
    unique: [true, 'Email already exists'],
    required: [true, 'A user must have an email'],
    validate: {
      validator: (val) => constants.emailRegExp.test(val),
      message: 'Please provide a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: (val) => this.password !== val,
      message: 'Passwords do not match',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
