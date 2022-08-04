const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

app.use('/api/v1/logout', (req, res) => {
  res.status(401).json({
    status: 'fail',
  });
});

app.use('/api/v1/users', userRouter);

module.exports = app;
