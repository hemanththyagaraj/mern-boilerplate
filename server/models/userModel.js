const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be minimum 8 characters long'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator(val) {
        return this.password === val;
      },
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  this.confirmPassword = undefined;

  return next();
});

UserSchema.methods.correctPassword = async function (candidatePassword, hashedPassword) {
  const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
