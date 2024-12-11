import isNil from 'lodash/isNil';
import { NotFound, BadRequest, GeneralError } from '@feathersjs/errors';
import { Subjects, Publisher, natsWrapper } from '@webvital/micro-common';

import app from '../../app';

//@ts-ignore
const sanitizeuser = user => user


interface ResendVerifyEmail {
  subject: Subjects.UserCreated;
  data: {
    email: string;
    emailVerificationKey: number;
  };
}

class ResendVerifyEmailPublisher extends Publisher<ResendVerifyEmail> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}




export default async (user_id: number) => {
  const { User } = app.get('sequelizeClient').models;

  const user = await User.findByPk(user_id);
  if (!user)
    throw new NotFound('User not found');
  if (user.emailVerified)
    throw new BadRequest('User already verified');

  if (isNil(user.emailVerificationKey) || user?.verifyExpires < Date.now() - 120000) {
    user.verifyExpires = Date.now() + 15 * 60 * 1000;
    user.emailVerificationKey = Math.floor(1000 + Math.random() * 9000)
    await user.save();
    await user.reload();
  }

  try {
    new ResendVerifyEmailPublisher(natsWrapper.client).publish(sanitizeuser(user));

  } catch (error) {
    throw new GeneralError('notifier-error', { error });
  }
};
