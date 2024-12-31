import { ServiceAddons } from '@feathersjs/feathers';
import * as local from '@feathersjs/authentication-local';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';

// import { issueRefreshToken } from '@jackywxd/feathers-refresh-token';
import { Application } from '../declarations.d';
import protectedkey from '../libs/protectedkey';


const { protect } = local.hooks;
declare module '../declarations.d' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}



export default function (app: Application): void {

  const authentication = new AuthenticationService(app);

  const jwtStrategy = new JWTStrategy();
  authentication.register('jwt', jwtStrategy);
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  const service = app.service('authentication');

  // @ts-ignore
  service.hooks({
    after: {
      all: [
        protect(...protectedkey),
      ],
      // create: [issueRefreshToken()],
    },
  });

}
