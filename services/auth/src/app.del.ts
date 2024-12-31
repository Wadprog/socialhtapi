/* eslint-disable no-unused-vars */
// Dependencies
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';


import './passport';
import common from './libs/common';
import configureServices from './services';

dotenv.config();
const { sendErrorResponse } = common;

const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

configureServices(app);

app.use(function (
    err: Error | any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { status = 500 } = err;
    return sendErrorResponse(res, status, [err]);
});

export default app;
