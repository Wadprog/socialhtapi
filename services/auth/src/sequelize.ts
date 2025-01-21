import { Sequelize, Dialect, Options, QueryOptions, QueryOptionsWithType, QueryTypes } from 'sequelize';
import { Application } from "./declarations";

const config = require('config');
const dbSettings = config.get('dbSettings');

// console.log({ dbSettings: config.get('DB_PASSWORD')})

const dbs: Options = {
  host: 'auth-posgres-srv',
  dialect: 'postgres' as Dialect,
  database: 'auth',
  username: 'postgres',
  password: 'postgres'
};

if (process.env.NODE_ENV === 'test') {
  dbs.host = 'localhost';
}

console.log({ dbs })
export default function (app: Application): void {

  console.log('default function worked')
  let sequelize: any = undefined;

    sequelize = dbSettings.url
      ? new Sequelize(dbSettings.url)
      : new Sequelize(dbs);

  sequelize.query = async function (...args: [sql: string | { query: string; values: unknown[]; }, options?: QueryOptions | QueryOptionsWithType<QueryTypes.RAW> | undefined]) {
    try {
      return await Sequelize.prototype.query.apply(this, args);
    } catch (err) {
      throw err;
    }
  };

  // const oldSetup = app.setup;
  app.set('sequelizeClient', sequelize);

  // eslint-disable-next-line no-param-reassign
  // app.setup = function (...args): Application {
  //   const result = oldSetup.apply(this, args);

  // Set up data relationships
  // Sync to the database

  // app.set('sequelizeSync', sequelize.sync());

  // return result;
  // };
  function startSequelize() {
    if (!sequelize)
      throw new Error('Sequelize need to be init')
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });
  }
  app.set('startSequelize', startSequelize);
}
