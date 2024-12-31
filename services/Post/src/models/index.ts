import Sequelize from 'sequelize';

import { Application } from '../declarations';

import user from './user';
import post from './post';
import korem from './korem';
import media from './media';
import community from './community';
import PostMedia from './post_media';


const tables = [
  user,
  post,
  korem,
  media,
  community,
  PostMedia
];

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes);
  });
}
