import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import isNil from 'lodash/isNil';
import { sequelizeWrapper, UserInterface } from '@webvital/micro-common'
import { Model } from 'sequelize';
import { Op } from 'sequelize';
import { AuthInterface } from '../../schema/auth.schema';

interface PasswordChangeInterface {
  passwordResetKey: string;
  password: string;
}

export class PasswordChange extends Service<UserInterface> {

  constructor(options: Partial<SequelizeServiceOptions>, private app: Application) {
    super(options);


  }

  async create(data: Partial<PasswordChangeInterface>, params: Params): Promise<UserInterface> {
    const { User, Auth } = sequelizeWrapper.client.models;

    const auth = await Auth.findOne<Model<AuthInterface>>({
      where: {
        passwordResetKey: data.passwordResetKey,
        passwordResetExpires: {
          [Op.gt]: new Date()
        }
      }
    })
    if (isNil(auth))
      throw new BadRequest('Invalid or expired password reset key');

    const user = await User.findOne({
      where: {
        id: auth.dataValues.userId
      }
    });

    if (isNil(user))
      throw new BadRequest('User not found');


    //@ts-ignore
    user.password = data.password;
    await user.save();

    return Promise.resolve(user as unknown as UserInterface);



  }
}
