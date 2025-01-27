import { HookContext } from '@feathersjs/feathers';

export default function (context: HookContext): HookContext {
  //@TODO : Fix this forcing user one to be only creator
  context.data.userId = 1//context.params.user.id;
  return context;
}
