const config = require('config');

const env = process.env?.NODE_ENV?.trim() || 'development';

// const dbSettings = config.get('dbSettings');

const dbs = {
  host: 'address-posgres-srv',
  dialect: 'postgres',
  database: 'address',
  username: 'postgres',
  password: 'postgres'
};

module.exports = {
  [env]: {
    ...dbs,
  },
};
