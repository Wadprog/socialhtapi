import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext<{ id: number }>) => {
    if (context?.id?.toString() !== context.params.user?.id.toString())
        throw new BadRequest('Invalid Parameters', {
            message: 'You are not authorized to modify these resources',
        });
    return context;
};