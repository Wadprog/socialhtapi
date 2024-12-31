const env = process.env?.NODE_ENV || 'development';


const dbs = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  database: process.env.DB_NAME ,
  username: process.env.DB_USER ,
  port : process.env.DB_PORT ,
  password: process.env.DB_PASSWORD 
};
// const dbs = {
//   host: 'localhost',
//   dialect: 'postgres',
//   database: 'test',
//   username: 'test',
//   port : '5432',
//   password: 'test', 
// };

console.log('dbs', dbs);

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
