// import * as feathersAuthentication from '@feathersjs/authentication';

/** Local dependencies */
import AutoOwn from '../../Hooks/AutoOwn';
import { LimitToOwner } from '../../Hooks';
import DeletePost from './hooks/deletePost';
import * as schema from '../../schema/post';
import GetTimeline from './hooks/getTimeline';
import validateResource from '../../middleware/validateResource';
import CanPostInCommunity from '../../Hooks/CanDoInCommunity.hook';
import CanComment from '../../Hooks/NoCommentOnLockParents';

// const { authenticate } = feathersAuthentication.hooks;


import requireLogin from "../../Hooks/requireLogin";
export default {
  before: {
    all: [requireLogin],
    find: GetTimeline,
    get: [
      GetTimeline
    ],
    create: [
      AutoOwn,
      validateResource(schema.createPostSchema),
      CanPostInCommunity,
      CanComment,
    ],

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
    all: [(context: any) => {
      const { method } = context;
      console.log('There is an error now')
      console.log(`Error in posts hook ${method}`, context.error.message);
    }],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
