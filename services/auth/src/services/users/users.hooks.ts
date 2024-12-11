import * as local from '@feathersjs/authentication-local';
import * as feathersAuthentication from '@feathersjs/authentication';
import { validateParams, createUserSchema } from '@webvital/micro-common';

import AutoLogin from '../../hooks/autoLogin.hooks';
import publish from './hooks/publisher';


const { hashPassword, protect } = local.hooks;
const { authenticate } = feathersAuthentication.hooks;

const protectkeys = protect(
  ...[
    'password',
    'emailVerificationkey',
  ]
);
export default {
  before: {
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validateParams(createUserSchema), hashPassword('password')],
    remove: [authenticate('jwt')],
  },

  after: {
    // all: protectkeys,
    create: [publish, AutoLogin, protectkeys],
  },
};
