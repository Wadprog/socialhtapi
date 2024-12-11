import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { verifyEmail } from './verifyEmail';
import { Application } from '../../declarations';
import resendVerifyEmail from './resend-verify-email';

enum ActionType {
  verifyEmail = 'verifyEmail',
  sendResetPwd = 'sendResetPwd',
  passwordChange = 'passwordChange',
  resendVerifyEmail = 'resendVerifyEmail',
  verifyResetPassword = 'verifyResetPassword'
}

const NeedAuthMessage = 'You need to be authenticated';
interface DataInterface {
  value: any;
  ownId: any;
  meta: any;
  notifierOptions: any;
}
export class AuthManagement extends Service {

  constructor(options: Partial<SequelizeServiceOptions>, private app: Application) {
    super(options);
 
  }

  async create(data: any, params: Params) {
    const action: ActionType = params.query ? params.query.action : null;
    if (!action) throw new BadRequest('Action is missing', { message: `Specify an Action` });
    switch (action) {
      case ActionType.resendVerifyEmail:
        try {
          if (!params.user)
            throw new BadRequest(NeedAuthMessage, { message: NeedAuthMessage });
          return await resendVerifyEmail(params.user.id);
        } catch (err) {
          return Promise.reject(err);
        }
      case ActionType.verifyEmail:

        try {
          if (!params?.user?.id)
            throw new BadRequest(NeedAuthMessage, { message: NeedAuthMessage });
          return await verifyEmail(
            data,
            params.user.id

          );
        } catch (err) {
          return Promise.reject(err);
        }



      default:
        throw new BadRequest('This options is not supported ', {
          message: `${data.action} is not a supported authmanagement action`,
        });
    }
  }
}
