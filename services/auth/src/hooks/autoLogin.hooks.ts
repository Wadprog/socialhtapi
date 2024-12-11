import { HookContext } from '@feathersjs/feathers';
export default async (context: HookContext): Promise<HookContext> => {
  const { app, data } = context;

  const loginDetails = await app.service('authentication').create({
    strategy: 'local',
    email: data.email,
    password: data.passwordConfirmation,
  });

  context.result.accessToken = loginDetails.accessToken;

  return context;
};
