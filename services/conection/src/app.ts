/* eslint-disable no-unused-vars */
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import feathers from '@feathersjs/feathers';

/** Custom dependencies */
import database from './models';
import services from './services';
import sequelize from './sequelize';

dotenv.config();


const app = express(feathers());
app.configure(configuration());
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(express.urlencoded({ extended: true }));

app.configure(express.rest());
app.configure(sequelize);

app.configure(database);
app.configure(services);
app.use(express.notFound());
app.use(express.errorHandler({ logger: console } as any));
export default app;
