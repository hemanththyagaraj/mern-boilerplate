const environments = require('../utils/environments');

const config = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || environments.development,
  jwtSecret: process.env.JWT_SECRET || 'THIS_IS_DEVELOPMENT_JWT_DUMMY_SECRET',
  mongoUri: process.env.MONGODB_URI || process.env.MONGODB_HOST || `mongodb://${process.env.IP || 'localhost'}:${process.env.MONGODB_PORT || '27017'}/mern-project`,
};

module.exports = config;
