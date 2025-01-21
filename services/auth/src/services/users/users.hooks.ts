import * as local from '@feathersjs/authentication-local';
import * as feathersAuthentication from '@feathersjs/authentication';
import { validateParams, createUserSchema } from '@webvital/micro-common';
import { disallow } from 'feathers-hooks-common';


import publish from './hooks/publisher';
import assignRole from './hooks/assignRole';
import protectedkey from '../../libs/protectedkey';
import AutoLogin from '../../hooks/autoLogin.hooks';
import deletePublisher from './hooks/deletePublisher';
import isSelf from '../../hooks/isSelf';


const { hashPassword, protect } = local.hooks;
const protectkeys = protect(...protectedkey);
const { authenticate } = feathersAuthentication.hooks;


export default {
  before: {
    find: [disallow('external')],
    get: [authenticate('jwt')],
    create: [validateParams(createUserSchema), assignRole, hashPassword('password')],
    remove: [authenticate('jwt')],
  },

  after: {
    create: [protect('password'), publish, AutoLogin, protectkeys],
    remove: [deletePublisher],
  },
  

};
