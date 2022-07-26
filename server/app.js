const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const { globalErrorHandler } = require('./controllers/errorController');

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

app.use('/api/v1/users', userRouter);

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
