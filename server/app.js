const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use('/api/v1/users', (req, res) => {
  res.status(200).json({
    status: 'successs',
    message: 'Successfully received the reques',
  });
});

module.exports = app;
