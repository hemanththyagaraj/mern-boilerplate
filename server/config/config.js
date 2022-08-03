const environments = require('../utils/environments');

const config = {
  port: process.env.REACT_APP_BACKEND_SERVER_PORT || 8000,
  env: process.env.NODE_ENV || environments.development,
  jwtSecret: process.env.JWT_SECRET || 'THIS_IS_DEVELOPMENT_JWT_DUMMY_SECRET',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  mongoUri: process.env.MONGODB_URI || process.env.MONGODB_HOST || `mongodb://${process.env.IP || 'localhost'}:${process.env.MONGODB_PORT || '27017'}/mern-project`,
  cookieExpiresIn: new Date(Date.now() + (24 * 60 * 60 * 1000)),
};

module.exports = config;
