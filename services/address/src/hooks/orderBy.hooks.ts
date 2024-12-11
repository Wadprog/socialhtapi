import isNil from 'lodash/isNil';
import { HookContext } from '@feathersjs/feathers';

type SortOptions<T> = {
  [P in keyof T]?: 1 | -1;
};
export default <T>(options: SortOptions<T>) => (context: HookContext): HookContext => {
  if (isNil(options)) throw new Error('options is required');
  const { query = {} } = context.params;

  if (!query.$sort) {
    query.$sort = options;
  }
  context.params.query = query;

  return context;
};
