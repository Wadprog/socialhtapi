import { ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';

import { Application } from '../declarations';


declare module '../declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  app.use('/authentication', authentication);

}
