import Sequelize from 'sequelize';
import { sequelizeWrapper } from '@webvital/micro-common';

// import { Application } from '../declarations';

import user from './user';
import post from './post';
import korem from './korem';
import media from './media';
import community from './community';


const tables = [
  user,
  post,
  korem,
  media,
  community,
];

export default function (): void {
  const sequelize = sequelizeWrapper.client;

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes);
  });
}


// import fs from 'fs';
// import { Sequelize } from 'sequelize';
// import { sequelizeWrapper } from '@webvital/micro-common';


// export default function (): void {

//   const models = fs.readdirSync(__dirname);
//   models.forEach((model) => {
//     if (model.startsWith('index')) return;
//     // eslint-disable-next-line global-require
//     const routeFile = require(`./${model}`).default;
//     routeFile(sequelizeWrapper.client, Sequelize);

//   })
// };