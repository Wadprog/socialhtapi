import { HookContext } from '@feathersjs/feathers';
export default function (context: HookContext): HookContext {
  context.data.UserId = context.params.User.id;
  return context;
}
