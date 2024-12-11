// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Template } from './template.class';

import hooks from './template.hook';
// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    template: Template & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Template,
    paginate: {
      default: 10,
      max: 50,
    },
  };

  // Initialize our service with any options it requires
  app.use('/template', new Template(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service: any = app.service('template');
  service.hooks(hooks);
}
