import { ServiceAddons } from '@feathersjs/feathers';
/** Local dependencies */
import { VerifyEmail } from './verifyEmail.class';
import hooks from './verifyEmail.hooks';
import { Application } from '../../declarations';

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'verify_email': VerifyEmail & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const UserModel = sequelize.models.User;
  const options = {
    Model: UserModel,
    paginate: undefined,
  };

  app.use('/verify_email', new VerifyEmail(options, app));
  const service = app.service('verify_email');
 
  service.hooks(hooks);
}
