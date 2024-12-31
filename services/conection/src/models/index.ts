import Sequelize from 'sequelize';

import { Application } from '../declarations';
/** Tables */


import user from './user';
import friend from './friends';
import Visitors from './visits';
// import interest from './interest';


const tables = [

  user,
  friend,
  Visitors,
  // interest,
  // errorCodes,
  // expiryTime,
  
];

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes);
  });
}
