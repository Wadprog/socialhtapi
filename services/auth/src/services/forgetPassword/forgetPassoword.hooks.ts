import * as local from '@feathersjs/authentication-local';
import { validateParams } from '@webvital/micro-common';
import { disallow } from 'feathers-hooks-common';
import publish from './hooks/publisher';
import protectedkey from '../../libs/protectedkey';
import { resetPasswordSchema } from '../../schema/verifyEmail';


const { protect } = local.hooks;
const protectkeys = protect(...protectedkey);

export default {
  before: {
    find: [disallow()],
    get: [disallow()],
    patch: [disallow()],
    create: [validateParams(resetPasswordSchema)],
    remove: [disallow()],
  },

  after: {
    create: [protect('password'), publish, protectkeys],
  },
};
