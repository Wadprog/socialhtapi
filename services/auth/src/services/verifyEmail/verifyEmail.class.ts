import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Model } from 'sequelize';

import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import isNil from 'lodash/isNil';
import { UserInterface, sequelizeWrapper } from '@webvital/micro-common';
import { isBefore } from 'date-fns'


export class VerifyEmail extends Service<UserInterface> {

  constructor(options: Partial<SequelizeServiceOptions>, private app: Application) {
    super(options);


  }

  async create(data: UserInterface, params: Params): Promise<UserInterface> {

    const { User } = sequelizeWrapper.client.models;
    const user = await User.findByPk<Model<UserInterface>>(params.users.id);

    if (isNil(user))
      throw new BadRequest('User not found');

    //@ts-ignore
    if (isBefore(user.emailKeyExpires, Date()))
      throw new BadRequest('Verification key expired, request a new one');

    //@ts-ignore
    if (user.emailVerificationKey !== data.emailVerificationKey)
      throw new BadRequest('Invalid verification key');
    //@ts-ignore
    user.emailVerified = true;
    //@ts-ignore
    user.emailKeyExpires = null;
    //@ts-ignore
    user.emailVerificationKey = null;
    await user.save();
    return Promise.resolve(user.get({ plain: true }));



  }
}
