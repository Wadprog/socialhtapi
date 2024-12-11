import { Request, Response } from 'express';

import db from '../models';
import { catchAsync } from '../../../../micro-common/src/common/catchAsync';

export default {

    find: catchAsync(async (req: Request, res: Response) => {
        const params = req.query;
        const cities = await db.City.findAll({ where: params });
        res.json(cities);

    }),

    get: catchAsync(async (req: Request, res: Response) => {
        const city = await db.City.findByPk(req.params.id);
        res.json(city);

    })



}