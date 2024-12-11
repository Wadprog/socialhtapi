/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import Sequelize from 'sequelize';
import { Express as Application } from 'express';
import fs from 'fs';

export default function (app: Application): void {
    const sequelize = app.get('sequelizeClient');
    const tables = fs.readdirSync('../../migrations/models');

    tables.forEach((tableFiles) => {
        const table = require(`../../migrations/models/${tableFiles}`).default;
        table(sequelize, Sequelize.DataTypes);
    });
}