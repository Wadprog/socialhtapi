import * as local from '@feathersjs/authentication-local';
import * as feathersAuthentication from '@feathersjs/authentication';
import { validateParams, createUserSchema } from '@webvital/micro-common';

import isSelf from './hooks/isSelf'
import publish from './hooks/publisher';
import assignRole from './hooks/assignRole';
import protectedkey from '../../libs/protectedkey';
import AutoLogin from '../../hooks/autoLogin.hooks';
import deletePublisher from './hooks/deletePublisher';

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
    remove: [deletePublisher],
  },

  error: {
    // all: [(context:any) => {
    //   console.error('Error in users service', context.error);
    // }],
  },
};
