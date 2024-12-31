// const config = require('config');

// const env = process.env?.NODE_ENV?.trim() || 'development';

// const dbSettings = config.get('dbSettings');
// console.log('\n\n\n ***DEB**\n');
// console.log({ env, dbSettings });

module.exports = {
  ['development']: {
  host: 'connection-posgres-srv',
  dialect: 'postgres',
  database: 'connection',
  username: 'postgres',
  password: 'postgres'
}
};
