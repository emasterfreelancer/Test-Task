const env = require("dotenv").config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_KEY: process.env.JWT_KEY,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  PORT: process.env.PORT,
};

module.exports = config;
