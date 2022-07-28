const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);

module.exports = app;
