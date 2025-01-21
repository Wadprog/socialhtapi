import { HookContext } from '@feathersjs/feathers';

export default function (context: HookContext): HookContext {
  console.log({ c: context.params.user.id })
  context.data.userId = context.params.user.id;
  return context;
}
