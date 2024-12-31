const env = process.env?.NODE_ENV?.trim() || 'development';

/**
 * process.env.DB_NAME = 'test';
  process.env.DB_USER = 'test';
  process.env.DB_PASSWORD = 'test';
 */

const dbs = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

module.exports = {
  [env]: {
    ...dbs,
  },
};
