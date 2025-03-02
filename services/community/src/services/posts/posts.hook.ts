import * as feathersAuthentication from '@feathersjs/authentication';

/** Local dependencies */
import AutoOwn from '../../Hooks/AutoOwn';
import AgeAllow from '../../Hooks/AgeAllow';
import { LimitToOwner } from '../../Hooks';
import DeletePost from './hooks/deletePost';
import * as schema from '../../schema/post';
import GetTimeline from '../timeline/hooks/getTimeline';
import validateResource from '../../middleware/validateResource';
import CanPostInCommunity from '../../Hooks/CanDoInCommunity.hook';
import CanComment from '../../Hooks/NoCommentOnLockParents';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    find: [GetTimeline],
    get: [GetTimeline],
    create: [
      AutoOwn,
      validateResource(schema.createPostSchema),
      CanPostInCommunity,
      CanComment,
    ],
    update: [CanPostInCommunity],
    patch: [LimitToOwner],
    remove: [DeletePost],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
