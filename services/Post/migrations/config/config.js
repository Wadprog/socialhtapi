// const config = require('config');

const env = process.env?.NODE_ENV?.trim() || 'development';

// const dbSettings = config.get('dbSettings');
// const dbs = {
//   host: 'post-posgres-srv',
//   dialect: 'postgres',
//   database: 'post',
//   username: 'postgres',
//   password: 'postgres'
// };
// module.exports = {
//   [env]: {
//     // ...dbSettings,
//     ...dbs,
//   },
// };


module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    port: process.env.DB_PORT
  },
  test: {
    database: 'auth',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    dialect: "postgres",
    logging: false,
  },
  production: {},

};