const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {

  dbSettings: {
    username: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE',
    host: 'localhost',
  },
};
