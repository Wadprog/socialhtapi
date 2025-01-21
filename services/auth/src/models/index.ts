import fs from 'fs';
import { Sequelize } from 'sequelize';
import { sequelizeWrapper } from '@webvital/micro-common';


export default function (): void {
  
  const models = fs.readdirSync(__dirname);
  models.forEach((model) => {
    if (model.startsWith('index')) return;
    // eslint-disable-next-line global-require
    const routeFile = require(`./${model}`).default;
    routeFile(sequelizeWrapper.client, Sequelize);

  })
};