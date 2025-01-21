import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

import getEntityById from '../../../utils/getEntityById';
/**
 *This function verifies if the user has the right to delete a post. Users can delete their own posts , comments on their own posts and post made on their wall.
 * @params {HookContext} context - this takes the context of the hook
 * @returns {HookContext} Promise<HookContext> - returns the context of the hook
 *
 */

export default async (context: HookContext): Promise<HookContext> => {
  const { params, id, service } = context;
  //@ts-ignore
  const entity = await getEntityById(service, id);
  if (entity.UserId === params.user.id)
    return context;
  if (!entity.PostId)
    throw new BadRequest('You have no access right to delete this post');
  const parentPost = await getEntityById(service, entity.PostId);
  if (parentPost.UserId === params.user.id) return context;
  throw new BadRequest('You have no access right to delete this comment');
  return context;
};
