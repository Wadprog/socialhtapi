// Initializes the `addressTypes` service on path `/address-types`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { AddressTypes } from './address-types.class';
import hooks from './address-types.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'address-types': AddressTypes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.AddressType,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/address-types', new AddressTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('address-types');

  service.hooks(hooks);
}
