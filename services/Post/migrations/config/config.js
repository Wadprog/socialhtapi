// const config = require('config');

const env = process.env?.NODE_ENV?.trim() || 'development';

// const dbSettings = config.get('dbSettings');
const dbs = {
  host: 'post-posgres-srv',
  dialect: 'postgres',
  database: 'post',
  username: 'postgres',
  password: 'postgres'
};
module.exports = {
  [env]: {
    // ...dbSettings,
    ...dbs,
  },
};
