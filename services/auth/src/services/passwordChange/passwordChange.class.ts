import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import isNil from 'lodash/isNil';

interface PasswordChangeInterface {
  passwordResetKey: string;
  password: string;
}

export class PasswordChange extends Service<PasswordChangeInterface> {

  constructor(options: Partial<SequelizeServiceOptions>, private app: Application) {
    super(options);


  }

  async create(data: PasswordChangeInterface, params: Params) {
    const sequelize = this.app.get('sequelizeClient');
    const { User, Auth } = sequelize.models;

    const auth = await Auth.findOne({
      where: {
        passwordResetKey: data.passwordResetKey,
        passwordResetExpires: {
          [sequelize.Sequelize.Op.gt]: Date.now()
        }
      }
    })
    if (isNil(auth))
      throw new BadRequest('Invalid or expired password reset key');

    const user = await User.findOne({
      where: {
        id: auth.userId
      }
    });

    if (isNil(user))
      throw new BadRequest('User not found');


    user.password = data.password;
    await user.save();

    return Promise.resolve(user);



  }
}
