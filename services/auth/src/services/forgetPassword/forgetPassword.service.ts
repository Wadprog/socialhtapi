import { ServiceAddons } from '@feathersjs/feathers';
/** Local dependencies */
import { ForgetPassword } from './forgetPassword.class';
import hooks from './forgetPassoword.hooks';
import { Application } from '../../declarations';

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'forget_password': ForgetPassword & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const UserModel = sequelize.models.Auth;
  const options = {
    Model: UserModel,
    paginate: undefined,
  };

  app.use('/forget_password', new ForgetPassword(options, app));
  const service = app.service('forget_password');
 
  service.hooks(hooks);
}
