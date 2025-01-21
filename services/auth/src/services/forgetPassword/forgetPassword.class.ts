import { addHours, isBefore, addMinutes, addDays } from 'date-fns'
import { Model } from 'sequelize'
import isNil from 'lodash/isNil';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { UserInterface, sequelizeWrapper } from '@webvital/micro-common';

import { Application } from '../../declarations';
import { AuthInterface } from '../../schema/auth.schema'

type ForgetPswd = AuthInterface & UserInterface




export class ForgetPassword extends Service<AuthInterface> {

  constructor(options: Partial<SequelizeServiceOptions>, private app: Application) {
    super(options);
  }

  async create(data: ForgetPswd, params: Params): Promise<AuthInterface> {

    const { User, Auth } = sequelizeWrapper.client.models;
    const user: any = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (isNil(user))
      return Promise.resolve({} as AuthInterface)

    try {
      const [auth, created] = await Auth.findOrCreate<Model<AuthInterface>>({
        where: {
          userId: user.id
        },
        defaults: {
          userId: user.id,
          passwordResetExpires: addHours(new Date(), 1),
          passwordResetKey: Math.floor(1000 + Math.random() * 9000).toString()
        }
      })
      if (!created) {
        if (isBefore(auth.dataValues.passwordResetExpires, addMinutes(new Date(), 2))) {
          auth.dataValues.passwordResetKey = Math.floor(1000 + Math.random() * 9000).toString();
          auth.dataValues.passwordResetExpires = addDays(new Date(), 1);
          await auth.save();
        }

      }



      return Promise.resolve(auth.dataValues);
    } catch (e) {
      return Promise.resolve({} as AuthInterface)
    }
  }
}
