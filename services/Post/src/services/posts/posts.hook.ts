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


const refetch = async (context: HookContext) : Promise<HookContext> => {

  const { app, result, params } = context;
  // authenticate the request 

  const res = await app.service('posts').get(result.id, params);
  console.log('Refetching post', res);
  context.result = res;
  return context;

};

// const { authenticate } = feathersAuthentication.hooks;


import requireLogin from "../../Hooks/requireLogin";
import { HookContext } from '@feathersjs/feathers';
export default {
  before: {
    all: [requireLogin],
    find: GetTimeline,
    get: [
      GetTimeline
    ],
    create: [
      AutoOwn,
      (c:HookContext)=>{console.log('Create post hookss ', c.data)},
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
    create: [refetch],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [(context: any) => {
      const { method } = context;
      console.log('There is an error now')
      console.log(`Error in posts hook ${method}`, context.error);
    }],
    find: [],
    get: [],
    create: [refetch],
    update: [],
    patch: [],
    remove: [],
  },
};
