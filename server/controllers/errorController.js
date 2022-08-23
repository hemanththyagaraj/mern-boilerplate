const environments = require('../utils/environments');

const handleErrorDev = (err, res) => res.status(err?.statusCode || 500).json({
  status: err?.status || 'fail',
  error: err,
  message: err?.message,
  stack: err.stack,
});

const handleErrorProd = (err, res) => {
  const genericErrorMessage = 'Something went wrong!';
  if (err?.isOperational) {
    return res.status(err?.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: genericErrorMessage,
  });
};

exports.globalErrorHandler = (err, req, res, next) => {
  const error = err;
  if (process.env.ENVIRONMENT === environments.development) handleErrorDev(error, res);
  else handleErrorProd(error, res);
  next();
};
