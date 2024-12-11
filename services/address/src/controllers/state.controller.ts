import { Request, Response } from 'express';

import db from '../models';
import { catchAsync } from '../../../../micro-common/src/common/catchAsync';

export default {

    find: catchAsync(async (req: Request, res: Response) => {
        const params = req.query;
        const states = await db.State.findAll({ where: params });
        res.json(states);

    }),

    get: catchAsync(async (req: Request, res: Response) => {
        const state = await db.State.findByPk(req.params.id);
        res.json(state);

    })



}