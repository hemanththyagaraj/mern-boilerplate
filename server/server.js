const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `${__dirname}/../server/config.env` });

const app = require('./app');
const config = require('./config/config');

const connectToDB = async () => {
  try {
    console.log(config.mongoUri);
    await mongoose.connect(config.mongoUri);
    console.log('Successfully connected to the database');
  } catch (error) {
    console.log(error);
    console.log('Failed to connect to the database');
  }
};

connectToDB();

app.listen(config.port, () => {
  console.log(`Successfully listening on PORT: ${config.port}`);
});
