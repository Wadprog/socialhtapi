import * as local from '@feathersjs/authentication-local';
import * as feathersAuthentication from '@feathersjs/authentication';
import { validateParams, createUserSchema } from '@webvital/micro-common';

import publish from './hooks/publisher';
import assignRole from './hooks/assignRole';
import AutoLogin from '../../hooks/autoLogin.hooks';
import protectedkey from '../../libs/protectedkey';


const { hashPassword, protect } = local.hooks;
const protectkeys = protect(...protectedkey);
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validateParams(createUserSchema), assignRole, hashPassword('password')],
    remove: [authenticate('jwt')],
  },

  after: {
    create: [protect('password'), publish, AutoLogin, protectkeys],
  },
};
