/* eslint-disable no-unused-vars */
import cors from 'cors';
// import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import { Request, Response, NextFunction } from 'express';

import feathers, {
  HookContext as FeathersHookContext,
} from '@feathersjs/feathers';

import database from './models';
import services from './services';
import sequelize from './sequelize';
import middleware from './middleware';
import common from './utils/common';
import { Application } from './declarations';
import authentication from './authentication';

dotenv.config();
const { sendErrorResponse } = common;

const app: Application = express(feathers());
app.configure(configuration());
app.use(express.json());

app.use(cors());
// app.use(helmet());

app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(express.urlencoded({ extended: true }));

app.configure(express.rest());

app.configure(sequelize);

app.configure(middleware);
// app.configure(authentication);
app.configure(database);
app.get('startSequelize')();
app.configure(services);
app.use(express.notFound());
app.use(express.errorHandler({ logger: console } as any));

// @ts-ignore
app.use(function (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return sendErrorResponse(res, err.status || err.code || 500, [err]);
});
export type HookContext<T = any> = {
  app: Application;
} & FeathersHookContext<T>;
export default app;
