import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext<{ id: number }>): HookContext => {
    const { params } = context
   
    if (context?.id?.toString() !== params.users?.id.toString())
        throw new BadRequest('Invalid Parameters', {
            message: 'You are not authorized to modify these resources',
        });
    return context;
};

