import fs from 'fs';
import { Application } from '../declarations';
import { Sequelize } from 'sequelize';


export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const models = fs.readdirSync(__dirname);
  models.forEach((model) => {
    if (model.startsWith('index') || model.startsWith('messagesentlogs')) return;
    // eslint-disable-next-line global-require
    const routeFile = require(`./${model}`).default;
    routeFile(sequelize, Sequelize);

  })
};