const dotenv = require('dotenv')

dotenv.config();

var config = {
  DB_URI : process.env.MONGODB_CONNECTION_STRING,
  DB_NAME : "twitter-database"
}

module.exports = config;
