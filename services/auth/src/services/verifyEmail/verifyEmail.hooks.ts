import * as local from '@feathersjs/authentication-local';
import { validateParams } from '@webvital/micro-common';
import { disallow } from 'feathers-hooks-common';
import * as feathersAuthentication from '@feathersjs/authentication';
import publish from './hooks/publisher';
import protectedkey from '../../libs/protectedkey';
import { verifyEmailSchema } from '../../schema/verifyEmail';


const { protect } = local.hooks;
const protectkeys = protect(...protectedkey);
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    find: [disallow()],
    get: [disallow()],
    patch: [disallow()],
    create: [authenticate('jwt'), validateParams(verifyEmailSchema)],
    remove: [disallow()],
  },

  after: {
    create: [protect('password'), publish, protectkeys],
  },
};
