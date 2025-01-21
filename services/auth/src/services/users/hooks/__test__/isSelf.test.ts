import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import isSelf from '../../../../hooks/isSelf';

describe('isSelf hook', () => {
    it.skip('throws BadRequest error if user id does not match context id', () => {
        const context = {
            id: 1,
            params: {
                user: {
                    id: 2
                }
            }
        } as unknown as HookContext<{ id: number }>;

        expect(() => isSelf(context)).toThrow(BadRequest);
    });

    it.skip('returns context if user id matches context id', () => {
        const context = {
            id: 1,
            params: {
                user: {
                    id: 1
                }
            },
            app: {},
            method: '',
            path: '',
            service: {},
            type: ''
        } as unknown as HookContext<{ id: number }>;

        expect(isSelf(context)).toBe(context);
    });
});
