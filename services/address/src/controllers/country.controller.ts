import { Request, Response } from 'express';

import db from '../models';
import { catchAsync } from '../../../../micro-common/src/common/catchAsync';

export default {

    find: catchAsync(async (req: Request, res: Response) => {
        const countries = await db.Country.findAll();
        res.json(countries);

    }),

    get: catchAsync(async (req: Request, res: Response) => {
        const country = await db.Country.findByPk(req.params.id);
        res.json(country);

    })

}