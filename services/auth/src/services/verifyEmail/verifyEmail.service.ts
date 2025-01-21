import { ServiceAddons } from '@feathersjs/feathers';
/** Local dependencies */
import { VerifyEmail } from './verifyEmail.class';
import hooks from './verifyEmail.hooks';
import { Application } from '../../declarations';
import { sequelizeWrapper } from '@webvital/micro-common'

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'verify_email': VerifyEmail & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const UserModel = sequelizeWrapper.client.models.User;
  const options = {
    Model: UserModel,
    paginate: undefined,
  };

  app.use('/verify_email', new VerifyEmail(options, app));
  const service = app.service('verify_email');
 
  service.hooks(hooks);
}
