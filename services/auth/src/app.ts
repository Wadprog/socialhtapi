/* eslint-disable no-unused-vars */
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import feathers from '@feathersjs/feathers';
import { Application } from '@feathersjs/express';
import { sequelizeWrapper } from '@webvital/micro-common';
import { Options } from 'sequelize';

/** Custom dependencies */
import services from './services';
import initializeDatabase from './models';
import authentication from './authentication';

dotenv.config();
class App {

    private db_initialized: boolean = false
    private app: Application = express(feathers());

    get server() {
        if (!this.db_initialized)
            throw new Error('Server has not been initialized')
        return this.app
    }

    constructor() {
        this._init()
    }

    configure(callback: (app: Application) => void) {
        callback(this.server)
    }

    private _init() {
        this.app.configure(configuration());
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.configure(express.rest());
    }

    startSequelize() {
        const { models } = sequelizeWrapper.client;
        Object.keys(models).forEach((name) => {
            if ('associate' in models[name]) {
                (models[name] as any).associate(models);
            }
        });
    }

    async initialize(dbSetting: Options) {
        sequelizeWrapper.connect(dbSetting)

        this.db_initialized = true;
        this.configure(authentication);
        initializeDatabase();
        this.startSequelize();
        this.configure(services);

        this.server.use(express.notFound());
        this.server.use(express.errorHandler({ logger: console } as any));

        return sequelizeWrapper.client.authenticate()


    }
}
export default new App();
