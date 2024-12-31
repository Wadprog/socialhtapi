import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import isNil from 'lodash/isNil';
import { UserInterface } from '@webvital/micro-common';


export class VerifyEmail extends Service<UserInterface> {

  constructor(options: Partial<SequelizeServiceOptions>, private app: Application) {
    super(options);


  }

  async create(data: UserInterface, params: Params) {

    const { User } = this.app.get('sequelizeClient').models;
    const user = await User.findByPk(params.users.id);

    if (isNil(user))
      throw new BadRequest('User not found');

    // check if the verification key is expired 
    if (user.emailKeyExpires < Date.now())
      throw new BadRequest('Verification key expired, request a new one');

    if (user.emailVerificationKey !== data.emailVerificationKey)
      throw new BadRequest('Invalid verification key');

    user.emailVerified = true;
    user.emailKeyExpires = null;
    user.emailVerificationKey = null;
    await user.save();
    return Promise.resolve(user);


  }
}
