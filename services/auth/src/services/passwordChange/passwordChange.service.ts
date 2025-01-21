import { ServiceAddons } from '@feathersjs/feathers';
/** Local dependencies */
import { PasswordChange } from './passwordChange.class';
import hooks from './passowordChange.hooks';
import { Application } from '../../declarations';
import { sequelizeWrapper } from '@webvital/micro-common'

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'password_change': PasswordChange & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const UserModel = sequelizeWrapper.client.models.Auth;
  const options = {
    Model: UserModel,
    paginate: undefined,
  };

  app.use('/password_change', new PasswordChange(options, app));
  const service = app.service('password_change');
 
  service.hooks(hooks);
}
