const config = require('config');

const env = process.env?.NODE_ENV?.trim() || 'development';

// const dbSettings = config.get('dbSettings');

const dbs = {
  host: 'mailer-posgres-srv',
  dialect: 'postgres',
  database: 'mailer',
  username: 'postgres',
  password: 'postgres'
};

module.exports = {
  [env]: {
    ...dbs,
  },
};
