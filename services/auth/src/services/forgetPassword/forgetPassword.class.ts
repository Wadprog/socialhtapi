import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import isNil from 'lodash/isNil';
import { UserInterface } from '@webvital/micro-common';


export class ForgetPassword extends Service<UserInterface> {

  constructor(options: Partial<SequelizeServiceOptions>, private app: Application) {
    super(options);


  }

  async create(data: UserInterface, params: Params) {

    console.log('ForgetPassword service called', data);
    const { User, Auth } = this.app.get('sequelizeClient').models;
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (isNil(user))
      throw new BadRequest('User not found');

    try {
      const [auth, created] = await Auth.findOrCreate({
        where: {
          userId: user.id
        },
        defaults: {
          passwordResetKey: Math.floor(1000 + Math.random() * 9000).toString(),
          passwordResetExpires: Date.now() + 3600000 // 1 hour
        }
      })
      if (!created) {
        // check if the password reset key is expired
        if (auth.passwordResetExpires < Date.now() + 120000) {
          auth.passwordResetKey = Math.floor(1000 + Math.random() * 9000).toString();
          auth.passwordResetExpires = Date.now() + 3600000;
          await auth.save();
        }

      }



      return Promise.resolve(auth);
    } catch (e) {
      console.log('Error', e)
    }




  }
}
