import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default (context:HookContext) => {
  if (context?.id?.toString() !== context.params.User.id.toString())
    throw new BadRequest('Invalid Parameters', {
      message: 'You are not authorized to modify other users',
    });
  return context;
};
