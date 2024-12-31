import commonHooks from 'feathers-hooks-common';
import * as local from '@feathersjs/authentication-local';
import * as feathersAuthentication from '@feathersjs/authentication';

import isSelf from '../../Hooks/isSelf.hook';
import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';
import MediaStringToMediaObject from '../../Hooks/ProfileCoverToObject';
import {
  AddVisitor,
  GetUser,

} from './hook';

// import SaveAndAttachInterests from '../../Hooks/SaveAndAttachInterest';

const { protect } = local.hooks;
const { authenticate } = feathersAuthentication.hooks;

const protectkeys = protect(...['search_vector']);

export default {
  before: {
    // find: [authenticate('jwt')],
    // get: [authenticate('jwt')],
    create: commonHooks.disallow(),
    update: commonHooks.disallow(),
    patch: [
      // commonHooks.iff(
      //   commonHooks.isProvider('external'),
      //   commonHooks.preventChanges(
      //     true,
      //     ...['email']
      //   ),
      //   authenticate('jwt'),
      //   isSelf
      // ),
      // saveProfilePicture(['profilePicture', 'coverPicture']),
    ],
    remove: [authenticate('jwt'), isSelf],
  },

  after: {
    all: [MediaStringToMediaObject(['profilePicture', 'coverPicture'])],
    find: [protectkeys],
    // get: [AddVisitor, protectkeys],
    patch: [protectkeys],
    remove: [protectkeys],
  },
  error: {
    all: [
      (context: any) => {
        if (context.error) {
          console.log('Error in users.hooks.ts');
          console.log(context.error);
        }
      }
    ],
  }
};
