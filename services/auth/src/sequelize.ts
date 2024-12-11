/* eslint-disable no-useless-catch */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Sequelize } from 'sequelize';
import { Application } from "./declarations";

const config = require('config');
const dbSettings = config.get('dbSettings');

const dbs = {
  host: 'auth-posgres-srv',
  dialect: 'postgres',
  database: 'auth',
  username: 'postgres',
  password: 'postgres'
};

if (process.env.NODE_ENV === 'test') {
  dbs.host = 'localhost';
}

export default function (app: Application): void {
  // @ts-ignore
  const sequelize = dbSettings.url
    ? new Sequelize(dbSettings.url)
    // @ts-ignore
    : new Sequelize({
      logging: false,
      ...dbs,
      seederStorge: 'sequelize',
    });

  // handling sequelize query error
  // sequelize.query = async function (...args) {
  //   try {
  //     return await Sequelize.prototype.query.apply(this, args);
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // const oldSetup = app.setup;
  app.set('sequelizeClient', sequelize);

  // eslint-disable-next-line no-param-reassign
  // app.setup = function (...args): Application {
  //   const result = oldSetup.apply(this, args);

  // Set up data relationships
  // Sync to the database

  app.set('sequelizeSync', sequelize.sync({ alter: true }));

  // return result;
  // };
  function startSequelize() {
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });
  }
  app.set('startSequelize', startSequelize);
}
