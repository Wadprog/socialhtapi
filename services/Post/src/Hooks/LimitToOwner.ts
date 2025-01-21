/* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';


export default async (context: HookContext): Promise<HookContext> => {
  const { params, id, service } = context;

  const entity = await service._get(id);
  console.log({ entity, p: params.user })

  if (entity?.userId.toString() !== params.user.id.toString()) {
    throw new BadRequest('Not authorized');
  }

  return context;
};
