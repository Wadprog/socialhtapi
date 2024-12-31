import * as local from '@feathersjs/authentication-local';
import { validateParams } from '@webvital/micro-common';
import { disallow } from 'feathers-hooks-common';
import publish from './hooks/publisher';
import protectedkey from '../../libs/protectedkey';
import { passwordChangeSchema } from '../../schema/verifyEmail';




const { protect , hashPassword} = local.hooks;
const protectkeys = protect(...protectedkey);


export default {
  before: {
    find: [disallow()],
    get: [disallow()],
    patch: [disallow()],
    create: [validateParams(passwordChangeSchema), hashPassword('password')],
    remove: [disallow()],
  },

  after: {
    create: [protect('password'), publish, protectkeys],
  },
};
