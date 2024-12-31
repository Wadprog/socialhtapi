import { ServiceAddons } from '@feathersjs/feathers';
/** Local dependencies */
import { Users } from './users.class';
import hooks from './users.hooks';
import { Application } from '../../declarations';

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    users: Users & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const UserModel = sequelize.models.User;
  const options = {
    Model: UserModel,
    paginate: {
      default: 10,
      max: 50,
    },
  };

  app.use('/users', new Users(options, app));
  const service = app.service('users');
  service.hooks(hooks);
}
